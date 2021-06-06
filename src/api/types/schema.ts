export type AddedFileBody = {
  data?: Iterable<unknown> | AsyncIterable<unknown>;
  encoding: string;
  filename: string;
  limit: boolean;
  mimetype: string;
};

export type PostRequestBody = {
  name: string;
};

export type FileRequestBody = {
  file: AddedFileBody[];
};

export type GetQuery = {
  page?: string;
  orderBy?: string;
  orderDirection?: string;
  limit?: string;
};

export type ApiKeyHeader = {
  authorization: string;
};

export type IdRequestParams = {
  id: string;
};

export type VerifyTokenParams = {
  token: string;
};

/**
 * The order of the types is following the order of the routes in Postman
 */
export type RegisterBody = {
  full_name: string;
  username: string;
  password: string;
  phone_number: string;
  address: string;
};

export type LoginBody = {
  username: string;
  password: string;
};

export type UpdateProfileBody = {
  full_name?: string;
  address?: string;
  phone_number?: string;
  password?: string;
  avatar?: AddedFileBody[];
};

export type ForgotPasswordBody = {
  phone_number: string;
};

export type ResetPasswordBody = {
  token: string;
  new_password: string;
};

export type PostBankBody = {
  logo?: AddedFileBody[];
  bank_name: string;
};

export type UpdateBankBody = {
  bank_name?: string;
  status?: number;
};

export type UpdateBankLogoBody = {
  logo: AddedFileBody[];
};

export type UpdateBankDetailBody = {
  account_number: string;
  account_name: string;
};

export type PostBankStepBody = {
  step: string;
};

export type PostCategoryBody = {
  icon?: AddedFileBody[];
  category: string;
  slug: string;
  description: string;
};

export type UpdateCategoryBody = {
  category?: string;
  slug?: string;
  description?: string;
  visibility?: number;
};

export type PostMediaBody = {
  image: AddedFileBody[];
};

export type PostWalletBody = {
  logo?: AddedFileBody[];
  wallet_name: string;
  wallet_description: string;
};

export type UpdateWalletBody = {
  wallet_name?: string;
  wallet_description?: string;
  visbility?: number;
};

export type UpdateWalletLogoBody = {
  logo: AddedFileBody[];
};

export type PostFaqBody = {
  question: string;
  answer: string;
};

export type UpdateFaqBody = {
  question?: string;
  answer?: string;
};

export type ActivateMerchantBody = {
  no_identity: string;
  identity_photo: AddedFileBody[];
  market_photo: AddedFileBody[];
  market_name: string;
  market_address: string;
  market_lat: number;
  market_lon: number;
  market_close_time: string;
};

export type UpdateMerchantProfileBody = {
  market_photo?: AddedFileBody[];
  no_identity?: string;
  market_name?: string;
  market_address?: number;
  market_lat?: number;
  market_lon?: number;
};

export type UpdateMerchantClosetimeBody = {
  close_time: string;
};

export type PostProductBody = {
  product_name: string;
  description: string;
  cover?: AddedFileBody[];
  price_default: number;
  price_selling: number;
  qty: number;
  discount: number;
  is_visible?: number;
};

export type UpdateProductBody = {
  product_name?: string;
  description?: string;
  price_default?: number;
  price_selling?: number;
  qty?: number;
  discount?: number;
  is_visible?: number;
};

export type UpdateProductCoverBody = {
  cover: AddedFileBody[];
};

export type UpdateProductStatusBody = {
  status: number;
};

export type BindProductCategoryBody = {
  category_id: number;
};

export type PostProductImageBody = {
  image: AddedFileBody[];
};

export type DeleteProductCategoryParams = {
  productId: string;
  categoryId: string;
};

export type UpdateOrderStatusBody = {
  status: number;
};

export type GetRandomMerchantsQuery = {
  limit: string;
};

export type GetMerchantTransactionHistoriesQuery = {
  date: string;
};

export type GetMerchantIncomeHistoriesQuery = {
  year: string;
};

export type AddToCartBody = {
  qty: number;
  id_merchant: number;
  id_m_products: number;
};

export type UpdateCartItemQtyBody = {
  qty: number;
};

export type CheckoutBody = {
  price_total: number;
};

export type ReviewTransactionBody = {
  rating: number;
  review: string;
};

export type PostBankUserBody = {
  bank_id: number;
  account_number: string;
  account_name: string;
};

export type UpdateBankUserBody = {
  bank_id: number;
  account_number?: string;
  account_name?: string;
};

export type TopUpBody = {
  bank_id: number;
  balance_request: number;
  balance_transfer: number;
};

export type WithdrawBody = {
  user_bank_id: number;
  balance_request: number;
};

export type UpdateTopUpStatusBody = {
  status: number;
};

export type UpdateWithdrawStatusBody = {
  status: number;
};
