/**
 * NOTE: How to Write Request to API Route function
 *
 * All routes that require `body` from the user, request function have `payload` in param
 *
 * If a route need payload from the user, the `payload` param is an object with a property that accepted
 * by the route `body` with all child properties is optional
 *
 * If the payload needed file payload, then the `payload` contains optional properties
 * `fields` and `files` (`fields` is object contain non-file property
 * accepted by the route, and `files` is an array of object with property file field name and file dir).
 *
 * If a route only need file payload, then the `payload` contain only optional `files` property
 *
 */

import type { Server } from 'http';
import type {
  RegisterBody,
  ActivateMerchantBody,
  LoginBody,
  UpdateProfileBody,
  ForgotPasswordBody,
  ResetPasswordBody,
  PostBankBody,
  UpdateBankBody,
  UpdateBankDetailBody,
  PostBankStepBody,
  PostCategoryBody,
  UpdateCategoryBody,
  PostWalletBody,
  UpdateWalletBody,
  PostFaqBody,
  UpdateFaqBody,
  UpdateMerchantProfileBody,
  UpdateMerchantClosetimeBody,
  PostProductBody,
  UpdateProductBody,
  UpdateProductStatusBody,
  BindProductCategoryBody,
  UpdateOrderStatusBody,
  AddToCartBody,
  UpdateCartItemQtyBody,
  ReviewProductBody,
  PostBankUserBody,
  UpdateBankUserBody,
  TopUpBody,
  WithdrawBody,
  UpdateTopUpStatusBody,
  UpdateWithdrawStatusBody,
} from '../../src/api/types/schema';
import supertest, { Test } from 'supertest';
import { issueJwt } from '../../src/api/utils/jwt';
import {
  createForgotPassword,
  createMedias,
  createMerchant,
  createMedia as createUserMedia,
  updateUser,
  getUser,
} from '../../src/api/repositories/UserRepository';
import {
  createBank,
  createBankStep,
  createCategory,
  createMedia as createMasterMedia,
  createWallet,
  createFaq,
} from '../../src/api/repositories/MasterRepository';
import {
  createProduct,
  createProductUtility,
  createMedia,
  createProductCategory,
  createProductPhoto,
} from '../../src/api/repositories/MerchantRepository';
import { createBankUser } from '../../src/api/repositories/BankRepository';
import {
  createUserTopUp,
  createUserWithdraw,
  updateUserWallet,
  getUserWallets,
} from '../../src/api/repositories/WalletRepository';
import {
  addCartItem,
  createUserTransaction,
  createTransactionProducts,
} from '../../src/api/repositories/CartRepository';
import {
  createProductReview,
  updateUserTransaction,
} from '../../src/api/repositories/TransactionRepository';
import {
  userRegistration,
  userLogin,
  makeUserAdmin,
  resetUserPassword,
  verifyUserToken,
} from '../../src/api/routes/account/service';

export { default as sequelize } from '../../src/databases/sequelize';
export {
  userRegistration,
  userLogin,
  resetUserPassword,
  verifyUserToken,
  createUserMedia,
  createBank,
  createBankStep,
  createCategory,
  createMasterMedia,
  createWallet,
  createFaq,
  createProductCategory,
  updateUser,
  getUser,
};

type FilesType = { field?: string; fileDir?: string }[];

type SupertestReqType = {
  server: Server;
  type: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  url: string;
  payload?:
    | { obj?: Record<string, unknown> }
    | { fields?: Record<string, string | number>; files?: FilesType };
  token?: string;
};

export const fileDir = './__test__/image-test.png';

export const registerPayload = function registerPayload() {
  /**
   * REF: Generate random string/characters in JavaScript
   * https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
   *
   * REF: How to Generate Random numbers in Javascript based on the provided range Minimum and Maximum characters
   * https://stackoverflow.com/questions/62468165/how-to-generate-random-numbers-in-javascript-based-on-the-provided-range-minimum
   */
  return {
    full_name: 'Name',
    username: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(7),
    password: 'password',
    phone_number: Array.from(
      { length: 0 | (Math.random() * (14 - 10 + 1) + 10) },
      () => 0 | (Math.random() * 9),
    ).join(''),
    address: 'address',
  };
};

