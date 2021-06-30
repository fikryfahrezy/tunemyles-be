import type CustModelType from '../../types/model';
import type { AddToCartBody, UpdateCartItemQtyBody, CheckoutBody } from '../../types/schema';

export const addToCart: (
  userId: CustModelType['UserToken']['userId'],
  data: AddToCartBody,
) => Promise<void> = async function addToCart(userId, data) {
  await Promise.resolve('hi');
};

export const getCartItemData: (
  userId: CustModelType['UserToken']['userId'],
) => Promise<unknown> = async function getCartItemData(userId) {
  const resData = await Promise.resolve('hi');

  return resData;
};

export const changeCartItemQty: (
  userId: CustModelType['UserToken']['userId'],
  cartItemId: number,
  data: UpdateCartItemQtyBody,
) => Promise<void> = async function changeCartItemQty(userId, cartItemId, data) {
  await Promise.resolve('hi');
};

export const removeCartItem: (
  userId: CustModelType['UserToken']['userId'],
  cartItemId: number,
) => Promise<void> = async function removeCartItem(userId, cartItemId) {
  await Promise.resolve('hi');
};

export const cartCheckout: (
  userId: CustModelType['UserToken']['userId'],
  data: CheckoutBody,
) => Promise<void> = async function cartCheckout(userId, data) {
  await Promise.resolve('hi');
};
