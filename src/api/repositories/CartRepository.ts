import { QueryTypes } from 'sequelize';
import type { AddToCartBody, UpdateCartItemQtyBody } from '../types/schema';
import sequelize from '../../databases/sequelize';
import initModels, { ModelType } from '../models/sql/init-models';

type UserCartType = {
  merchantId: number;
  [index: string]: unknown;
};

type CartItemType = {
  buyer_id: number;
  merchant_id: number;
  product_id: number;
  qty: number;
  selling_price: number;
  [index: string]: unknown;
};

type UserWalletBalanceType = {
  id: number;
  balance: number;
  [index: string]: unknown;
};

const { UserCart, UserTransaction, TransactionProduct, UserWallet } = initModels(sequelize);

export const addCartItem: (
  userId: number,
  data: AddToCartBody,
) => Promise<ModelType['UserCart']> = function addItemToCart(
  userId,
  { merchant_id: merchantId, product_id: productId, qty },
) {
  return UserCart.create({
    qty,
    id_m_products: productId,
    id_merchant: merchantId,
    id_m_users: userId,
  });
};

export const createUserTransaction: (data: {
  priceTotal: number;
  userId: number;
  merchantId: number;
}) => Promise<ModelType['UserTransaction']> = function createUserTransaction({
  priceTotal,
  userId,
  merchantId,
}) {
  const date = Date.now().toString();

  return UserTransaction.create({
    total_price: priceTotal,
    id_m_users: userId,
    id_merchant: merchantId,
    transaction_token: date,
    status: 1,
  });
};

export const createTransactionProducts: (
  data: {
    userTransactionId: number;
    subTotalPrice: number;
    productId: number;
    qty: number;
  }[],
) => Promise<ModelType['TransactionProduct'][]> = function createTransactionProducts(data) {
  const date = Date.now().toString();

  return TransactionProduct.bulkCreate(
    data.map(({ userTransactionId, subTotalPrice, productId, qty }) => ({
      qty,
      status: 1,
      transaction_token: date,
      id_u_user_transaction: userTransactionId,
      sub_total_price: subTotalPrice,
      id_m_products: productId,
    })),
  );
};

export const updateCartItem: (
  userId: number,
  data: Partial<UpdateCartItemQtyBody> & { status?: number },
  cartItemId?: number,
) => Promise<[number, ModelType['UserCart'][]]> = function updateCartItem(
  userId,
  { qty, status },
  cartItemId,
) {
  const newStatus = status ?? 0;
  const where: { id_m_users: number; status: number; id?: number } = {
    id_m_users: userId,
    status: newStatus,
  };

  if (cartItemId) where.id = cartItemId;

  return UserCart.update({ qty }, { where });
};

export const updateUserWallet: (
  id: number,
  data: { balance: number },
) => Promise<[number, ModelType['UserWallet'][]]> = function updateUserWallet(id, { balance }) {
  return UserWallet.update({ balance }, { where: { id } });
};

export const deleteCartItem: (
  cartItemId: number,
  userId: number,
) => Promise<number> = function deleteCartItem(cartItemId, userId) {
  return UserCart.destroy({ where: { id: cartItemId, id_m_users: userId, status: 0 } });
};

export const checkUserCartItems: (
  userId: number,
  productId: number,
  merchantId: number,
) => Promise<UserCartType[]> = function checkUserCartItems(userId: number, productId, merchantId) {
  const sqlQuery = `
    SELECT 
      uuc.id_merchant AS merchantId
    FROM u_user_cart uuc
    WHERE uuc.id_m_products IN (
      SELECT
        mp.id
      FROM m_products mp
      WHERE mp.id = :productId OR mp.id_m_users = :merchantId
    ) AND uuc.id_m_users = :userId
  `;

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
    replacements: { productId, merchantId, userId },
  });
};

export const getMerchantProduct: (
  productId: number,
  merchantId: number,
) => Promise<UserCartType | null> = function getMerchantProduct(productId, merchantId) {
  const sqlQuery = `
    SELECT
      id_m_users AS merchantId
    FROM m_products mp
    WHERE id = :productId AND id_m_users = :merchantId 
  `;

  return sequelize.query<UserCartType>(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { productId, merchantId },
  });
};

export const getUserCartItems: (
  userId: number,
) => Promise<CartItemType[]> = function getUserCartItems(userId) {
  const sqlQuery = `
    SELECT
      *
    FROM v_cart_active
    WHERE buyer_id = :userId
  `;

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
    replacements: { userId },
  });
};

export const getUserWalletBalance: (
  userId: number,
) => Promise<UserWalletBalanceType | null> = function getUserWalletBalance(userId) {
  const sqlQuery = `
    SELECT
      uuw.id,
      uuw.balance
    FROM u_user_wallet uuw
      LEFT JOIN u_user uu ON uu.id = uuw.id_u_user
    WHERE uu.id_m_users = :userId
  `;

  return sequelize.query<UserWalletBalanceType>(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { userId },
  });
};
