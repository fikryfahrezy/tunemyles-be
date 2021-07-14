import { QueryTypes } from 'sequelize';
import type CustModelType from '../types/model';
import type {
  TopUpBody,
  WithdrawBody,
  UpdateTopUpStatusBody,
  UpdateWithdrawStatusBody,
} from '../types/schema';
import sequelize from '../../databases/sequelize';
import { queryingBuilder } from '../utils/sql-query-builder';
import initModels, { ModelType } from '../models/sql/init-models';

type UserWalletType = {
  id: number;
  [index: string]: unknown;
};

type UserWalletBalanceType = {
  id: number;
  balance: number;
  [index: string]: unknown;
};

type TransferRequest = {
  id: number;
  balanceRequest: number;
  status: number;
  walletId: number;
  balance: number;
  [index: string]: unknown;
};

const { Media, UserWallet, UserTopUp, UserWithdraw } = initModels(sequelize);

export const createUserTopUp: (
  walletId: number,
  data: TopUpBody,
) => Promise<ModelType['UserTopUp']> = function createUserTopUp(
  walletId,
  { bank_id: bankId, ...data },
) {
  return UserTopUp.create({ ...data, id_m_banks: bankId, id_u_user_wallet: walletId, status: 2 });
};

export const createUserWithdraw: (
  walletId: number,
  data: WithdrawBody,
) => Promise<ModelType['UserWithdraw']> = function createUserWithdraw(
  walletId,
  { user_bank_id: userBankId, balance_request },
) {
  return UserWithdraw.create({
    balance_request,
    id_u_user_wallet: walletId,
    id_u_user_bank_account: userBankId,
    status: 2,
  });
};

export const createMedia: (label: string) => Promise<ModelType['Media']> = function createUserImg(
  label,
) {
  return Media.create({ label, uri: label });
};

export const updateUserWallet: (
  id: number,
  data: { balance: number },
) => Promise<[number, ModelType['UserWallet'][]]> = function updateUserWallet(id, { balance }) {
  return UserWallet.update({ balance }, { where: { id } });
};

export const updateUserTopUp: (
  topUpId: number,
  data: Partial<UpdateTopUpStatusBody> & { proofId?: number },
) => Promise<[number, ModelType['UserTopUp'][]]> = function updateUserTopUp(
  topUpId,
  { status, proofId },
) {
  return UserTopUp.update({ status, proof_id: proofId }, { where: { id: topUpId } });
};

export const updateUserWithdraw: (
  withdraw: number,
  data: UpdateWithdrawStatusBody,
) => Promise<[number, ModelType['UserWithdraw'][]]> = function updateUserWitdraw(withdrawId, data) {
  return UserWithdraw.update(data, { where: { id: withdrawId } });
};

