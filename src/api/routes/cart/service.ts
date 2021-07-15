import type CustModelType from '../../types/model';
import type { AddToCartBody, UpdateCartItemQtyBody } from '../../types/schema';
import { ErrorResponse } from '../../utils/error-handler';
import {
  addCartItem,
  createUserTransaction,
  createTransactionProducts,
  updateCartItem,
  updateUserWallet,
  deleteCartItem,
  checkUserCartItems,
  getMerchantProduct,
  getUserCartItems,
  getUserCartTotalPrice,
  getUserWalletBalance,
} from '../../repositories/CartRepository';

export const addToCart: (
  userId: CustModelType['UserToken']['userId'],
  data: AddToCartBody,
) => Promise<void> = async function addToCart(userId, data) {
  const { merchant_id: merchantId, product_id: productId } = data;
  const [cartItems, product] = await Promise.all([
    checkUserCartItems(userId, productId, merchantId),
    getMerchantProduct(productId, merchantId),
  ]);

  if (!product || (cartItems.length > 0 && cartItems[0].merchantId !== product.merchantId))
    throw new ErrorResponse('failed add item to cart', 400);

  await addCartItem(userId, data);
};

export const getCartItemData: (
  userId: CustModelType['UserToken']['userId'],
) => Promise<unknown> = async function getCartItemData(userId) {
  const resData = await getUserCartItems(userId);

  return resData;
};

export const changeCartItemQty: (
  cartItemId: number,
  userId: CustModelType['UserToken']['userId'],
  data: UpdateCartItemQtyBody,
) => Promise<void> = async function changeCartItemQty(cartItemId, userId, data) {
  await updateCartItem(userId, data, cartItemId);
};

export const removeCartItem: (
  cartItemId: number,
  userId: CustModelType['UserToken']['userId'],
) => Promise<void> = async function removeCartItem(carItemId, userId) {
  await deleteCartItem(carItemId, userId);
};

export const cartCheckout: (
  userId: CustModelType['UserToken']['userId'],
) => Promise<void> = async function cartCheckout(userId) {
  const [cartItems, userWallet, cart] = await Promise.all([
    getUserCartItems(userId),
    getUserWalletBalance(userId),
    getUserCartTotalPrice(userId),
  ]);

  if (!userWallet) throw new ErrorResponse('something gone wrong', 400);
  else if (cartItems.length <= 0 || !cart)
    throw new ErrorResponse('there is no item to process', 400);

  const { id: walletId, balance } = userWallet;
  const totalPrice = parseInt(cart.totalPrice, 10);

  if (balance <= 0 || balance < totalPrice)
    throw new ErrorResponse('user balance is not sufficient', 400);

  const merchantId = cartItems[0].merchant_id;
  const newBalance = balance - totalPrice;
  const { id: userTransactionId } = await createUserTransaction({ merchantId, userId, totalPrice });

  await Promise.all([
    createTransactionProducts(
      cartItems.map(({ qty, product_id: productId, selling_price: sellingPrice }) => ({
        userTransactionId,
        qty,
        productId,
        subTotalPrice: sellingPrice,
      })),
    ),
    updateCartItem(userId, { status: 1 }),
    updateUserWallet(walletId, { balance: newBalance }),
  ]);
};
