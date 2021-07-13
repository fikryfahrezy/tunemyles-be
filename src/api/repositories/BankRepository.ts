import { QueryTypes } from 'sequelize';
import type { PostBankUserBody, UpdateBankUserBody } from '../types/schema';
import sequelize from '../../databases/sequelize';
import initModels, { ModelType } from '../models/sql/init-models';

type BankType = {
  id: number;
  [index: string]: unknown;
};

const { BankUser } = initModels(sequelize);

export const createBankUser: (
  userId: number,
  data: PostBankUserBody,
) => Promise<ModelType['BankUser']> = function createBankUser(userId, { bank_id, ...data }) {
  return BankUser.create({ ...data, id_m_banks: bank_id, id_m_users: userId });
};

export const updateBankUser: (
  userBankId: number,
  userId: number,
  data: UpdateBankUserBody,
) => Promise<[number, ModelType['BankUser'][]]> = function updateBankUser(
  userBankId,
  userId,
  data,
) {
  return BankUser.update(data, { where: { id: userBankId, id_m_users: userId } });
};

export const deleteBankUser: (
  userBankId: number,
  userId: number,
) => Promise<number> = function deleteBankUser(userBankId, userId) {
  return BankUser.destroy({ where: { id: userBankId, id_m_users: userId } });
};

export const getBank: (bankId: number) => Promise<BankType | null> = function getBank(bankId) {
  const sqlQuery = `
    SELECT
      mb.id,
      mb.bank_name,
      mb.is_visible AS visibility,
      mm.label AS logo_label,
      mm.uri AS logo_url,
      mb.created_at,
      mb.updated_at
    FROM m_banks mb
      LEFT JOIN m_medias mm ON mm.id = mb.id_logo
    WHERE mb.id = :bankId
  `;

  return sequelize.query<BankType>(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { bankId },
  });
};

export const getBanks: () => Promise<BankType[]> = function getBanks() {
  const sqlQuery = `
    SELECT
      mb.id,
      mb.bank_name,
      mb.is_visible AS visibility,
      mm.label AS logo_label,
      mm.uri AS logo_url,
      mb.created_at,
      mb.updated_at
    FROM m_banks mb
      LEFT JOIN m_medias mm ON mm.id = mb.id_logo
  `;

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
  });
};

export const getBankAccountsByBankId: (
  bankId: number,
) => Promise<unknown> = function getBankAccountsByBankId(bankId) {
  const sqlQuery = `
    SELECT
      account_name,
      account_number
    FROM u_bank_account
    WHERE id_m_banks = :bankId
  `;

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
    replacements: { bankId },
  });
};

export const getBankUtilitiesByBankId: (
  bankId: number,
) => Promise<unknown> = function getBankUtilitiesByBankId(bankId) {
  const sqlQuery = `
    SELECT
      step
    FROM u_bank
    WHERE id_m_banks = :bankId
  `;

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
    replacements: { bankId },
  });
};

export const getBankUsers: (userId: number) => Promise<unknown> = function getBankUsers(userId) {
  const sqlQuery = `
    SELECT
      uuba.id,
      uuba.account_number,
      uuba.account_name,
      uuba.is_visible AS visibility,
      mb.bank_name,
      mm.label AS logo_label,
      mm.uri AS logo_url,
      uuba.created_at,
      uuba.updated_at
    FROM u_user_bank_account uuba
      LEFT JOIN m_banks mb ON mb.id = uuba.id_m_banks
      LEFT JOIN m_medias mm ON mm.id = mb.id_logo
    WHERE uuba.id_m_users = :userId
  `;

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
    replacements: { userId },
  });
};
