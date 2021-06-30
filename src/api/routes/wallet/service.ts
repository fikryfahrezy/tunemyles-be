import type CustModelType from '../../types/model';
import type {
  TopUpBody,
  TopUpProofBody,
  UpdateTopUpStatusBody,
  UpdateWithdrawStatusBody,
  WithdrawBody,
} from '../../types/schema';

export const requestTopUp: (
  userId: CustModelType['UserToken']['utilId'],
  data: TopUpBody,
) => Promise<unknown> = async function requestTopUp(userId, data) {
  await Promise.resolve('hi');
};

export const requestWithdraw: (
  userId: CustModelType['UserToken']['utilId'],
  data: WithdrawBody,
) => Promise<unknown> = async function requestWithdraw(userId, data) {
  await Promise.resolve('hi');
};

export const getWalletData: (
  userId: CustModelType['UserToken']['utilId'],
) => Promise<unknown> = async function getWalletData(userId) {
  const resData = await Promise.resolve('hi');

  return resData;
};

export const topUpHistoryData: (
  userId: CustModelType['UserToken']['utilId'],
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function topUpHistoryData(userId, query) {
  const resData = await Promise.resolve('hi');

  return resData;
};

export const withdrawHistoryData: (
  userId: CustModelType['UserToken']['utilId'],
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function withdrawHistoryData(userId, query) {
  const resData = await Promise.resolve('hi');

  return resData;
};

export const topUpDetail: (
  userId: CustModelType['UserToken']['utilId'],
  topUpId: number,
) => Promise<unknown> = async function topUpDetail(userId, topUpId) {
  const resData = await Promise.resolve('hi');

  return resData;
};

export const withdrawDetail: (
  userId: CustModelType['UserToken']['utilId'],
  wihdrawId: number,
) => Promise<unknown> = async function withdrawDetail(userId, withdrawId) {
  const resData = await Promise.resolve('hi');

  return resData;
};

export const allUserTopUp: (
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function allUserTopUp(query) {
  const resData = await Promise.resolve('hi');

  return resData;
};

export const allUserWithdraw: (
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function allUserWithdraw(query) {
  const resData = await Promise.resolve('hi');

  return resData;
};

export const topUpProof: (
  userId: CustModelType['UserToken']['utilId'],
  topUpId: number,
  data: TopUpProofBody,
) => Promise<void> = async function topUpProof(userId, topUpId, data) {
  await Promise.resolve('hi');
};

export const changeTopUpStatus: (
  topUpId: number,
  data: UpdateTopUpStatusBody,
) => Promise<void> = async function changeTopUpStatus(topUpId, data) {
  await Promise.resolve('hi');
};

export const changeWithdrawStatus: (
  wihdrawId: number,
  data: UpdateWithdrawStatusBody,
) => Promise<void> = async function changeWithdrawStatus(withdrawId, data) {
  await Promise.resolve('hi');
};
