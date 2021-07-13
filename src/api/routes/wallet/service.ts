import type CustModelType from '../../types/model';
import type {
  TopUpBody,
  TopUpProofBody,
  UpdateTopUpStatusBody,
  UpdateWithdrawStatusBody,
  WithdrawBody,
} from '../../types/schema';
import { ErrorResponse } from '../../utils/error-handler';
import { saveFile } from '../../utils/file-management';
import {
  createUserTopUp,
  createUserWithdraw,
  createMedia,
  updateUserWallet,
  updateUserTopUp,
  updateUserWithdraw,
  getUserWallets,
  getUserWalletBalance,
  getMasterBank,
  getUserBank,
  getUserTopUps,
  getUserWithdraws,
  getUserTopUp,
  getUserWithdraw,
  getAllTopUp,
  getAllWithdraw,
  getUserTopUpRequest,
  getUserWithdrawRequest,
} from '../../repositories/WalletRepository';

export const getWalletData: (
  userId: CustModelType['UserToken']['userId'],
) => Promise<unknown> = async function getWalletData(userId) {
  const resData = await getUserWallets(userId);

  return resData;
};

export const requestTopUp: (
  userId: CustModelType['UserToken']['userId'],
  data: TopUpBody,
) => Promise<unknown> = async function requestTopUp(userId, data) {
  const [userWallet, bank] = await Promise.all([
    getUserWalletBalance(userId),
    getMasterBank(data.bank_id),
  ]);

  if (!bank) throw new ErrorResponse('bank not found', 404);
  else if (!userWallet) throw new ErrorResponse('user wallet not found', 404);

  await createUserTopUp(userWallet.id, data);
};

export const requestWithdraw: (
  userId: CustModelType['UserToken']['userId'],
  data: WithdrawBody,
) => Promise<unknown> = async function requestWithdraw(
  userId,
  { user_bank_id: userBankId, balance_request: balanceRequest },
) {
  const [userWallet, userBank] = await Promise.all([
    getUserWalletBalance(userId),
    getUserBank(userBankId, userId),
  ]);

  if (!userWallet) throw new ErrorResponse('user wallet not found', 404);
  else if (!userBank) throw new ErrorResponse('bank not found', 404);

  const { id, balance } = userWallet;

  if (balance < balanceRequest) throw new ErrorResponse('wallet balance is not sufficient', 400);

  const newBalance = balance - balanceRequest;

  await createUserWithdraw(id, { user_bank_id: userBankId, balance_request: newBalance });
};

export const topUpHistoryData: (
  userId: CustModelType['UserToken']['utilId'],
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function topUpHistoryData(userId, query) {
  const resData = await getUserTopUps(userId, query);

  return resData;
};

export const withdrawHistoryData: (
  userId: CustModelType['UserToken']['userId'],
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function withdrawHistoryData(userId, query) {
  const resData = await getUserWithdraws(userId, query);

  return resData;
};

export const topUpDetail: (
  userId: CustModelType['UserToken']['userId'],
  topUpId: number,
) => Promise<unknown> = async function topUpDetail(userId, topUpId) {
  const resData = await getUserTopUp(userId, topUpId);

  return resData;
};

export const withdrawDetail: (
  userId: CustModelType['UserToken']['userId'],
  wihdrawId: number,
) => Promise<unknown> = async function withdrawDetail(userId, withdrawId) {
  const resData = await getUserWithdraw(userId, withdrawId);

  return resData;
};

export const allUserTopUp: (
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function allUserTopUp(query) {
  const resData = await getAllTopUp(query);

  return resData;
};

export const allUserWithdraw: (
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function allUserWithdraw(query) {
  const resData = await getAllWithdraw(query);

  return resData;
};

export const topUpProof: (
  topUpId: number,
  userId: CustModelType['UserToken']['userId'],
  data: TopUpProofBody,
) => Promise<void> = async function topUpProof(topUpId, userId, { image }) {
  const userTopUp = await getUserTopUp(userId, topUpId);

  if (!userTopUp) throw new ErrorResponse('top up request not found', 404);

  const img = image[0];
  const { id } = await createMedia(img.filename);

  await updateUserTopUp(topUpId, { proofId: id });
  await saveFile(img);
};

export const changeTopUpStatus: (
  topUpId: number,
  data: UpdateTopUpStatusBody,
) => Promise<void> = async function changeTopUpStatus(topUpId, { status }) {
  const topUpRequest = await getUserTopUpRequest(topUpId);

  if (!topUpRequest || topUpRequest.status !== 2)
    throw new ErrorResponse('top up request not found', 404);

  if (status === 1) {
    const { balanceRequest, walletId, balance } = topUpRequest;
    const newBalance = balance + balanceRequest;

    await Promise.all([
      updateUserWallet(walletId, { balance: newBalance }),
      updateUserTopUp(topUpId, { status }),
    ]);
  } else await updateUserTopUp(topUpId, { status });
};

export const changeWithdrawStatus: (
  wihdrawId: number,
  data: UpdateWithdrawStatusBody,
) => Promise<void> = async function changeWithdrawStatus(withdrawId, { status }) {
  const withdrawRequest = await getUserWithdrawRequest(withdrawId);

  if (!withdrawRequest || withdrawRequest.status !== 2)
    throw new ErrorResponse('withdraw request not found', 404);

  if (status === 0) {
    const { balanceRequest, walletId, balance } = withdrawRequest;
    const newBalance = balance - balanceRequest;

    await Promise.all([
      updateUserWallet(walletId, { balance: newBalance }),
      updateUserWithdraw(withdrawId, { status }),
    ]);
  } else await updateUserWithdraw(withdrawId, { status });
};
