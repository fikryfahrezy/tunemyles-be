import { QueryTypes } from 'sequelize';
import type CustModelType from '../types/model';
import type {
  PostBankBody,
  UpdateBankBody,
  UpdateBankDetailBody,
  PostCategoryBody,
  UpdateCategoryBody,
  PostWalletBody,
  UpdateWalletBody,
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

type CategoryIconType = {
  iconId: number | null;
  iconUrl: string | null;
  [index: string]: unknown;
};

type MediaUrlType = {
  url: string;
  [index: string]: unknown;
};

type WalletLogoType = {
  logoId: number | null;
  logoUrl: string | null;
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
  return Media.create({ label, uri: label });
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

export const createWallet: (
  data: Omit<PostWalletBody, 'logo'> & { logoId?: number },
) => Promise<ModelType['Wallet']> = function createWallet({ logoId, ...data }) {
  return Wallet.create({ ...data, id_logo: logoId });
};

export const createFaq: (data: PostFaqBody) => Promise<ModelType['Faq']> = function createFaq(
  data,
) {
  return Faq.create(data);
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

export const updateWallet: (
  walletId: number,
  data: UpdateWalletBody & { logoId?: number },
) => Promise<[number, ModelType['Wallet'][]]> = function updateWallet(
  walletId,
  { logoId, visbility, ...data },
) {
  return Wallet.update(
    { ...data, is_visible: visbility, id_logo: logoId },
    { where: { id: walletId } },
  );
};

export const updateFaq: (
  faqId: number,
  data: UpdateFaqBody,
) => Promise<[number, ModelType['Faq'][]]> = function updateFaq(faqId, data) {
  return Faq.update(data, { where: { id: faqId } });
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

export const deleteMedia: (mediaId: number) => Promise<number> = function deleteMedia(mediaId) {
  return Media.destroy({ where: { id: mediaId } });
};

export const deleteWallet: (walletId: number) => Promise<number> = function deleteWallet(walletId) {
  return Wallet.destroy({ where: { id: walletId } });
};

export const deleteFaq: (faqId: number) => Promise<number> = function deleteFaq(faqId) {
  return Faq.destroy({ where: { id: faqId } });
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
      LEFT JOIN m_medias mm ON mm.id = mb.id_logo
    `;

  sqlQuery += queryingBuilder(query);

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
  });
};

export const getBank: (bankId: number) => Promise<BankType | null> = function getBank(bankId) {
  const sqlQuery = `
    SELECT
      mb.id,
      mb.bank_name,
      mm.id AS logoId,
      mm.label AS logo_label,
      mm.uri AS logo_url,
      mb.created_at,
      mb.updated_at
    FROM m_banks mb
      LEFT JOIN m_medias mm ON mm.id = mb.id_logo
    WHERE mb.id = :bankId;
  `;

  return sequelize.query<BankType>(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { bankId },
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
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
    replacements: { bankId },
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
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
    replacements: { bankId },
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
      mm.label AS icon_label,
      mm.uri AS icon_url,
      mc.created_at,
      mc.updated_at
    FROM m_categories mc
      LEFT JOIN m_medias mm ON mm.id = mc.id_icon
  `;

  sqlQuery += queryingBuilder(query);

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
  });
};

export const getCategoryIcon: (
  categoryId: number,
) => Promise<CategoryIconType | null> = function getCategoryIcon(categoryId) {
  const sqlQuery = `
    SELECT
      mm.id AS iconId,
      mm.uri AS iconUrl
    FROM m_categories mc
      LEFT JOIN m_medias mm ON mm.id = mc.id_icon
    WHERE mc.id = :categoryId
  `;

  return sequelize.query<CategoryIconType>(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { categoryId },
  });
};

export const getMedias: (
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = function getMedias(query) {
  let sqlQuery = `
    SELECT
      mm.id,
      mm.label AS media,
      mm.uri AS url,
      mm.created_at,
      mm.updated_at
    FROM m_medias mm
  `;

  sqlQuery += queryingBuilder(query);

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
  });
};

export const getMediaUrl: (mediaId: number) => Promise<MediaUrlType | null> = function getMediaUrl(
  mediaId,
) {
  const sqlQuery = `
    SELECT
      mm.uri AS url
    FROM m_medias mm
    WHERE mm.id = :mediaId
  `;

  return sequelize.query<MediaUrlType>(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { mediaId },
  });
};

export const getWallets: (
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = function getWallets(query) {
  let sqlQuery = `
    SELECT
      mw.id,
      mw.wallet_name,
      mw.wallet_description,
      mm.label AS logo_label,
      mm.uri AS logo_url,
      mw.created_at,
      mw.updated_at
    FROM m_wallets mw
      LEFT JOIN m_medias mm ON mm.id = mw.id_logo
  `;

  sqlQuery += queryingBuilder(query);

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
  });
};

export const getWalletLogo: (
  walletId: number,
) => Promise<WalletLogoType | null> = function getWalletLogo(walletId) {
  const sqlQuery = `
    SELECT
      mm.id AS logoId,
      mm.uri AS logoUrl
    FROM m_wallets mw
      LEFT JOIN m_medias mm ON mm.id = mw.id_logo
    WHERE mw.id = :walletId
  `;

  return sequelize.query<WalletLogoType>(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { walletId },
  });
};

export const getFaqs: () => Promise<unknown> = async function getFaqs() {
  const sqlQuery = `
    SELECT
      mf.id,
      mf.question,
      mf.answer,
      mf.created_at,
      mf.updated_at
    FROM m_faq mf
  `;

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
  });
};
