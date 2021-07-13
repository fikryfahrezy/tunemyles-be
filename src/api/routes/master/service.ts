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
import { saveFile, deleteLocalFile } from '../../utils/file-management';
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
  getCategoryIcon,
  getMedias,
  getMediaUrl,
  getWallets,
  getWalletLogo,
  getFaqs,
} from '../../repositories/MasterRepository';

export const postBank: (data: PostBankBody) => Promise<void> = async function postBank({
  logo,
  bank_name,
}) {
  if (logo) {
    const img = logo[0];
    const { id } = await createMedia(img.filename);

    await createBank({ bank_name, logoId: id });
    await saveFile(img);
  } else await createBank({ bank_name });
};

export const getBankData: (
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function getBankData(query) {
  const result = await getBanks(query);

  return result;
};

export const getBankDetail: (bankId: number) => Promise<unknown> = async function getSingleBank(
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
  const [affectedRows] = await updateBank(bankId, data);

  if (affectedRows < 0) throw new ErrorResponse(`bank with id ${bankId} not found`, 404);
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
  const img = logo[0];
  const { filename } = img;

  if (logoId && logoUrl) {
    await updateMedia(logoId, filename);
    await Promise.all([saveFile(img), deleteLocalFile(logoUrl)]);
  } else {
    const { id } = await createMedia(filename);

    await updateBank(bankId, { logoId: id });
    await saveFile(img);
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
  const affctedRows = await deleteBankStep(bankStepId);

  if (!affctedRows) throw new ErrorResponse(`bank step with id ${bankStepId} not found`, 404);
};

export const deleteBankData: (bankId: number) => Promise<void> = async function deleteBankData(
  bankId,
) {
  const bank = await getBank(bankId);

  if (!bank) throw new ErrorResponse(`bank with id ${bankId} not found`, 404);

  const { logoId, logo_url: logoUrl } = bank;
  const affectedRows = await deleteBank(bankId);

  if (affectedRows > 0 && logoId && logoUrl) {
    await deleteMedia(logoId);
    deleteLocalFile(logoUrl);
  }
};

export const postCategoryData: (
  data: PostCategoryBody,
) => Promise<void> = async function postCategoryData({ icon, ...data }) {
  if (icon) {
    const img = icon[0];
    const { id } = await createMedia(img.filename);

    await createCategory({ ...data, iconId: id });
    await saveFile(img);
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
  const [affectedRows] = await updateCategory(categoryId, data);

  if (affectedRows < 0) throw new ErrorResponse(`category with id ${categoryId} not found`, 404);
};

export const updateCategoryIcon: (
  categoryId: number,
  data: ChangeCategoryIconBody,
) => Promise<void> = async function updateCategoryIcon(categoryId, { icon }) {
  const categoryIcon = await getCategoryIcon(categoryId);

  if (!categoryIcon) throw new ErrorResponse(`category with id ${categoryId} not found`, 404);

  const { iconId, iconUrl } = categoryIcon;
  const img = icon[0];
  const { filename } = img;

  if (iconId && iconUrl) {
    await updateMedia(iconId, filename);
    await Promise.all([saveFile(img), deleteLocalFile(iconUrl)]);
  } else {
    const { id } = await createMedia(filename);

    await updateCategory(categoryId, { iconId: id });
    await saveFile(img);
  }
};

export const deleteCategoryData: (
  categoryId: number,
) => Promise<void> = async function deleteCategoryData(categoryId) {
  const categoryIcon = await getCategoryIcon(categoryId);

  if (!categoryIcon) throw new ErrorResponse(`category with id ${categoryId} not found`, 404);

  const { iconId, iconUrl } = categoryIcon;
  const affctedRows = await deleteCategory(categoryId);

  if (affctedRows && iconId && iconUrl) {
    await deleteMedia(iconId);
    deleteLocalFile(iconUrl);
  }
};

export const postMediaData: (data: PostMediaBody) => Promise<void> = async function postMediData({
  image,
}) {
  const img = image[0];

  await createMedia(img.filename);
  await saveFile(img);
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
  const media = await getMediaUrl(mediaId);

  if (!media) throw new ErrorResponse(`media with id ${mediaId} not found`, 404);

  const img = image[0];

  await updateMedia(mediaId, img.filename);
  await Promise.all([saveFile(img), deleteLocalFile(media.url)]);
};

export const deleteMediaData: (mediaId: number) => Promise<void> = async function deleteMediaData(
  mediaId,
) {
  const media = await getMediaUrl(mediaId);

  if (!media) throw new ErrorResponse(`media with id ${mediaId} not found`, 404);

  const affectedRows = await deleteMedia(mediaId);

  if (affectedRows > 0) deleteLocalFile(media.url);
};

export const postWalletData: (
  data: PostWalletBody,
) => Promise<void> = async function postWalletData({ logo, ...data }) {
  if (logo) {
    const img = logo[0];
    const { id } = await createMedia(img.filename);

    await createWallet({ ...data, logoId: id });
    await saveFile(img);
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
  const [affectedRows] = await updateWallet(walletId, data);

  if (affectedRows < 0) throw new ErrorResponse(`wallet with id ${walletId} not found`, 404);
};

export const changeWalletLogo: (
  walletId: number,
  data: UpdateWalletLogoBody,
) => Promise<void> = async function changeWalletLogo(walletId, { logo }) {
  const walletLogo = await getWalletLogo(walletId);

  if (!walletLogo) throw new ErrorResponse(`wallet with id ${walletId} not found`, 404);

  const { logoId, logoUrl } = walletLogo;
  const img = logo[0];
  const { filename } = img;

  if (logoId && logoUrl) {
    await updateMedia(logoId, filename);
    await Promise.all([saveFile(img), deleteLocalFile(logoUrl)]);
  } else {
    const { id } = await createMedia(filename);

    await updateWallet(walletId, { logoId: id });
    await saveFile(img);
  }
};

export const deleteWalletData: (
  walletId: number,
) => Promise<void> = async function deleteWalletData(walletId) {
  const walletLogo = await getWalletLogo(walletId);

  if (!walletLogo) throw new ErrorResponse(`wallet with id ${walletId} not found`, 404);

  const { logoId, logoUrl } = walletLogo;
  const affectedRows = await deleteWallet(walletId);

  if (affectedRows > 0 && logoId && logoUrl) {
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
  const [affectedRows] = await updateFaq(faqId, data);

  if (affectedRows < 1) throw new ErrorResponse(`faq with id ${faqId} not found`, 404);
};

export const deleteFaqData: (faqId: number) => Promise<void> = async function deleteFaqData(faqId) {
  const affectedRows = await deleteFaq(faqId);

  if (affectedRows < 1) throw new ErrorResponse(`faq with id ${faqId} not found`, 404);
};
