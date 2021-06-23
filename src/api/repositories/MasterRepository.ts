import { QueryTypes } from 'sequelize';
import type CustModelType from '../types/model';
import type {
  PostBankBody,
  UpdateBankBody,
  UpdateBankDetailBody,
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

type BankType = {
  id: number;
  logoId: number | null;
  logo_url: string | null;
  [index: string]: unknown;
};

type CategoryType = {
  iconId: number | null;
  icon_url: string | null;
  [index: string]: unknown;
};

const { Bank, BankAccount, BankUtility, Category, Media, Wallet, Faq } = initModels(sequelize);

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

export const createBankStep: (
  bankId: number,
  step: string,
) => Promise<ModelType['BankUtility']> = function createBankStep(bankId, step) {
  return BankUtility.create({ step, id_m_banks: bankId });
};

export const createCategory: (
  data: Omit<PostCategoryBody, 'icon'> & { iconId?: number },
) => Promise<ModelType['Category']> = function createCategory({ iconId, ...data }) {
  return Category.create({ ...data, id_icon: iconId });
};

export const findOrCreateBankAcc: (
  bankId: number,
  data: UpdateBankDetailBody,
) => Promise<[ModelType['BankAccount'], boolean]> = function findOrCreateBankAcc(bankId, data) {
  return BankAccount.findOrCreate({
    where: { id_m_banks: bankId },
    defaults: { ...data, id_m_banks: bankId },
  });
};

export const updateBank: (
  bankId: number,
  data: UpdateBankBody & { logoId?: number },
) => Promise<[number, ModelType['Bank'][]]> = function updateBank(
  bankId,
  { bank_name, visibility, logoId },
) {
  return Bank.update(
    { bank_name, is_visible: visibility, id_logo: logoId },
    { where: { id: bankId } },
  );
};

export const updateBankAcc: (
  bankAccId: number,
  data: UpdateBankDetailBody,
) => Promise<[number, ModelType['BankAccount'][]]> = function updateBankAcc(bankAccId, data) {
  return BankAccount.update(data, { where: { id: bankAccId } });
};

export const updateMedia: (
  mediaId: number,
  label: string,
) => Promise<[number, ModelType['Media'][]]> = function updateBankLogo(mediaId, label) {
  return Media.update({ label, uri: `/img/${label}` }, { where: { id: mediaId } });
};

export const updateCategory: (
  categoryId: number,
  data: UpdateCategoryBody & { iconId?: number },
) => Promise<[number, ModelType['Category'][]]> = function updateCategory(
  categoryId,
  { iconId, visibility, ...data },
) {
  return Category.update(
    { ...data, is_visible: visibility, id_icon: iconId },
    { where: { id: categoryId } },
  );
};

export const deleteBankStep: (bankStepId: number) => Promise<number> = function deleteBankStep(
  bankStepId,
) {
  return BankUtility.destroy({ where: { id: bankStepId } });
};

export const deleteBank: (bankId: number) => Promise<number> = function deleteBank(bankId) {
  return Bank.destroy({ where: { id: bankId } });
};

export const deleteCategory: (categoryId: number) => Promise<number> = function deleteCategory(
  categoryId,
) {
  return Category.destroy({ where: { id: categoryId } });
};

export const getBanks: (
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = function getBanks(query) {
  let sqlQuery = `
    SELECT 
      mb.id, 
      mb.bank_name, 
      mm.label AS logo, 
      mm.uri AS logo_url, 
      mb.created_at, 
      mb.updated_at 
    FROM m_banks mb
    LEFT JOIN m_medias mm ON mm.id = mb.id_logo
    `;

  sqlQuery += queryingBuilder(query);

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
  });
};

export const getBank: (bankId: number) => Promise<BankType | null> = function getBank(bankId) {
  const sqlQuery = `
    SELECT
      mb.id,
      mb.bank_name,
      mm.id AS logoId,
      mm.label AS logo,
      mm.uri AS logo_url,
      mb.created_at,
      mb.updated_at
    FROM m_banks mb
    LEFT JOIN m_medias mm ON mm.id = mb.id_logo
    WHERE mb.id = :bankId;
  `;

  return sequelize.query<BankType>(sqlQuery, {
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

export const getCategories: (
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = function getCategories(query) {
  let sqlQuery = `
    SELECT
      mc.id,
      mc.category,
      mc.description,
      mc.slug,
      mm.label AS icon,
      mm.uri AS icon_url,
      mc.created_at,
      mc.updated_at
    FROM m_categories mc
    LEFT JOIN m_medias mm ON mc.id_icon = mm.id
  `;

  sqlQuery += queryingBuilder(query);

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
  });
};

export const getCategory: (
  categoryId: number,
) => Promise<CategoryType | null> = function getCategory(categoryId) {
  const sqlQuery = `
    SELECT
      mm.id AS iconId,
      mm.uri AS icon_url
    FROM m_categories mc
    LEFT JOIN m_medias mm ON mc.id_icon = mm.id
    WHERE mc.id = :categoryId
  `;

  return sequelize.query<CategoryType>(sqlQuery, {
    replacements: { categoryId },
    type: QueryTypes.SELECT,
    plain: true,
  });
};