export const registerMerchPayload = function registerMerchPaylod() {
  return {
    fields: {
      no_identity: Date.now().toString(),
      market_name: 'Market Name',
      market_address: 'Market Address',
      market_lat: 3.4123213,
      market_lon: -4.321321312,
      market_close_time: '21:00',
    },
    files: [
      { fileDir, field: 'identity_photo' },
      { fileDir, field: 'market_photo' },
    ],
  };
};

export const updateProfilePayload = function updateProfilePayload() {
  return {
    fields: {
      full_name: 'New Full Name',
      address: 'New Address',
      phone_number: Date.now().toString(),
      password: 'password',
    },
    files: [{ fileDir, field: 'avatar' }],
  };
};

const supertestReq = function supertestReq({
  server,
  type,
  url,
  payload,
  token,
}: SupertestReqType) {
  const init = supertest(server);
  const newUrl = `/api/v1${url}`;
  let req: Test;

  switch (type) {
    case 'POST':
      req = init.post(newUrl);
      break;
    case 'PATCH':
      req = init.patch(newUrl);
      break;
    case 'DELETE':
      req = init.delete(newUrl);
      break;
    case 'PUT':
      req = init.put(newUrl);
      break;
    default:
      req = init.get(newUrl);
  }

  if (token) req.set('authorization', `Bearer ${token}`);

  if (payload) {
    if ('obj' in payload) {
      req.set('Content-Type', 'application/json');
      req.send(payload.obj);
    }

    if ('fields' in payload) {
      const { fields } = payload;

      if (fields) {
        Object.entries(fields).forEach(([key, value]) => {
          if (Object.prototype.hasOwnProperty.call(fields, key)) req.field(key, value);
        });
      }
    }

    if ('files' in payload) {
      const { files } = payload;
      if (files)
        files.forEach(({ field, fileDir }) => {
          req.attach(field, fileDir);
        });
    }
  }

  return req;
};

export const register = function register(server: Server, payload: Partial<RegisterBody>) {
  return supertestReq({
    server,
    type: 'POST',
    url: '/account/register',
    payload: { obj: payload },
  });
};

export const registerMerchant = function registerMerchant(
  server: Server,
  payload: {
    fields?: Partial<Omit<ActivateMerchantBody, 'identity_photo' | 'market_photo'>>;
    files?: FilesType;
  },
  token?: string,
) {
  const { fields, files } = payload;

  return supertestReq({
    server,
    token,
    type: 'POST',
    url: '/account/merchant',
    payload: { fields, files },
  });
};

export const login = function login(server: Server, payload: Partial<LoginBody>) {
  return supertestReq({
    server,
    type: 'POST',
    url: '/account/login',
    payload: { obj: payload },
  });
};

export const getProfile = function getProfile(server: Server, token?: string) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: '/account/me',
  });
};

export const updateProfile = function updateProfile(
  server: Server,
  payload: {
    fields?: Omit<UpdateProfileBody, 'avatar'>;
    files?: FilesType;
  },
  token?: string,
) {
  const { fields, files } = payload;

  return supertestReq({
    server,
    token,
    type: 'PATCH',
    url: '/account/update-profile',
    payload: { fields, files },
  });
};

export const forgotPassword = function forgotPassword(
  server: Server,
  payload: Partial<ForgotPasswordBody>,
) {
  return supertestReq({
    server,
    type: 'POST',
    url: '/account/forgot-password',
    payload: { obj: payload },
  });
};

export const verifyForgotToken = function verifyForgotToken(server: Server, token?: string) {
  return supertestReq({
    server,
    type: 'PATCH',
    url: `/account/verify-token/${token ? token : ''}`,
  });
};

