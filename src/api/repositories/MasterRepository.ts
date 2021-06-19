import { QueryTypes } from 'sequelize';
import type CustModelType from '../types/model';
import type {
  PostBankBody,
  UpdateBankBody,
  UpdateBankDetailBody,
  UpdateBankLogoBody,
  PostBankStepBody,
  PostCategoryBody,
  UpdateCategoryBody,
  PostMediaBody,
  PostWalletBody,
  UpdateWalletBody,
  UpdateWalletLogoBody,
  PostFaqBody,
  UpdateFaqBody,
} from '../types/schema';
import sequelize from '../../databases/sequelize';
import { queryingBuilder } from '../utils/sql-query-builder';
import initModels, { ModelType } from '../models/sql/init-models';

const { Bank, Category, Media, Wallet, Faq } = initModels(sequelize);

export const createBank: (
  data: Pick<PostBankBody, 'bank_name'> & { logoId?: number },
) => Promise<ModelType['Bank']> = function createBank({ bank_name, logoId }) {
  return Bank.create({ bank_name, id_logo: logoId });
};

export const createMedia: (label: string) => Promise<ModelType['Media']> = function createUserImg(
  label,
) {
  return Media.create({ label, uri: `/img/${label}` });
};

export const getBanks: (
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = function getBanks(query) {
  let sqlQuery = `
    SELECT 
      mb.id, 
      mb.bank_name, 
      mm.label AS logo_label, 
      mm.uri AS logo_url, 
      mb.created_at, 
      mb.updated_at 
    FROM m_banks mb 
    `;

  sqlQuery += queryingBuilder(query);

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
  });
};

type Test = {
  id: number;
  [index: string]: unknown;
};

export const getBank: (
  bankId: string,
) => Promise<{ id: number; [index: string]: unknown }> = function getBank(bankId) {
  const sqlQuery = `
    SELECT
      mb.id,
      mb.bank_name,
      mm.label AS logo_label,
      mm.uri AS logo_url,
      ub.id AS step_id,
      mb.created_at,
      mb.updated_at
    FROM m_banks mb
    LEFT JOIN m_medias mm on mm.id = mb.id_logo
    WHERE mb.id = :bankId;
  `;

  return sequelize.query(sqlQuery, {
    replacements: { bankId },
    type: QueryTypes.SELECT,
    plain: true,
  });
};

export const getBankUtilitiesByBankId: (
  bankId: number,
) => Promise<unknown> = function getBankStepByBankId(bankId) {
  const sqlQuery = `
    SELECT
      id,
      step
    FROM u_bank
    WHERE id_m_banks = :bankId;
  `;

  return sequelize.query(sqlQuery, {
    replacements: { bankId },
    type: QueryTypes.SELECT,
  });
};

export const getBankAccountsByBankId: (
  bankId: number,
) => Promise<unknown> = function getBankAccountsByBankId(bankId) {
  const sqlQuery = `
    SELECT
      id,
      account_name,
      account_number
    FROM u_bank_account
    WHERE id_m_banks = :bankId;
  `;

  return sequelize.query(sqlQuery, {
    replacements: { bankId },
    type: QueryTypes.SELECT,
  });
};
