import type CustModelType from '../../types/model';
import type {
  UpdateMerchantProfileBody,
  UpdateMerchantClosetimeBody,
  PostProductBody,
  UpdateProductBody,
  ChangeProductCoverBody,
  UpdateProductStatusBody,
  BindProductCategoryBody,
  PostProductImageBody,
  UpdateOrderStatusBody,
} from '../../types/schema';
import { ErrorResponse } from '../../utils/error-handler';
import {
  saveFile,
  saveFiles,
  deleteLocalFile,
  deleteLocalFiles,
} from '../../utils/file-management';
import {
  createMedia,
  createProduct,
  createProductUtility,
  createProductPhoto,
  createProductCategory,
  updateMerchant,
  updateMedia,
  updateProduct,
  updateProductUtility,
  updateTransactionProduct,
  updateUserWallet,
  deleteProductCategory,
  deleteProductImage,
  getMerchant,
  getProducts,
  getProductCover,
  getProduct,
  getProductImagesByProductId,
  getProductCategoriesByProductId,
  getCategory,
  getProductCategory,
  getProductImage,
  getMerchantOrders,
  getMerchantProductsOrder,
  getMerchantProductOrder,
  getUserWalletBalance,
  getMerchants,
  getRandomMerchants,
  getMerchantTransactions,
  countProductImagesByProductId,
} from '../../repositories/MerchantRepository';

export const merhantProfile: (
  userId: CustModelType['UserToken']['userId'],
) => Promise<unknown> = async function merchantProfile(userId) {
  const merchant = await getMerchant(userId);

  if (!merchant) throw new ErrorResponse('merchant profile not found', 404);

  const {
    user_id: id,
    profile_id: profileId,
    profile_url: profileUrl,
    identity_id: identityId,
    identity_url: identityUrl,
    ...resData
  } = merchant;

  return resData;
};

export const updateMerchantData: (
  data: UpdateMerchantProfileBody,
  userId: CustModelType['UserToken']['userId'],
) => Promise<void> = async function updateMerchantOperation(
  { identity_photo: identityPhoto, market_photo: marketPhoto, ...data },
  userId,
) {
  const merchant = await getMerchant(userId);

  if (!merchant) throw new ErrorResponse('merchant profile not found', 404);

  const {
    merchant_id: id,
    photo_id: photoId,
    photo_url: photoUrl,
    identity_id: identityId,
    identity_url: identityUrl,
  } = merchant;

  await updateMerchant(id, data);

  if (identityPhoto && marketPhoto) {
    const identity = identityPhoto[0];
    const profile = marketPhoto[0];

    await Promise.all([
      updateMedia(identityId, identity.filename),
      updateMedia(photoId, profile.filename),
    ]);
    await Promise.all([saveFiles(identity, profile), deleteLocalFiles(identityUrl, photoUrl)]);
  } else if (identityPhoto && !marketPhoto) {
    const img = identityPhoto[0];

    await updateMedia(identityId, img.filename);
    await Promise.all([saveFile(img), deleteLocalFile(identityUrl)]);
  } else if (!identityPhoto && marketPhoto) {
    const img = marketPhoto[0];

    await updateMedia(photoId, img.filename);
    await Promise.all([saveFile(img), deleteLocalFile(photoUrl)]);
  }
};

export const updateMerchantOperation: (
  data: UpdateMerchantClosetimeBody,
  userId: CustModelType['UserToken']['utilId'],
) => Promise<void> = async function updateMerchantOperation({ close_time }, userId) {
  const [isUpdated] = await updateMerchant(userId, { market_close_time: close_time });

  if (!isUpdated) throw new ErrorResponse('merchant profile not found', 404);
};

export const postProductData: (
  data: PostProductBody,
  userId: CustModelType['UserToken']['userId'],
) => Promise<{ product_id: number }> = async function postProduct(
  { cover, product_name: name, description, status, ...data },
  userId,
) {
  let createdProductId = 0;

  if (cover) {
    const img = cover[0];
    const { id: coverId } = await createMedia(img.filename);
    const { id: productId } = await createProduct(userId, {
      description,
      status,
      coverId,
      product_name: name,
    });

    await createProductUtility(productId, data);
    await saveFile(img);

    createdProductId = productId;
  } else {
    const { id: productId } = await createProduct(userId, {
      description,
      status,
      product_name: name,
    });

    await createProductUtility(productId, data);

    createdProductId = productId;
  }

  return { product_id: createdProductId };
};

