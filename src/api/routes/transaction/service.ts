import type CustModelType from '../../types/model';
import type { ReviewProductBody } from '../../types/schema';
import { ErrorResponse } from '../../utils/error-handler';
import {
  createProductReview,
  updateUserWallet,
  updateUserTransaction,
  getUserTransactions,
  getUserTransaction,
  getUserTransactionProducts,
  getUserReviewedTransactions,
  getUserWalletBalance,
  getUserTransactionProduct,
} from '../../repositories/TransactionRepository';

export const userTransactionData: (
  userId: CustModelType['UserToken']['userId'],
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function processedTransactionData(userId, query) {
  const resData = await getUserTransactions(userId, query);

  return resData;
};

export const transactionDetailData: (
  transactionId: number,
  userId: CustModelType['UserToken']['userId'],
) => Promise<unknown> = async function transactionDetailData(transactionId, userId) {
  const transaction = await getUserTransaction(transactionId, userId);

  if (!transaction) throw new ErrorResponse('user transaction not found', 404);

  transaction.products = await getUserTransactionProducts(transactionId, userId);

  return transaction;
};

export const completeTransaction: (
  transactionId: number,
  userId: CustModelType['UserToken']['userId'],
) => Promise<void> = async function completeTransaction(transactionId, userId) {
  const transaction = await getUserTransaction(transactionId, userId);

  if (!transaction) throw new ErrorResponse('user transaction not found', 404);

  const merchantWallet = await getUserWalletBalance(transaction.merchant_id);

  if (!merchantWallet) throw new ErrorResponse('something gone wrong', 400);

  const newBalance = merchantWallet.balance + transaction.total_price;

  await Promise.all([
    updateUserTransaction(transactionId, userId),
    updateUserWallet(merchantWallet.id, { balance: newBalance }),
  ]);
};

export const addProductReview: (
  transactionProductId: number,
  userId: CustModelType['UserToken']['userId'],
  data: ReviewProductBody,
) => Promise<void> = async function addTransactionReview(transactionProductId, userId, data) {
  const transactionProduct = await getUserTransactionProduct(transactionProductId, userId);

  if (!transactionProduct || transactionProduct.status !== 3)
    throw new ErrorResponse('transaction product not found', 404);

  const [, created] = await createProductReview(transactionProductId, data);

  if (!created) throw new ErrorResponse('transaction product not found', 404);
};

export const reviewedProductData: (
  userId: CustModelType['UserToken']['userId'],
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function reviewedTransactionData(userId, query) {
  const resData = await getUserReviewedTransactions(userId, query);

  return resData;
};
