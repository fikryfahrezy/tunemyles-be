import type CustModelType from '../../types/model';
import type { ReviewTransactionBody } from '../../types/schema';

export const processedTransactionData: (
  userId: CustModelType['UserToken']['userId'],
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function processedTransactionData(userId, query) {
  const resData = await Promise.resolve('hi');

  return resData;
};

export const transactionDetailData: (
  userId: CustModelType['UserToken']['userId'],
  transactionId: number,
) => Promise<unknown> = async function transactionDetailData(userId, transactionId) {
  const resData = await Promise.resolve('hi');

  return resData;
};

export const completeTransaction: (
  userId: CustModelType['UserToken']['userId'],
  transactionId: number,
) => Promise<void> = async function completeTransaction(userId, transactionId) {
  await Promise.resolve('hi');
};

export const addTransactionReview: (
  userId: CustModelType['UserToken']['userId'],
  transactionId: number,
  data: ReviewTransactionBody,
) => Promise<void> = async function addTransactionReview(userId, transactionId, data) {
  await Promise.resolve('hi');
};

export const reviewedTransactionData: (
  userId: CustModelType['UserToken']['userId'],
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function reviewedTransactionData(userId, query) {
  const resData = await Promise.resolve('hi');

  return resData;
};