export const getProductData: (
  query: CustModelType['SearchQuery'],
  userId: CustModelType['UserToken']['userId'],
) => Promise<unknown> = async function postProduct(query, userId) {
  const resData = await getProducts(userId, query);

  return resData;
};

export const updateProductData: (
  productId: number,
  data: UpdateProductBody,
  userId: CustModelType['UserToken']['userId'],
) => Promise<void> = async function updateProductData(
  productId,
  { description, status, product_name: name, ...data },
  userId,
) {
  const [affectedRows] = await updateProduct(productId, userId, {
    description,
    status,
    product_name: name,
  });

  if (affectedRows < 1) throw new ErrorResponse('product not found', 404);

  await updateProductUtility(productId, data);
};

export const changeProductCover: (
  productId: number,
  data: ChangeProductCoverBody,
  userId: CustModelType['UserToken']['userId'],
) => Promise<unknown> = async function changeProductCover(productId, { cover }, userId) {
  const productCover = await getProductCover(productId, userId);

  if (!productCover) throw new ErrorResponse('product not found', 404);

  const { coverId, coverUrl } = productCover;
  const img = cover[0];

  await updateMedia(coverId, img.filename);

  const [newProductCover] = await Promise.all([
    getProductCover(productId, userId),
    saveFile(img),
    deleteLocalFile(coverUrl),
  ]);

  return {
    cover_label: newProductCover?.coverLabel,
    cover_url: newProductCover?.coverUrl,
  };
};

export const updateProductStatus: (
  productId: number,
  data: UpdateProductStatusBody,
  userId: CustModelType['UserToken']['userId'],
) => Promise<unknown> = async function updateProductStatus(productId, { status }, userId) {
  const [affectedRows] = await updateProduct(productId, userId, {
    status,
  });

  if (affectedRows < 1) throw new ErrorResponse('product not found', 404);

  return { status };
};

export const bindProductCategory: (
  productId: number,
  data: BindProductCategoryBody,
  userId: CustModelType['UserToken']['userId'],
) => Promise<unknown> = async function bindProductCategory(
  productId,
  { category_id: categoryId },
  userId,
) {
  const [product, category] = await Promise.all([
    getProduct(productId, userId),
    getCategory(categoryId),
  ]);

  if (!product) throw new ErrorResponse('product not found', 404);
  else if (!category) throw new ErrorResponse('category not found', 404);

  const { product_util_id: utilId } = product;

  await createProductCategory(utilId, categoryId);

  return {
    ...category,
    product_util_id: utilId,
  };
};

export const postProductImage: (
  productId: number,
  data: PostProductImageBody,
  userId: CustModelType['UserToken']['userId'],
) => Promise<unknown> = async function postProductImage(productId, { image }, userId) {
  const [product, productImg] = await Promise.all([
    getProduct(productId, userId),
    countProductImagesByProductId(productId, userId),
  ]);

  if (!product) throw new ErrorResponse('product not found', 404);
  else if (productImg && productImg.images >= 4)
    throw new ErrorResponse('reach maximum number of photos', 422);

  const img = image[0];
  const { product_util_id: productUtilId } = product;
  const { id, label, uri } = await createMedia(img.filename);
  const { created_at: createdAt, updated_at: updatedAt } = await createProductPhoto(
    productUtilId,
    id,
  );

  await saveFile(img);

  return {
    id: productId,
    product_util_id: productUtilId,
    image_id: id,
    image_url: uri,
    image_label: label,
    created_at: createdAt,
    updated_at: updatedAt,
  };
};

export const getProductDetail: (
  productId: number,
  userId: CustModelType['UserToken']['userId'],
) => Promise<unknown> = async function getProductDetail(productId, userId) {
  const product = await getProduct(productId, userId);

  if (!product) throw new ErrorResponse('product not found', 404);

  const [productImages, productCategories] = await Promise.all([
    getProductImagesByProductId(productId),
    getProductCategoriesByProductId(productId),
  ]);

  return { ...product, images: productImages, categories: productCategories };
};

