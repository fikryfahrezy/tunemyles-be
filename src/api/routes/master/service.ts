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
  createWallet,
  createFaq,
  findOrCreateBankAcc,
  updateBank,
  updateBankAcc,
  updateMedia,
  updateCategory,
  updateWallet,
  updateFaq,
  deleteBankStep,
  deleteBank,
  deleteCategory,
  deleteMedia,
  deleteWallet,
  deleteFaq,
  getBanks,
  getBank,
  getBankUtilitiesByBankId,
  getBankAccountsByBankId,
  getCategories,
  getCategory,
  getMedias,
  getMedia,
  getWallets,
  getWallet,
  getFaqs,
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
  const bank = await getBank(bankId);

  if (!bank) throw new ErrorResponse(`bank with id ${bankId} not found`, 404);

  const { logoId, logo_url: logoUrl } = bank;

  await deleteBank(bankId);

  if (logoId && logoUrl) {
    await deleteMedia(logoId);
    deleteLocalFile(logoUrl);
  }
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

  const { iconId, iconUrl } = category;
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
  const category = await getCategory(categoryId);

  if (!category) throw new ErrorResponse(`category with id ${categoryId} not found`, 404);

  const { iconId, iconUrl } = category;

  await deleteCategory(categoryId);

  if (iconId && iconUrl) {
    await deleteMedia(iconId);
    deleteLocalFile(iconUrl);
  }
};

export const postMediaData: (data: PostMediaBody) => Promise<void> = async function postMediData({
  image,
}) {
  await createMedia(image[0].filename);
  await saveFiles(image);
};

export const getMediaData: (
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function getMediaData(query) {
  const medias = await getMedias(query);

  return medias;
};

export const updateMediaData: (
  mediaId: number,
  data: PostMediaBody,
) => Promise<void> = async function updaetMediaData(mediaId, { image }) {
  const media = await getMedia(mediaId);

  if (!media) throw new ErrorResponse(`media with id ${mediaId} not found`, 404);

  await updateMedia(mediaId, image[0].filename);
  await Promise.all([saveFiles(image), deleteLocalFile(media.url)]);
};

export const deleteMediaData: (mediaId: number) => Promise<void> = async function deleteMediaData(
  mediaId,
) {
  const media = await getMedia(mediaId);

  if (!media) throw new ErrorResponse(`media with id ${mediaId} not found`, 404);

  const isDeleted = await deleteMedia(mediaId);

  if (!isDeleted) deleteLocalFile(media.url);
};

export const postWalletData: (
  data: PostWalletBody,
) => Promise<void> = async function postWalletData({ logo, ...data }) {
  if (logo) {
    const { id } = await createMedia(logo[0].filename);

    await createWallet({ ...data, logoId: id });
    await saveFiles(logo);
  } else await createWallet(data);
};

export const getWalletData: (
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function getWalletData(query) {
  const wallets = await getWallets(query);

  return wallets;
};

export const updateWalletData: (
  walletId: number,
  data: UpdateWalletBody,
) => Promise<void> = async function updateWalletData(walletId, data) {
  const [isUpdated] = await updateWallet(walletId, data);

  if (!isUpdated) throw new ErrorResponse(`wallet with id ${walletId} not found`, 404);
};

export const changeWalletLogo: (
  walletId: number,
  data: UpdateWalletLogoBody,
) => Promise<void> = async function changeWalletLogo(walletId, { logo }) {
  const wallet = await getWallet(walletId);

  if (!wallet) throw new ErrorResponse(`wallet with id ${walletId} not found`, 404);

  const { logoId, logoUrl } = wallet;
  const { filename } = logo[0];

  if (logoId && logoUrl) {
    await updateMedia(logoId, filename);
    await Promise.all([saveFiles(logo), deleteLocalFile(logoUrl)]);
  } else {
    const { id } = await createMedia(filename);

    await updateWallet(walletId, { logoId: id });
    await saveFiles(logo);
  }
};

export const deleteWalletData: (
  walletId: number,
) => Promise<void> = async function deleteWalletData(walletId) {
  const wallet = await getWallet(walletId);

  if (!wallet) throw new ErrorResponse(`wallet with id ${walletId} not found`, 404);

  const { logoId, logoUrl } = wallet;

  await deleteWallet(walletId);

  if (logoId && logoUrl) {
    await deleteMedia(logoId);
    deleteLocalFile(logoUrl);
  }
};

export const postFaqData: (data: PostFaqBody) => Promise<void> = async function postFaqData(data) {
  await createFaq(data);
};

export const getFaqData: () => Promise<unknown> = async function getFaqData() {
  const faqs = await getFaqs();

  return faqs;
};

export const updateFaqData: (
  faqId: number,
  data: UpdateFaqBody,
) => Promise<void> = async function updateFaqData(faqId, data) {
  const [isUpdated] = await updateFaq(faqId, data);

  if (!isUpdated) throw new ErrorResponse(`faq with id ${faqId} not found`, 404);
};

export const deleteFaqData: (faqId: number) => Promise<void> = async function deleteFaqData(faqId) {
  const isDeleted = await deleteFaq(faqId);

  if (!isDeleted) throw new ErrorResponse(`faq with id ${faqId} not found`, 404);
};