export const resetPassword = function forgotPassword(
  server: Server,
  payload: Partial<ResetPasswordBody>,
) {
  return supertestReq({
    server,
    type: 'PATCH',
    url: '/account/reset-password',
    payload: { obj: payload },
  });
};

export const postMasterBank = function postMasterBank(
  server: Server,
  payload: {
    fields?: Partial<Omit<PostBankBody, 'logo'>>;
    files?: FilesType;
  },
  token?: string,
) {
  const { fields, files } = payload;

  return supertestReq({
    server,
    token,
    type: 'POST',
    url: '/masters/banks',
    payload: { fields, files },
  });
};

export const getMasterBanks = function getMasterBanks(
  server: Server,
  query: string,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: `/masters/banks${query}`,
  });
};

export const postMasterBankStep = function postMasterBankStep(
  server: Server,
  bankId: number,
  payload: Partial<PostBankStepBody> = { step: 'step' },
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'POST',
    url: `/masters/banks/${bankId}/steps`,
    payload: {
      obj: payload,
    },
  });
};

export const getMasterBankDetail = function getMasterBankDetail(
  server: Server,
  bankId: number,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: `/masters/banks/${bankId}`,
  });
};

export const updateMasterBank = function updateMasterBank(
  server: Server,
  bankId: number,
  payload: UpdateBankBody,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'PATCH',
    url: `/masters/banks/${bankId}`,
    payload: {
      obj: payload,
    },
  });
};

export const updateMasterBankDetail = function updateMasterBankDetail(
  server: Server,
  bankId: number,
  payload: Partial<UpdateBankDetailBody>,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'PATCH',
    url: `/masters/banks/${bankId}/account`,
    payload: {
      obj: payload,
    },
  });
};

export const changeMasterBankLogo = function changeMasterBankLogo(
  server: Server,
  bankId: number,
  payload: {
    files?: FilesType;
  },
  token?: string,
) {
  const { files } = payload;

  return supertestReq({
    server,
    token,
    type: 'PATCH',
    url: `/masters/banks/${bankId}/logo`,
    payload: {
      files,
    },
  });
};

export const deleteMasterBankStep = function deleteMasterBankStep(
  server: Server,
  bankId: number,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'DELETE',
    url: `/masters/banks/steps/${bankId}`,
  });
};

export const deleteMasterBank = function deleteMasterBank(
  server: Server,
  bankId: number,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'DELETE',
    url: `/masters/banks/${bankId}`,
  });
};

export const postCategory = function postCategory(
  server: Server,
  payload: {
    fields?: Partial<Omit<PostCategoryBody, 'icon'>>;
    files?: FilesType;
  },
  token?: string,
) {
  const { fields, files } = payload;

  return supertestReq({
    server,
    token,
    type: 'POST',
    url: '/masters/categories',
    payload: { fields, files },
  });
};

export const getCategories = function getCategories(server: Server, query: string, token?: string) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: `/masters/categories${query}`,
  });
};

export const updateCategory = function updateCategory(
  server: Server,
  categoryId: number,
  payload: UpdateCategoryBody,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'PATCH',
    url: `/masters/categories/${categoryId}`,
    payload: {
      obj: payload,
    },
  });
};

export const changeCategoryIcon = function changeCategoryIcon(
  server: Server,
  categoryId: number,
  payload: {
    files?: FilesType;
  },
  token?: string,
) {
  const { files } = payload;

  return supertestReq({
    server,
    token,
    type: 'PATCH',
    url: `/masters/categories/${categoryId}/icon`,
    payload: {
      files,
    },
  });
};

export const deleteCategory = function deleteCategory(
  server: Server,
  categoryId: number,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'DELETE',
    url: `/masters/categories/${categoryId}`,
  });
};

export const postMedia = function postMedia(
  server: Server,
  payload: {
    files?: FilesType;
  },
  token?: string,
) {
  const { files } = payload;

  return supertestReq({
    server,
    token,
    type: 'POST',
    url: '/masters/medias',
    payload: { files },
  });
};

