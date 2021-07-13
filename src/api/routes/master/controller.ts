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
  getBankDetail,
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
  postMediaData,
  getMediaData,
  updateMediaData,
  deleteMediaData,
  postWalletData,
  getWalletData,
  updateWalletData,
  changeWalletLogo,
  deleteWalletData,
  postFaqData,
  getFaqData,
  updateFaqData,
  deleteFaqData,
} from './service';

export const postMasterBank: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: PostBankBody }>
> = async function postMasterBank(req, res): Promise<void> {
  await postBank(req.body);

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
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
    message: 'success',
    data: resData,
  });
};

export const getMasterBankDetail: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function getMasterBankDetail(req, res): Promise<void> {
  const bankId = parseInt(req.params.id, 10) || -1;

  if (bankId <= 0) {
    res.notFound();

    return;
  }

  const resData = await getBankDetail(bankId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const updateMasterBank: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateBankBody }>
> = async function updateMasterBank(req, res): Promise<void> {
  const bankId = parseInt(req.params.id, 10) || -1;

  if (bankId <= 0) {
    res.notFound();

    return;
  }

  await updateBankData(bankId, req.body);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const updateMasterBankAccount: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateBankDetailBody }>
> = async function updateMasterBankDetail(req, res): Promise<void> {
  const bankId = parseInt(req.params.id, 10) || -1;

  if (bankId <= 0) {
    res.notFound();

    return;
  }

  await updateBankDetail(bankId, req.body);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const changeMasterBankLogo: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: ChangeBankLogoBody }>
> = async function changeMasterBankLogo(req, res): Promise<void> {
  const bankId = parseInt(req.params.id, 10) || -1;

  if (bankId <= 0) {
    res.notFound();

    return;
  }

  await changeBankLogo(bankId, req.body);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const postMasterBankStep: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: PostBankStepBody }>
> = async function postMasterBankStep(req, res): Promise<void> {
  const bankId = parseInt(req.params.id, 10) || -1;

  if (bankId <= 0) {
    res.notFound();

    return;
  }

  await postBankStep(bankId, req.body);

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};

export const deleteMasterBankStep: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function deleteMasterBankStep(req, res): Promise<void> {
  const bankStepId = parseInt(req.params.id, 10) || -1;

  if (bankStepId <= 0) {
    res.notFound();

    return;
  }

  await deleteBankStepData(bankStepId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const deleteMasterBank: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function deleteMasterBank(req, res): Promise<void> {
  const bankId = parseInt(req.params.id, 10) || -1;

  if (bankId <= 0) {
    res.notFound();

    return;
  }

  await deleteBankData(bankId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const postCategory: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: PostCategoryBody }>
> = async function postCategory(req, res): Promise<void> {
  await postCategoryData(req.body);

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
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
    message: 'success',
    data: resData,
  });
};

export const updateCategory: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateCategoryBody }>
> = async function updateCategory(req, res): Promise<void> {
  const categoryId = parseInt(req.params.id, 10) || -1;

  if (categoryId <= 0) {
    res.notFound();

    return;
  }

  await updateCategoryData(categoryId, req.body);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const changeCategoryIcon: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: ChangeCategoryIconBody }>
> = async function changeCategoryIcon(req, res): Promise<void> {
  const categoryId = parseInt(req.params.id, 10) || -1;

  if (categoryId <= 0) {
    res.notFound();

    return;
  }

  await updateCategoryIcon(categoryId, req.body);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const deleteCategory: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function deleteCategory(req, res): Promise<void> {
  const categoryId = parseInt(req.params.id, 10) || -1;

  if (categoryId <= 0) {
    res.notFound();

    return;
  }

  await deleteCategoryData(categoryId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const postMedia: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: PostMediaBody }>
> = async function postMedia(req, res): Promise<void> {
  await postMediaData(req.body);

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};

export const getMedias: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>
> = async function getMedias(_, res): Promise<void> {
  const query = this.requestContext.get<CustModelType['SearchQuery']>('query');

  if (!query) {
    res.badRequest();

    return;
  }

  const resData = await getMediaData(query);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const updateMedia: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: PostMediaBody }>
> = async function updateMedia(req, res): Promise<void> {
  const mediaId = parseInt(req.params.id, 10) || -1;

  if (mediaId <= 0) {
    res.notFound();

    return;
  }

  await updateMediaData(mediaId, req.body);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const deleteMedia: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function deleteMedia(req, res): Promise<void> {
  const mediaId = parseInt(req.params.id, 10) || -1;

  if (mediaId <= 0) {
    res.notFound();

    return;
  }

  await deleteMediaData(mediaId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const postMasterWallet: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: PostWalletBody }>
> = async function postMasterWallet(req, res): Promise<void> {
  await postWalletData(req.body);

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};

export const getMasterWallets: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Querystring: GetQuery }>
> = async function getMasterWallets(_, res): Promise<void> {
  const query = this.requestContext.get<CustModelType['SearchQuery']>('query');

  if (!query) {
    res.badRequest();

    return;
  }

  const resData = await getWalletData(query);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const udpateMasterWallet: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateWalletBody }>
> = async function updateMasterWallet(req, res): Promise<void> {
  const walletId = parseInt(req.params.id, 10) || -1;

  if (walletId <= 0) {
    res.notFound();

    return;
  }

  await updateWalletData(walletId, req.body);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const changeMasterWalletLogo: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateWalletLogoBody }>
> = async function changeMasterWalletLogo(req, res): Promise<void> {
  const walletId = parseInt(req.params.id, 10) || -1;

  if (walletId <= 0) {
    res.notFound();

    return;
  }

  await changeWalletLogo(walletId, req.body);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const deleteMasterWallet: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function deleteMasterWallet(req, res): Promise<void> {
  const walletId = parseInt(req.params.id, 10) || -1;

  if (walletId <= 0) {
    res.notFound();

    return;
  }

  await deleteWalletData(walletId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const postFaq: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: PostFaqBody }>
> = async function postFaq(req, res): Promise<void> {
  await postFaqData(req.body);

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};

export const getFaqs: RequestHandler<Request> = async function getFaqs(_, res): Promise<void> {
  const resData = await getFaqData();

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const updateFaq: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateFaqBody }>
> = async function updateFaq(req, res): Promise<void> {
  const faqId = parseInt(req.params.id, 10) || -1;

  if (faqId <= 0) {
    res.notFound();

    return;
  }

  await updateFaqData(faqId, req.body);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const deleteFaq: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function deleteFaq(req, res): Promise<void> {
  const faqId = parseInt(req.params.id, 10) || -1;

  if (faqId <= 0) {
    res.notFound();

    return;
  }

  await deleteFaqData(faqId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};
