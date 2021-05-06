export type ModelQuery = {
  offset: number;
  limit: number;
  order: [[string, string]];
  availableFields: string[];
};

export type AddedFileBody = {
  data: Iterable<unknown> | AsyncIterable<unknown>;
  encoding: string;
  filename: string;
  limit: boolean;
  mimetype: string;
};

export type ApiKeyHeader = {
  authorization: string;
};

export type GetIdRequestParams = {
  id: string;
};

export type VerifyTokenParams = {
  token: string;
};

export type LoginBody = {
  username: string;
  password: string;
};

export type PostRequestBody = {
  name: string;
};

export type FileRequestBody = {
  file: AddedFileBody[];
};

export type RegisterBody = {
  full_name: string;
  username: string;
  password: string;
  phone_number: string;
  address: string;
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

export type AddBankStepBody = {
  step: string;
};

export type AddBankUserBody = {
  id_m_banks: number;
  account_number: string;
  account_name: string;
};

export type AddFaqBody = {
  question: string;
  answer: string;
};

export type AddToCartBody = {
  qty: number;
  id_merchant: number;
  id_m_products: number;
};
export type BindProductCategoryBody = {
  id_category: number;
};

export type CheckoutBody = {
  price_total: number;
};

export type ReviewTransactionBody = {
  rating: number;
  review: string;
};

export type TopUpBody = {
  id_m_banks: number;
  balance_request: number;
  balance_transfer: number;
};

export type UpdateBankBody = {
  bank_name?: string;
  is_visible?: number;
};

export type UpdateBankDetailBody = {
  account_number: string;
  account_name: string;
};

export type UpdateBankUserBody = {
  id_m_banks?: number;
  account_number?: string;
  account_name?: string;
};

export type UpdateCategoryBody = {
  category?: string;
  slug?: string;
  description?: string;
  is_visible?: number;
};

export type UpdateFaqBody = {
  question?: string;
  answer?: string;
};

export type UpdateMerchantOperation = {
  market_close_time?: string;
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

export type UpdateProductOrderStatusBody = {
  status?: number;
};

export type UpdateProductQtyBody = {
  qty: number;
};

export type UpdateProductStatusBody = {
  is_visible?: number;
};

export type UpdateTopUpStatusBody = {
  status?: number;
};

export type UpdateWalletBody = {
  wallet_name?: string;
  wallet_description?: string;
  is_visible?: number;
};

export type UpdateWithdrawStatusBody = {
  status?: number;
};

export type WithdrawBody = {
  id_u_user_bank_account: number;
  balance_request: number;
};

export type UserUtility = {
  id: number;
  id_m_user: number;
  api_token: string;
  type: number;
  type_before_banned: number;
  created_at: string;
  updated_at: string;
};