export const getMedias = function getMedias(server: Server, query: string, token?: string) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: `/masters/medias${query}`,
  });
};

export const updateMedia = function updateMedia(
  server: Server,
  mediaId: number,
  payload: {
    files?: FilesType;
  },
  token?: string,
) {
  const { files } = payload;

  return supertestReq({
    server,
    token,
    type: 'PATCH',
    url: `/masters/medias/${mediaId}`,
    payload: { files },
  });
};

export const deleteMedia = function deleteMedia(server: Server, mediaId: number, token?: string) {
  return supertestReq({
    server,
    token,
    type: 'DELETE',
    url: `/masters/medias/${mediaId}`,
  });
};

export const postMasterWallet = function postMasterWallet(
  server: Server,
  payload: {
    fields?: Partial<Omit<PostWalletBody, 'logo'>>;
    files?: FilesType;
  },
  token?: string,
) {
  const { fields, files } = payload;

  return supertestReq({
    server,
    token,
    type: 'POST',
    url: '/masters/wallets',
    payload: { fields, files },
  });
};

export const getMasterWallets = function getMasterWallets(
  server: Server,
  query: string,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: `/masters/wallets${query}`,
  });
};

export const updateMasterWallet = function updateMasterWallet(
  server: Server,
  walletId: number,
  payload: UpdateWalletBody,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'PATCH',
    url: `/masters/wallets/${walletId}`,
    payload: {
      obj: payload,
    },
  });
};

export const changeMasterWalletLogo = function changeMasterWalletLogo(
  server: Server,
  walletId: number,
  payload: {
    files?: FilesType;
  },
  token?: string,
) {
  const { files } = payload;

  return supertestReq({
    server,
    token,
    type: 'PATCH',
    url: `/masters/wallets/${walletId}/logo`,
    payload: { files },
  });
};

export const deleteMasterWallet = function deleteMasterWallet(
  server: Server,
  walletId: number,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'DELETE',
    url: `/masters/wallets/${walletId}`,
  });
};

export const postFaq = function postFaq(
  server: Server,
  payload: Partial<PostFaqBody>,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'POST',
    url: '/masters/faqs',
    payload: { obj: payload },
  });
};

export const getFaqs = function getFaqs(server: Server) {
  return supertestReq({
    server,
    type: 'GET',
    url: '/masters/faqs',
  });
};

export const updateFaq = function updateFaq(
  server: Server,
  faqId: number,
  payload: UpdateFaqBody,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'PATCH',
    url: `/masters/faqs/${faqId}`,
    payload: { obj: payload },
  });
};

export const deleteFaq = function deleteFaq(server: Server, faqId: number, token?: string) {
  return supertestReq({
    server,
    token,
    type: 'DELETE',
    url: `/masters/faqs/${faqId}`,
  });
};

export const updateMerchantProfile = function updateMerchantProfile(
  server: Server,
  payload: {
    fields?: Partial<Omit<UpdateMerchantProfileBody, 'identity_photo' | 'market_photo'>>;
    files?: FilesType;
  },
  token?: string,
) {
  const { fields, files } = payload;

  return supertestReq({
    server,
    token,
    type: 'PATCH',
    url: '/merchants',
    payload: { fields, files },
  });
};

export const updateMerchantClosetime = function updateMerchantClosetime(
  server: Server,
  payload: Partial<UpdateMerchantClosetimeBody>,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'PATCH',
    url: '/merchants/operation-time',
    payload: { obj: payload },
  });
};

export const getMerchantProfile = function getMerchantProfile(server: Server, token?: string) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: '/merchants',
  });
};

export const postMerchantProduct = function postMerchantProduct(
  server: Server,
  payload: {
    fields?: Partial<Omit<PostProductBody, 'cover'>>;
    files?: FilesType;
  },
  token?: string,
) {
  const { fields, files } = payload;

  return supertestReq({
    server,
    token,
    type: 'POST',
    url: '/merchants/products',
    payload: { fields, files },
  });
};

