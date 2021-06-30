import type CustModelType from '../../types/model';
import type { PostBankUserBody, UpdateBankUserBody } from '../../types/schema';

export const addUserBank: (
  userId: CustModelType['UserToken']['userId'],
  data: PostBankUserBody,
) => Promise<void> = async function addBankUser(userId, data) {
  await Promise.resolve('hi');
};

export const getBankData: () => Promise<unknown> = async function getBankData() {
  const resData = await Promise.resolve('hi');

  return resData;
};

export const getBankDetailData: (
  bankId: number,
) => Promise<unknown> = async function getBankDetailData(bankId) {
  const resData = await Promise.resolve('hi');

  return resData;
};

export const getUserBankData: (
  userId: CustModelType['UserToken']['userId'],
) => Promise<unknown> = async function getBankUserData() {
  const resData = await Promise.resolve('hi');

  return resData;
};

export const updateUserBank: (
  userId: CustModelType['UserToken']['userId'],
  bankId: number,
  data: UpdateBankUserBody,
) => Promise<void> = async function getBankUserData(userId, bankId, data) {
  await Promise.resolve('hi');
};

export const deleteUserBank: (
  userId: CustModelType['UserToken']['utilId'],
  bankId: number,
) => Promise<void> = async function deleteUserBank(userId, bankId) {
  await Promise.resolve('hi');
};
