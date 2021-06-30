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
  orderDirection?: string;
  orderBy?: string;
  search?: string;
  page?: string;
  limit?: string;
  status?: string;
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

export type ActivateMerchantBody = {
  identity_photo: AddedFileBody[];
  market_photo: AddedFileBody[];
  no_identity: string;
  market_name: string;
  market_address: string;
  market_lat: number;
  market_lon: number;
  market_close_time: string;
};

export type LoginBody = {
  username: string;
  password: string;
};

export type UpdateProfileBody = Partial<Omit<RegisterBody, 'username'>> & {
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

export type PostBankStepBody = {
  step: string;
};

export type UpdateBankBody = {
  bank_name?: string;
  visibility?: number;
};

export type UpdateBankDetailBody = {
  account_number: string;
  account_name: string;
};

export type ChangeBankLogoBody = {
  logo: AddedFileBody[];
};

export type PostCategoryBody = {
  icon?: AddedFileBody[];
  category: string;
  slug: string;
  description: string;
};

export type UpdateCategoryBody = Partial<Omit<PostCategoryBody, 'icon'>> & {
  visibility?: number;
};

export type ChangeCategoryIconBody = Required<Pick<PostCategoryBody, 'icon'>>;

export type PostMediaBody = {
  image: AddedFileBody[];
};

export type PostWalletBody = {
  logo?: AddedFileBody[];
  wallet_name: string;
  wallet_description: string;
};

export type UpdateWalletBody = Partial<Omit<PostWalletBody, 'logo'>> & {
  visbility?: number;
};

export type UpdateWalletLogoBody = Required<Pick<PostWalletBody, 'logo'>>;

export type PostFaqBody = {
  question: string;
  answer: string;
};

export type UpdateFaqBody = Partial<PostFaqBody>;

export type UpdateMerchantProfileBody = Partial<ActivateMerchantBody>;

export type UpdateMerchantClosetimeBody = {
  close_time: string;
};

export type PostProductBody = {
  cover?: AddedFileBody[];
  product_name: string;
  description: string;
  normal_price: number;
  selling_price: number;
  qty: number;
  discount: number;
  status?: number;
};

export type UpdateProductBody = Partial<Omit<PostProductBody, 'cover'>>;

export type ChangeProductCoverBody = Required<Pick<PostProductBody, 'cover'>>;

export type UpdateProductStatusBody = Required<Pick<PostProductBody, 'status'>>;

export type BindProductCategoryBody = {
  category_id: number;
};

export type PostProductImageBody = {
  image: AddedFileBody[];
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

export type PostBankUserBody = {
  bank_id: number;
  account_number: string;
  account_name: string;
};

export type UpdateBankUserBody = Partial<PostBankBody> & {
  bank_id: number;
};

export type TopUpBody = {
  wallet_id: number;
  balance_request: number;
  balance_transfer: number;
};

export type WithdrawBody = {
  wallet_id: number;
  balance_request: number;
};

export type TopUpProofBody = {
  image: AddedFileBody[];
};

export type UpdateTopUpStatusBody = {
  status: number;
};

export type UpdateWithdrawStatusBody = {
  status: number;
};

export type AddToCartBody = {
  qty: number;
  merchant_id: number;
  product_id: number;
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