export const getMerchantProducts = function getMerchantProducts(
  server: Server,
  query: string,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: `/merchants/products${query}`,
  });
};

export const updateMerchantProduct = function updateMerchantProduct(
  server: Server,
  productId: number,
  payload: UpdateProductBody,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'PATCH',
    url: `/merchants/products/${productId}`,
    payload: {
      obj: payload,
    },
  });
};

export const updateMerchantProductCover = function updateMerchantProductCover(
  server: Server,
  productId: number,
  payload: {
    files?: FilesType;
  },
  token?: string,
) {
  const { files } = payload;

  return supertestReq({
    server,
    token,
    type: 'PATCH',
    url: `/merchants/products/${productId}/cover`,
    payload: {
      files,
    },
  });
};

export const updateMerchantProductStatus = function updateMerchantProductStatus(
  server: Server,
  productId: number,
  payload: Partial<UpdateProductStatusBody>,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'PATCH',
    url: `/merchants/products/${productId}/status`,
    payload: {
      obj: payload,
    },
  });
};

export const bindMerchantProductCategory = function bindMerchantProductCategory(
  server: Server,
  productId: number,
  payload: Partial<BindProductCategoryBody>,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'PATCH',
    url: `/merchants/products/${productId}/category`,
    payload: {
      obj: payload,
    },
  });
};

export const getMerchantProductDetail = function getMerchantProductDetail(
  server: Server,
  productId: number,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: `/merchants/products/${productId}`,
  });
};

export const postMerchantProductImage = function postMerchantProductImage(
  server: Server,
  productId: number,
  payload: {
    files?: FilesType;
  },
  token?: string,
) {
  const { files } = payload;

  return supertestReq({
    server,
    token,
    type: 'POST',
    url: `/merchants/products/${productId}/image`,
    payload: {
      files,
    },
  });
};

export const deleteMerchantProductCategory = function deleteMerchantProductCategory(
  server: Server,
  categoryId: number,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'DELETE',
    url: `/merchants/products/category/${categoryId}`,
  });
};

export const deleteMerchantProductImage = function deleteMerchantProductImage(
  server: Server,
  imageId: number,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'DELETE',
    url: `/merchants/products/image/${imageId}`,
  });
};

export const deleteMerchantProduct = function deleteMerchantProduc(
  server: Server,
  productId: number,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'DELETE',
    url: `/merchants/products/${productId}`,
  });
};

export const getMerchantOrders = function getMerchantOrders(
  server: Server,
  query: string,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: `/merchants/orders${query}`,
  });
};

export const getMerchantOrderDetail = function getMerchantOrderDetail(
  server: Server,
  orderId: number,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: `/merchants/orders/${orderId}`,
  });
};

export const updateMerchantOrderStatus = function updateMerchantOrderStatus(
  server: Server,
  orderId: number,
  payload: Partial<UpdateOrderStatusBody>,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'PATCH',
    url: `/merchants/orders/${orderId}`,
    payload: {
      obj: payload,
    },
  });
};

export const getMerchantList = function getMerchantList(server: Server, query: string) {
  return supertestReq({
    server,
    type: 'GET',
    url: `/merchants/list${query}`,
  });
};

export const getMerchantProductList = function getMerchantProductList(
  server: Server,
  merchantId: number,
) {
  return supertestReq({
    server,
    type: 'GET',
    url: `/merchants/list/${merchantId}`,
  });
};

export const getRandomMerchant = function getRandomMerchant(server: Server, query: string) {
  return supertestReq({
    server,
    type: 'GET',
    url: `/merchants/random${query}`,
  });
};

export const getMerchantTransactionHistories = function getMerchantTransactionHistories(
  server: Server,
  query: string,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: `/merchants/transactions${query}`,
  });
};

export const getMerchantIncomeHistories = function getMerchantIncomeHistories(
  server: Server,
  query: string,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: `/merchants/incomes${query}`,
  });
};

