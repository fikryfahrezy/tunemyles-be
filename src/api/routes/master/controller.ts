import type { Request, RequestHandler } from '../../types/fasitify';
import type {
  ApiKeyHeader,
  IdRequestParams,
  GetQuery,
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
} from '../../types/schema';

export const postMasterBank: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: PostBankBody }>
> = async function postMasterBank(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};

export const getMasterBanks: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>
> = async function getMasterBanks(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const getMasterBankDetail: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function getMasterBankDetail(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const updateMasterBank: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateBankBody }>
> = async function updateMasterBank(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const updateMasterBankDetail: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateBankDetailBody }>
> = async function updateMasterBankDetail(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const changeMasterBankLogo: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateBankLogoBody }>
> = async function changeMasterBankLogo(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const postMasterBankStep: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: PostBankStepBody }>
> = async function postMasterBankStep(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};

export const deleteMasterBankStep: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function deleteMasterBankStep(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const deleteMasterBank: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function deleteMasterBank(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const postCategory: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: PostCategoryBody }>
> = async function postCategory(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};

export const getCategories: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>
> = async function getCategories(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const updateCategory: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateCategoryBody }>
> = async function updateCategory(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const changeCategoryIcon: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function changeCategoryIcon(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const deleteCategory: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function deleteCategory(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const postMedia: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: PostMediaBody }>
> = async function postMedia(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};

export const getMedias: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>
> = async function getMedias(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const updateMedia: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: PostMediaBody }>
> = async function updateMedia(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const deleteMedia: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function deleteMedia(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const postMasterWallet: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: PostWalletBody }>
> = async function postMasterWallet(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};

export const getMasterWallets: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>
> = async function getMasterWallets(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const udpateMasterWallet: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateWalletBody }>
> = async function updateMasterWallet(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const changeMasterWalletLogo: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateWalletLogoBody }>
> = async function changeMasterWalletLogo(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const deleteMasterWallet: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function deleteMasterWallet(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const postFaq: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: PostFaqBody }>
> = async function postFaq(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};

export const getFaqs: RequestHandler<Request> = async function getFaqs(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const updateFaq: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateFaqBody }>
> = async function updateFaq(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const deleteFaq: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function deleteFaq(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};