export const removeProductCategory: (
  caegoryId: number,
  userId: CustModelType['UserToken']['userId'],
) => Promise<void> = async function removeProductCategory(categoryId, userId) {
  const productCategory = await getProductCategory(categoryId, userId);

  if (!productCategory) throw new ErrorResponse('product category not found', 404);

  await deleteProductCategory(categoryId);
};

export const removeProductImage: (
  imageId: number,
  userId: CustModelType['UserToken']['userId'],
) => Promise<void> = async function removeProductImage(imageId, userId) {
  const productImage = await getProductImage(imageId, userId);

  if (!productImage) throw new ErrorResponse('product image not found', 404);

  await deleteProductImage(imageId);
};

export const deleteProduct: (
  productId: number,
  userId: CustModelType['UserToken']['userId'],
) => Promise<void> = async function deleteProduct(productId, userId) {
  const [affectedRows] = await updateProduct(productId, userId, { status: 3 });

  if (affectedRows < 0) throw new ErrorResponse('product not found', 404);
};

export const getOrderData: (
  query: CustModelType['SearchQuery'],
  userId: CustModelType['UserToken']['userId'],
) => Promise<unknown> = async function getOrderData(query, userId) {
  const resData = await getMerchantOrders(userId, query);

  return resData;
};

export const getOrderDetail: (
  transactionId: number,
  userId: CustModelType['UserToken']['userId'],
) => Promise<unknown> = async function getOrderDetail(transactionId, userId) {
  const resData = await getMerchantProductsOrder(userId, transactionId);

  return resData;
};

export const updateOrderStatus: (
  transactionId: number,
  data: UpdateOrderStatusBody,
  userId: CustModelType['UserToken']['userId'],
) => Promise<unknown> = async function updateOrderStatus(transactionId, { status }, userId) {
  const order = await getMerchantProductOrder(userId, transactionId);

  if (!order) throw new ErrorResponse('order not found', 404);

  const { id, qty, sub_total_price: subTotalPrice, buyer_id: buyerId } = order;
  const promises: unknown[] = [updateTransactionProduct(id, { status })];

  if (status === 4) {
    const userWallet = await getUserWalletBalance(buyerId);

    if (!userWallet) throw new ErrorResponse('order not found', 404);

    promises.push(
      updateUserWallet(userWallet.id, { balance: userWallet.balance - qty * subTotalPrice }),
    );
  }

  await Promise.all(promises);

  const resData = await getMerchantProductOrder(userId, transactionId);

  return resData;
};

export const getMerchantData: (
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function getMerhantData(query) {
  const resData = await getMerchants(query);

  return resData;
};

export const getMerchantProductData: (
  merchantId: number,
) => Promise<unknown> = async function getMerhantProductData(merchantId) {
  const resData = await getProducts(merchantId);

  return resData;
};

export const getRandomMerchantData: (
  limit: number,
) => Promise<unknown> = async function getRandomMerchantData(limit) {
  const resData = await getRandomMerchants(limit);

  return resData;
};

export const getTransactionHistories: (
  date: string,
  userId: CustModelType['UserToken']['userId'],
) => Promise<unknown> = async function getTransactionHistories(date, userId) {
  const resData = await getMerchantTransactions(userId, date);

  return resData;
};

export const getIncomeHistories: (
  year: number,
  userId: CustModelType['UserToken']['userId'],
) => Promise<unknown> = async function getIncomeHistories(year, userId) {
  const transactions = await getMerchantTransactions(userId, year.toString());
  const newTransactions = transactions.reduce<{ total_price: number; month: number }[]>(
    (acc, curr) => {
      const currMonth = new Date(curr.created_at).getMonth() + 1;
      const existed = acc.find((val) => val && val.month === currMonth);
      const data = {
        total_price: curr.total_price,
        month: currMonth,
      };

      if (!existed) acc.push(data);
      else existed.total_price += data.total_price;

      return acc;
    },
    [],
  );

  return newTransactions;
};