export const getProducts = function getProducts(server: Server, query: string) {
  return supertestReq({
    server,
    type: 'GET',
    url: `/products${query}`,
  });
};

export const getProductsByCategory = function getProductsByCategory(
  server: Server,
  categoryId: number,
  query: string,
) {
  return supertestReq({
    server,
    type: 'GET',
    url: `/products/categories/${categoryId}${query}`,
  });
};

export const getBanks = function getBanks(server: Server, token?: string) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: '/banks',
  });
};

export const getBankDetail = function getBankDetail(
  server: Server,
  bankId: number,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: `/banks/${bankId}`,
  });
};

export const postBankUser = function postBankUser(
  server: Server,
  payload: Partial<PostBankUserBody>,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'POST',
    url: '/banks/users',
    payload: {
      obj: payload,
    },
  });
};

export const getBankUsers = function getBankUsers(server: Server, token?: string) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: '/banks/users',
  });
};

export const updateBankUser = function updateBankUser(
  server: Server,
  userBankId: number,
  payload: Partial<UpdateBankUserBody>,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'PATCH',
    url: `/banks/users/${userBankId}`,
    payload: {
      obj: payload,
    },
  });
};

export const deleteBankUser = function deleteBankUser(
  server: Server,
  userBankId: number,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'DELETE',
    url: `/banks/users/${userBankId}`,
  });
};

export const getWallets = function getWallets(server: Server, token?: string) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: '/wallets',
  });
};

export const topUp = function topUp(server: Server, payload: Partial<TopUpBody>, token?: string) {
  return supertestReq({
    server,
    token,
    type: 'POST',
    url: `/wallets/topup`,
    payload: {
      obj: payload,
    },
  });
};

export const getTopUpHistories = function getTopUpHistories(
  server: Server,
  query: string,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: `/wallets/topup/histories${query}`,
  });
};

export const getTopUpDetail = function getTopUpDetail(
  server: Server,
  topUpId: number,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: `/wallets/topup/${topUpId}`,
  });
};

export const getAllUserTopUp = function getAllUserTopUp(
  server: Server,
  query: string,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: `/wallets/topup/users/all${query}`,
  });
};

export const uploadTopUpProof = function uploadTopUpProof(
  server: Server,
  topUpId: number,
  payload: {
    files?: FilesType;
  },
  token?: string,
) {
  const { files } = payload;

  return supertestReq({
    server,
    token,
    type: 'POST',
    url: `/wallets/topup/${topUpId}/image`,
    payload: { files },
  });
};

export const updateTopUpStatus = function updateTopUpStatus(
  server: Server,
  topUpId: number,
  payload: Partial<UpdateTopUpStatusBody>,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'PATCH',
    url: `/wallets/topup/${topUpId}/status`,
    payload: { obj: payload },
  });
};

export const withdraw = function withdraw(
  server: Server,
  payload: Partial<WithdrawBody>,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'POST',
    url: `/wallets/withdraw`,
    payload: {
      obj: payload,
    },
  });
};

export const getWithdrawHistories = function getWithdrawHistories(
  server: Server,
  query: string,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: `/wallets/withdraw/histories${query}`,
  });
};

export const getWithdrawDetail = function getWithdrawDetail(
  server: Server,
  withdrawId: number,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: `/wallets/withdraw/${withdrawId}`,
  });
};

export const getAllUserWithdraw = function getAllUserWithdraw(
  server: Server,
  query: string,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: `/wallets/withdraw/users/all${query}`,
  });
};

export const updateWithdrawStatus = function updateWithdrawStatus(
  server: Server,
  withdrawId: number,
  payload: Partial<UpdateWithdrawStatusBody>,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'PATCH',
    url: `/wallets/withdraw/${withdrawId}/status`,
    payload: { obj: payload },
  });
};

export const addItemToCart = function addItemToCart(
  server: Server,
  payload: Partial<AddToCartBody>,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'POST',
    url: '/carts',
    payload: {
      obj: payload,
    },
  });
};

