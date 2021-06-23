import type CustModelType from '../../types/model';
import type {
  PostBankBody,
  UpdateBankBody,
  UpdateBankDetailBody,
  ChangeBankLogoBody,
  PostBankStepBody,
  PostCategoryBody,
  UpdateCategoryBody,
  ChangeCategoryIconBody,
  PostMediaBody,
  PostWalletBody,
  UpdateWalletBody,
  UpdateWalletLogoBody,
  PostFaqBody,
  UpdateFaqBody,
} from '../../types/schema';
import { saveFiles, deleteLocalFile } from '../../utils/file-management';
import { ErrorResponse } from '../../utils/error-handler';
import {
  createBank,
  createMedia,
  createBankStep,
  createCategory,
  findOrCreateBankAcc,
  updateBank,
  updateBankAcc,
  updateMedia,
  updateCategory,
  deleteBankStep,
  deleteBank,
  deleteCategory,
  getBanks,
  getBank,
  getBankUtilitiesByBankId,
  getBankAccountsByBankId,
  getCategories,
  getCategory,
} from '../../repositories/MasterRepository';

export const postBank: (data: PostBankBody) => Promise<void> = async function postBank({
  logo,
  bank_name,
}) {
  if (logo) {
    const { id } = await createMedia(logo[0].filename);
    await createBank({ bank_name, logoId: id });
    await saveFiles(logo);
  } else await createBank({ bank_name });
};

export const getBankData: (
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function getBankData(query) {
  const result = await getBanks(query);

  return result;
};

export const getSingleBank: (bankId: number) => Promise<unknown> = async function getSingleBank(
  bankId,
) {
  const bank = await getBank(bankId);

  if (!bank) throw new ErrorResponse(`bank with id ${bankId} not found`, 404);

  const { logoId, ...restBank } = bank;
  const { id } = restBank;
  const [bankUtilities, bankAccounts] = await Promise.all([
    getBankUtilitiesByBankId(id),
    getBankAccountsByBankId(id),
  ]);

  return {
    ...restBank,
    steps: bankUtilities,
    accounts: bankAccounts,
  };
};

export const updateBankData: (
  bankId: number,
  data: UpdateBankBody,
) => Promise<void> = async function updateBankData(bankId, data) {
  const [isUpdated] = await updateBank(bankId, data);

  if (!isUpdated) throw new ErrorResponse(`bank with id ${bankId} not found`, 404);
};

export const updateBankDetail: (
  bankId: number,
  data: UpdateBankDetailBody,
) => Promise<void> = async function updateBankDetail(bankId, data) {
  const [bankAccount, isCreated] = await findOrCreateBankAcc(bankId, data);

  if (!isCreated) await updateBankAcc(bankAccount.id, data);
};

export const changeBankLogo: (
  bankId: number,
  data: ChangeBankLogoBody,
) => Promise<void> = async function changeBankLogo(bankId, { logo }) {
  const bank = await getBank(bankId);

  if (!bank) throw new ErrorResponse(`bank with id ${bankId} not found`, 404);

  const { logoId, logo_url: logoUrl } = bank;
  const { filename } = logo[0];

  if (logoId && logoUrl) {
    await updateMedia(logoId, filename);
    await Promise.all([saveFiles(logo), deleteLocalFile(logoUrl)]);
  } else {
    const { id } = await createMedia(filename);

    await updateBank(bankId, { logoId: id });
    await saveFiles(logo);
  }
};

export const postBankStep: (
  bankId: number,
  data: PostBankStepBody,
) => Promise<void> = async function postBankStep(bankId, { step }) {
  const bank = await getBank(bankId);

  if (!bank) throw new ErrorResponse(`bank with id ${bankId} not found`, 404);

  await createBankStep(bankId, step);
};

export const deleteBankStepData: (
  bankStepId: number,
) => Promise<void> = async function deleteBankStepData(bankStepId) {
  const isDeleted = await deleteBankStep(bankStepId);

  if (!isDeleted) throw new ErrorResponse(`bank step with id ${bankStepId} not found`, 404);
};

export const deleteBankData: (bankId: number) => Promise<void> = async function deleteBankData(
  bankId,
) {
  const isDeleted = await deleteBank(bankId);

  if (!isDeleted) throw new ErrorResponse(`bank with id ${bankId} not found`, 404);
};

export const postCategoryData: (
  data: PostCategoryBody,
) => Promise<void> = async function postCategoryData({ icon, ...data }) {
  if (icon) {
    const { id } = await createMedia(icon[0].filename);
    await createCategory({ ...data, iconId: id });
    await saveFiles(icon);
  } else await createCategory(data);
};

export const getCategoryData: (
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function getCategorieyData(query) {
  const categories = await getCategories(query);

  return categories;
};

export const updateCategoryData: (
  categoryId: number,
  data: UpdateCategoryBody,
) => Promise<void> = async function updateCategoryData(categoryId, data) {
  const [isUpdated] = await updateCategory(categoryId, data);

  if (!isUpdated) throw new ErrorResponse(`category with id ${categoryId} not found`, 404);
};

export const updateCategoryIcon: (
  categoryId: number,
  data: ChangeCategoryIconBody,
) => Promise<void> = async function updateCategoryIcon(categoryId, { icon }) {
  const category = await getCategory(categoryId);

  if (!category) throw new ErrorResponse(`category with id ${categoryId} not found`, 404);

  const { iconId, icon_url: iconUrl } = category;
  const { filename } = icon[0];

  if (iconId && iconUrl) {
    await updateMedia(iconId, filename);
    await Promise.all([saveFiles(icon), deleteLocalFile(iconUrl)]);
  } else {
    const { id } = await createMedia(filename);

    await updateCategory(categoryId, { iconId: id });
    await saveFiles(icon);
  }
};

export const deleteCategoryData: (
  categoryId: number,
) => Promise<void> = async function deleteCategoryData(categoryId) {
  const isDeleted = await deleteCategory(categoryId);

  if (!isDeleted) throw new ErrorResponse(`category with id ${categoryId} not found`, 404);
};
