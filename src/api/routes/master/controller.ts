import type CustModelType from '../../types/model';
import type { Request, RequestHandler } from '../../types/fasitify';
import type {
  ApiKeyHeader,
  IdRequestParams,
  GetQuery,
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
import {
  postBank,
  getBankData,
  getSingleBank,
  updateBankData,
  updateBankDetail,
  changeBankLogo,
  postBankStep,
  deleteBankStepData,
  deleteBankData,
  postCategoryData,
  getCategoryData,
  updateCategoryData,
  updateCategoryIcon,
  deleteCategoryData,
} from './service';

export const postMasterBank: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: PostBankBody }>
> = async function postMasterBank(req, res): Promise<void> {
  await postBank(req.body);

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'successfully add bank',
  });
};

export const getMasterBanks: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>
> = async function getMasterBanks(_, res): Promise<void> {
  const query = this.requestContext.get<CustModelType['SearchQuery']>('query');

  if (!query) {
    res.badRequest();
    return;
  }

  const resData = await getBankData(query);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'successfully fetch bank data',
    data: resData,
  });
};

export const getMasterBankDetail: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function getMasterBankDetail(req, res): Promise<void> {
  const bankId = parseInt(req.params.id, 10) || -1;

  if (bankId <= 0) res.notFound();

  const resData = await getSingleBank(bankId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'successfully fetch bank detail',
    data: resData,
  });
};

export const updateMasterBank: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateBankBody }>
> = async function updateMasterBank(req, res): Promise<void> {
  const bankId = parseInt(req.params.id, 10) || -1;

  if (bankId <= 0) res.notFound();

  await updateBankData(bankId, req.body);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'successfully update bank',
  });
};

export const updateMasterBankAccount: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateBankDetailBody }>
> = async function updateMasterBankDetail(req, res): Promise<void> {
  const bankId = parseInt(req.params.id, 10) || -1;

  if (bankId <= 0) res.notFound();

  await updateBankDetail(bankId, req.body);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'successfully update bank account',
  });
};

export const changeMasterBankLogo: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: ChangeBankLogoBody }>
> = async function changeMasterBankLogo(req, res): Promise<void> {
  const bankId = parseInt(req.params.id, 10) || -1;

  if (bankId <= 0) res.notFound();

  await changeBankLogo(bankId, req.body);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'successfully change bank logo',
  });
};

export const postMasterBankStep: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: PostBankStepBody }>
> = async function postMasterBankStep(req, res): Promise<void> {
  const bankId = parseInt(req.params.id, 10) || -1;

  if (bankId <= 0) res.notFound();

  await postBankStep(bankId, req.body);

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'successfully add bank step',
  });
};

export const deleteMasterBankStep: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function deleteMasterBankStep(req, res): Promise<void> {
  const bankStepId = parseInt(req.params.id, 10) || -1;

  if (bankStepId <= 0) res.notFound();

  await deleteBankStepData(bankStepId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'successfully delete bank step',
  });
};

export const deleteMasterBank: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function deleteMasterBank(req, res): Promise<void> {
  const bankId = parseInt(req.params.id, 10) || -1;

  if (bankId <= 0) res.notFound();

  await deleteBankData(bankId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'successfully delete bank',
  });
};

export const postCategory: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: PostCategoryBody }>
> = async function postCategory(req, res): Promise<void> {
  await postCategoryData(req.body);

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'successfully add category',
  });
};

export const getCategories: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>
> = async function getCategories(_, res): Promise<void> {
  const query = this.requestContext.get<CustModelType['SearchQuery']>('query');

  if (!query) {
    res.badRequest();
    return;
  }

  const resData = await getCategoryData(query);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'successfully fetch category data',
    data: resData,
  });
};

export const updateCategory: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateCategoryBody }>
> = async function updateCategory(req, res): Promise<void> {
  const categoryId = parseInt(req.params.id, 10) || -1;

  if (categoryId <= 0) res.notFound();

  await updateCategoryData(categoryId, req.body);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'successfully update category',
  });
};

export const changeCategoryIcon: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: ChangeCategoryIconBody }>
> = async function changeCategoryIcon(req, res): Promise<void> {
  const categoryId = parseInt(req.params.id, 10) || -1;

  if (categoryId <= 0) res.notFound();

  await updateCategoryIcon(categoryId, req.body);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'successfulle change category icon',
  });
};

export const deleteCategory: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function deleteCategory(req, res): Promise<void> {
  const categoryId = parseInt(req.params.id, 10) || -1;

  if (categoryId <= 0) res.notFound();

  await deleteCategoryData(categoryId);

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
    message: 'successfully delete category',
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