export const getUserWallets: (
  userId: number,
) => Promise<UserWalletType[]> = function getUserWallets(userId) {
  const sqlQuery = `
    SELECT
      uuw.id,
      mw.wallet_name,
      mw.wallet_description,
      uuw.balance
    FROM u_user_wallet uuw
      LEFT JOIN m_wallets mw ON mw.id = uuw.id_m_wallets
      LEFT JOIN u_user uu ON uu.id = uuw.id_u_user
    WHERE uu.id_m_users = :userId
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

export const getMasterBank: (bankId: number) => Promise<unknown | null> = function getMasterBank(
  bankId,
) {
  const sqlQuery = `
    SELECT
      id
    FROM m_banks
    WHERE id = :bankId
  `;

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { bankId },
  });
};

export const getUserBank: (
  userBankId: number,
  userId: number,
) => Promise<unknown | null> = function getUserBank(userBankId, userId) {
  const sqlQuery = `
    SELECT
      id
    FROM u_user_bank_account
    WHERE id = :userBankId AND id_m_users = :userId
  `;

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { userBankId, userId },
  });
};

export const getUserTopUps: (
  userId: number,
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = function getUserTopUps(userId, query) {
  let sqlQuery = `
    SELECT
      *
    FROM (
      SELECT
        uuwtu.id,
        uuwtu.balance_request,
        uuwtu.balance_transfer,
        uuwtu.status,
        mb.bank_name,
        mm.label AS proof_label,
        mm.uri AS proof_url,
        uuwtu.created_at,
        uuwtu.updated_at
      FROM u_user_wallet_top_up uuwtu
        LEFT JOIN u_user_wallet uuw ON uuw.id = uuwtu.id_u_user_wallet
        LEFT JOIN m_banks mb ON mb.id = uuwtu.id_m_banks
        LEFT JOIN m_medias mm ON mm.id = uuwtu.proof_id
      WHERE uuw.id_u_user = :userId
    ) as topup
  `;

  sqlQuery += queryingBuilder(query);

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
    replacements: { userId },
  });
};

export const getUserWithdraws: (
  userId: number,
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = function getUserWithdraws(userId, query) {
  let sqlQuery = `
    SELECT
      *
    FROM (
      SELECT
        uuww.id,
        uuww.balance_request,
        uuww.status,
        mb.bank_name,
        uuww.created_at,
        uuww.updated_at
      FROM u_user_wallet_withdraw uuww
        LEFT JOIN u_user_bank_account uuba ON uuba.id = uuww.id_u_user_bank_account
        LEFT JOIN m_banks mb ON mb.id = uuba.id_m_banks
      WHERE uuba.id_m_users = :userId
    ) as withdraw
  `;

  sqlQuery += queryingBuilder(query);

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
    replacements: { userId },
  });
};

export const getUserTopUp: (
  userId: number,
  topUpId: number,
) => Promise<unknown | null> = function getTopUp(userId, topUpId) {
  const sqlQuery = `
    SELECT
      uuwtu.id,
      uuwtu.balance_request,
      uuwtu.balance_transfer,
      uuwtu.status,
      mu.full_name AS user_name,
      uuwtu.created_at,
      uuwtu.updated_at
    FROM u_user_wallet_top_up uuwtu
      LEFT JOIN u_user_wallet uuw ON uuw.id = uuwtu.id_u_user_wallet
      LEFT JOIN u_user uu ON uu.id = uuw.id_u_user
      LEFT JOIN m_users mu ON mu.id = uu.id_m_users
    WHERE mu.id = :userId AND uuwtu.id = :topUpId
  `;

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { userId, topUpId },
  });
};

export const getUserWithdraw: (
  userId: number,
  withdrawId: number,
) => Promise<unknown | null> = function getUserWithdraw(userId, withdrawId) {
  const sqlQuery = `
    SELECT
      uuww.id,
      uuww.balance_request,
      uuww.status,
      mb.bank_name,
      uuww.created_at,
      uuww.updated_at
    FROM u_user_wallet_withdraw uuww
      LEFT JOIN u_user_bank_account uuba ON uuba.id = uuww.id_u_user_bank_account
      LEFT JOIN m_banks mb ON mb.id = uuba.id_m_banks
    WHERE uuba.id_m_users = :userId AND uuww.id = :withdrawId
  `;

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { userId, withdrawId },
  });
};

export const getAllTopUp: (
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = function getAllTopUp({ status, ...query }) {
  let sqlQuery = `
    SELECT
      uuwtu.id,
      uuwtu.balance_request,
      uuwtu.balance_transfer,
      uuwtu.status,
      mb.bank_name,
      mm.label AS proof_label,
      mm.uri AS proof_url,
      uuwtu.created_at,
      uuwtu.updated_at
    FROM u_user_wallet_top_up uuwtu
      LEFT JOIN u_user_wallet uuw ON uuw.id = uuwtu.id_u_user_wallet
      LEFT JOIN m_banks mb ON mb.id = uuwtu.id_m_banks
      LEFT JOIN m_medias mm ON mm.id = uuwtu.proof_id
  `;

  if (status) sqlQuery += `WHERE uuwtu.status = ${status}`;

  sqlQuery = `
    SELECT
      *
    FROM (
      ${sqlQuery}
    ) as topup
  `;

  sqlQuery += queryingBuilder(query);

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
  });
};

export const getAllWithdraw: (
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = function getAllWithdraw({ status, ...query }) {
  let sqlQuery = `
    SELECT
      uuww.id,
      uuww.balance_request,
      uuww.status,
      mb.bank_name,
      uuww.created_at,
      uuww.updated_at
    FROM u_user_wallet_withdraw uuww
      LEFT JOIN u_user_bank_account uuba ON uuba.id = uuww.id_u_user_bank_account
      LEFT JOIN m_banks mb ON mb.id = uuba.id_m_banks
  `;

  if (status) sqlQuery += `WHERE uuww.status = ${status}`;

  sqlQuery = `
    SELECT
      *
    FROM (
      ${sqlQuery}
    ) as withdraw
  `;

  sqlQuery += queryingBuilder(query);

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
  });
};

export const getUserTopUpRequest: (
  topUpId: number,
) => Promise<TransferRequest | null> = function getUserTopUpRequest(topUpId) {
  const sqlQuery = `
    SELECT
      uuwtu.id,
      uuwtu.balance_request AS balanceRequest,
      uuwtu.status,
      uuw.id AS walletId,
      uuw.balance
    FROM u_user_wallet_top_up uuwtu
      LEFT JOIN u_user_wallet uuw ON uuw.id = uuwtu.id_u_user_wallet
      LEFT JOIN u_user uu ON uu.id = uuw.id_u_user
    WHERE uuwtu.id = :topUpId AND uuwtu.status = 2
  `;

  return sequelize.query<TransferRequest>(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { topUpId },
  });
};

export const getUserWithdrawRequest: (
  withdrawId: number,
) => Promise<TransferRequest | null> = function getUserWithdrawRequest(withdrawId) {
  const sqlQuery = `
    SELECT
      uuww.id,
      uuww.balance_request AS balanceRequest,
      uuww.status,
      uuw.id AS walletId,
      uuw.balance
    FROM u_user_wallet_withdraw uuww
      LEFT JOIN u_user_wallet uuw ON uuw.id = uuww.id_u_user_wallet
      LEFT JOIN u_user uu ON uu.id = uuw.id_u_user
    WHERE uuww.id = :withdrawId AND uuww.status = 2
  `;

  return sequelize.query<TransferRequest>(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { withdrawId },
  });
};