export const getCartItems = function getCartItems(server: Server, token?: string) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: '/carts',
  });
};

export const updateCartItemQty = function updateCartItemQty(
  server: Server,
  cartItemId: number,
  payload: Partial<UpdateCartItemQtyBody>,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'PATCH',
    url: `/carts/${cartItemId}`,
    payload: {
      obj: payload,
    },
  });
};

export const deleteCartItem = function deleteCartItem(
  server: Server,
  cartItemId: number,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'DELETE',
    url: `/carts/${cartItemId}`,
  });
};

export const checkout = function checkout(server: Server, token?: string) {
  return supertestReq({
    server,
    token,
    type: 'PATCH',
    url: '/carts/checkout',
  });
};

export const getUserTransactions = function getUserTransactions(
  server: Server,
  query: string,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: `/transactions${query}`,
  });
};

export const getUserTransactionDetail = function getUserTransactionDetail(
  server: Server,
  transactionId: number,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: `/transactions/${transactionId}`,
  });
};

export const finishTransaction = function finishTransaction(
  server: Server,
  transactionId: number,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'PATCH',
    url: `/transactions/${transactionId}`,
  });
};

export const reviewProduct = function reviewProduct(
  server: Server,
  transactionProductId: number,
  payload: Partial<ReviewProductBody>,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'POST',
    url: `/transactions/${transactionProductId}`,
    payload: {
      obj: payload,
    },
  });
};

export const getReviewedProducts = function getReviewedProducts(
  server: Server,
  query: string,
  token?: string,
) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: `/transactions/reviewed${query}`,
  });
};

export const registration = async function registration() {
  const regPayload = registerPayload();
  const { username, password, phone_number } = regPayload;
  const { token } = await userRegistration(regPayload);

  return { username, password, phone_number, token };
};

export const registerThenLogin = async function registerThenLogin() {
  const { username, password, phone_number } = await registration();
  const { token } = await userLogin({ username, password });

  return { username, phone_number, token };
};

export const createUser = async function createUser() {
  const { username, phone_number, token } = await registration();
  const { id: userId, utilId } = await getUser('USERNAME', username);

  return { userId, utilId, username, phone_number, token };
};

export const registerThenForgotPass = async function registerThenForgotPass() {
  const { utilId, username, phone_number } = await createUser();
  const { verification_token } = await createForgotPassword({
    utilId,
    phone: phone_number,
  });

  return { username, verification_token };
};

export const createAdminUser = async function createAdminUser() {
  const { username } = await registration();
  const { id, utilId } = await getUser('USERNAME', username);
  const token = await makeUserAdmin(id, utilId);

  return { token };
};

export const createMerchantUser = async function createMerchantUser() {
  const { username, password } = await registration();
  const { id, utilId } = await getUser('USERNAME', username);
  const [identityPhoto, marketPhoto] = await createMedias(['a', 'b']);

  await createMerchant(utilId, {
    ...registerMerchPayload().fields,
    id_identity_photo: identityPhoto.id,
    id_market_photo: marketPhoto.id,
  });

  const newToken = issueJwt(id, utilId, 'MERCHANT');

  return { id, username, password, token: newToken };
};

export const createMerchantProduct = async function createMerchantProduct(userId: number) {
  const { id: productId } = await createProduct(userId, {
    product_name: 'name',
    description: 'description',
  });

  const { id: productUtilId } = await createProductUtility(productId, {
    normal_price: 123,
    selling_price: 123,
    qty: 1,
    discount: 10,
  });

  return { productId, productUtilId };
};

export const addCategory = async function addCategory() {
  const { id } = await createCategory({
    category: 'category',
    description: 'description',
    slug: 'slug',
  });

  return { id };
};

export const bindProductCategory = async function bindProductCategory(userId: number) {
  const [{ id: categoryId }, { productId }] = await Promise.all([
    addCategory(),
    createMerchantProduct(userId),
  ]);

  return { categoryId, productId };
};

export const addProductImage = async function addProductImage(userId: number) {
  const [{ productUtilId }, { id: mediaId }] = await Promise.all([
    createMerchantProduct(userId),
    createMedia('a'),
  ]);
  const { id } = await createProductPhoto(productUtilId, mediaId);

  return { productImageId: id };
};

export const addUserTransaction = async function addUserTransaction(merchantId: number) {
  const { userId } = await createUser();
  const { id: transactionId } = await createUserTransaction({ merchantId, userId, totalPrice: 0 });

  return { userId, transactionId };
};

export const createTransactionProduct = async function createTransactionProduct(
  merchantId: number,
) {
  const { transactionId } = await addUserTransaction(merchantId);
  const { productId } = await createMerchantProduct(merchantId);

  await createTransactionProducts([
    { productId, userTransactionId: transactionId, qty: 1, subTotalPrice: 1 },
  ]);

  return { transactionId };
};

export const createProductWithCategory = async function createProductWithCategory(n: number) {
  const [{ id }, { id: categoryId }] = await Promise.all([createMerchantUser(), addCategory()]);
  const products = await Promise.all([...Array(n)].map(() => createMerchantProduct(id)));

  await Promise.all(products.map(({ productId }) => createProductCategory(productId, categoryId)));

  return { categoryId };
};

export const createMasterBank = async function createMasterBank() {
  const { id } = await createBank({ bank_name: 'bank name' });

  return { id };
};

export const addBankUser = async function addBankUser(userId: number) {
  const { id } = await createMasterBank();
  const { id: userBankId } = await createBankUser(userId, {
    bank_id: id,
    account_name: 'name',
    account_number: '123213',
  });

  return { userBankId };
};

export const createUserGetWallet = async function createUserGetWallet() {
  const { token, userId } = await createUser();
  const wallets = await getUserWallets(userId);

  return { token, userId, walletId: wallets[0].id };
};

export const addUserTopUp = async function addUserTopUp(walletId: number, bankId: number) {
  const { id } = await createUserTopUp(walletId, {
    bank_id: bankId,
    balance_request: 9999999,
    balance_transfer: 9999999,
  });

  return { topUpId: id };
};

export const createUserAddWallet = async function createUserAddWallet() {
  const { token, walletId, userId } = await createUserGetWallet();
  await updateUserWallet(walletId, { balance: 999999999 });

  return { token, userId, walletId };
};

export const addUserWithdraw = async function addUserWithdraw(
  walletId: number,
  userBankId: number,
) {
  const { id } = await createUserWithdraw(walletId, {
    user_bank_id: userBankId,
    balance_request: 999,
  });

  return { withdrawId: id };
};

export const addToCart = async function addToCart(userId: number) {
  const { id: merchantId } = await createMerchantUser();
  const { productId } = await createMerchantProduct(merchantId);
  const { id: cartItemId } = await addCartItem(userId, {
    merchant_id: merchantId,
    product_id: productId,
    qty: 1,
  });

  return { cartItemId, merchantId, productId };
};

export const addToCheckout = async function addToCheckout(userId: number) {
  const { merchantId, productId } = await addToCart(userId);
  const { id: transactionId } = await createUserTransaction({ userId, merchantId, totalPrice: 0 });

  return { transactionId, productId };
};

export const endUserTransaction = async function endUserTransaction(userId: number) {
  const { productId, transactionId } = await addToCheckout(userId);
  const [{ id: transactionProductId }] = await createTransactionProducts([
    { productId, userTransactionId: transactionId, qty: 1, subTotalPrice: 0 },
  ]);

  await updateUserTransaction(transactionId, userId);

  return { transactionProductId };
};

export const makeProductReview = async function makeProductReview(userId: number) {
  const { transactionProductId } = await endUserTransaction(userId);

  await createProductReview(transactionProductId, { rating: 1, review: 'review' });
};
