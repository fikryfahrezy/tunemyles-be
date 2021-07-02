import { QueryTypes } from 'sequelize';
import type CustModelType from '../types/model';
import type {
  UpdateMerchantProfileBody,
  PostProductBody,
  UpdateProductBody,
  UpdateOrderStatusBody,
} from '../types/schema';
import sequelize from '../../databases/sequelize';
import { queryingBuilder } from '../utils/sql-query-builder';
import initModels, { ModelType } from '../models/sql/init-models';

type MerchantType = {
  merchant_id: number;
  photo_id: number;
  photo_url: string;
  identity_id: number;
  identity_url: string;
  [index: string]: unknown;
};

type ProductCoverType = {
  coverId: number;
  coverLabel: string;
  coverUrl: string;
  [index: string]: unknown;
};

type ProductImagesType = {
  productUtilId: number;
  images: number;
  [index: string]: unknown;
};

type ProductType = {
  product_util_id: number;
  [index: string]: unknown;
};

type ProductOrderType = {
  id: number;
  buyer_id: number;
  qty: number;
  sub_total_price: number;
  [index: string]: unknown;
};

type UserWalletBalanceType = {
  id: number;
  balance: number;
  [index: string]: unknown;
};

type MerchantTransactionType = {
  total_price: number;
  created_at: string;
  [index: string]: unknown;
};

const {
  Merchant,
  Media,
  Product,
  ProductUtility,
  ProductPhoto,
  ProductCategory,
  UserWallet,
  TransactionProduct,
} = initModels(sequelize);

export const createMedia: (label: string) => Promise<ModelType['Media']> = function createUserImg(
  label,
) {
  return Media.create({ label, uri: label });
};

export const createProduct: (
  userId: number,
  data: Pick<PostProductBody, 'product_name' | 'description' | 'status'> & { coverId?: number },
) => Promise<ModelType['Product']> = async function createProduct(
  userId,
  { status, coverId, ...data },
) {
  return Product.create({ ...data, is_visible: status, id_cover: coverId, id_m_users: userId });
};

export const createProductUtility: (
  productId: number,
  data: Omit<PostProductBody, 'product_name' | 'description' | 'status' | 'cover'>,
) => Promise<ModelType['ProductUtility']> = async function createProductUtility(
  productId,
  { normal_price, selling_price, ...data },
) {
  return ProductUtility.create({
    ...data,
    price_default: normal_price,
    price_selling: selling_price,
    id_m_products: productId,
  });
};

export const createProductPhoto: (
  productUtilId: number,
  photoId: number,
) => Promise<ModelType['ProductPhoto']> = async function createProductPhoto(
  productUtilId,
  photoId,
) {
  return ProductPhoto.create({ id_u_product: productUtilId, id_m_medias: photoId });
};

export const createProductCategory: (
  productId: number,
  categoryId: number,
) => Promise<[ModelType['ProductCategory'], boolean]> = async function createProductCategory(
  productId,
  categoryId,
) {
  const data = {
    id_m_categories: categoryId,
    id_u_product: productId,
  };

  return ProductCategory.findOrCreate({ where: data, defaults: data });
};

export const updateMerchant: (
  userId: number,
  data: Omit<UpdateMerchantProfileBody, 'identity_photo' | 'market_photo'> & {
    id_identity_photo?: number;
    id_market_photo?: number;
  },
) => Promise<[number, ModelType['Merchant'][]]> = async function updateMerchant(userId, data) {
  return Merchant.update(data, { where: { id_u_user: userId } });
};

export const updateMedia: (
  imgId: number,
  imgName: string,
) => Promise<[number, ModelType['Media'][]]> = function updateUserImg(imgId, label) {
  return Media.update({ label, uri: `/img/${label}` }, { where: { id: imgId } });
};

export const updateProduct: (
  productId: number,
  userId: number,
  data: Pick<UpdateProductBody, 'product_name' | 'description' | 'status'> & { coverId?: number },
) => Promise<[number, ModelType['Product'][]]> = async function updateProduct(
  productId,
  userId,
  { status, coverId, ...data },
) {
  return Product.update(
    { ...data, is_visible: status, id_cover: coverId },
    { where: { id_m_users: userId, id: productId } },
  );
};

export const updateProductUtility: (
  productId: number,
  data: Omit<UpdateProductBody, 'product_name' | 'description' | 'status' | 'cover'>,
) => Promise<[number, ModelType['ProductUtility'][]]> = async function updateProductUtility(
  productId,
  { normal_price, selling_price, ...data },
) {
  return ProductUtility.update(
    {
      ...data,
      price_default: normal_price,
      price_selling: selling_price,
    },
    { where: { id_m_products: productId } },
  );
};

export const updateTransactionProduct: (
  transactionProductId: number,
  data: UpdateOrderStatusBody,
) => Promise<[number, ModelType['TransactionProduct'][]]> = async function updateTransactionProduct(
  transactionProductId,
  { status },
) {
  return TransactionProduct.update({ status }, { where: { id: transactionProductId } });
};

export const updateUserWallet: (
  id: number,
  data: { balance: number; [index: string]: unknown },
) => Promise<[number, ModelType['UserWallet'][]]> = async function updateUserWallet(
  id,
  { balance },
) {
  return UserWallet.update({ balance }, { where: { id } });
};

export const deleteProductCategory: (
  id: number,
) => Promise<number> = async function deleteProductCategory(id) {
  return ProductCategory.destroy({ where: { id } });
};

export const deleteProductImage: (
  id: number,
) => Promise<number> = async function deleteProductImage(id) {
  return ProductPhoto.destroy({ where: { id } });
};

export const getMerchant: (
  userId: number,
) => Promise<MerchantType | null> = async function getMerchant(userId) {
  const sqlQuery = `
    SELECT * 
    FROM v_merchant vm
    WHERE vm.merchant_id = :userId
  `;

  return sequelize.query<MerchantType>(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { userId },
  });
};

export const getProducts: (
  userId: number,
  query?: CustModelType['SearchQuery'],
) => Promise<unknown> = async function getProducts(userId, query) {
  let sqlQuery = `
    SELECT *
    FROM (
      SELECT *
      FROM v_products vp
      WHERE vp.merchant_id = :userId
        AND vp.status <= 3
    ) AS products
    `;

  if (query) sqlQuery += queryingBuilder(query);

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
    replacements: { userId },
  });
};

export const getProductCover: (
  productId: number,
  userId: number,
) => Promise<ProductCoverType | null> = async function getProductCover(productId, userId) {
  const sqlQuery = `
    SELECT
      mm.id AS coverId,
      mm.label AS coverLabel,
      mm.uri AS coverUrl
    FROM m_products mp
      LEFT JOIN m_medias mm on mm.id = mp.id_cover
    WHERE mp.id = :productId 
      AND mp.id_m_users = :userId 
  `;

  return sequelize.query<ProductCoverType>(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { productId, userId },
  });
};

export const getProduct: (
  productId: number,
  userId: number,
) => Promise<ProductType | null> = async function getProduct(productId, userId) {
  const sqlQuery = `
    SELECT *
    FROM v_products vp
    WHERE vp.id = :productId 
      AND vp.merchant_id = :userId
      AND vp.status <= 3
  `;

  return sequelize.query<ProductType>(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { productId, userId },
  });
};

export const getProductImagesByProductId: (
  productId: number,
) => Promise<Record<string, unknown>[]> = async function getProductImagesByProductId(productId) {
  const sqlQuery = `
    SELECT 
      upp.id AS product_image_id, 
      mm.label AS image_label, 
      mm.uri AS image_url
    FROM m_products mp 
      LEFT JOIN u_product up ON up.id_m_products = mp.id 
      RIGHT JOIN u_product_photos upp ON upp.id_u_product = up.id 
      LEFT JOIN m_medias mm ON mm.id = upp.id_m_medias
    WHERE mp.id = :productId 
    `;

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
    replacements: { productId },
  });
};

export const getProductCategoriesByProductId: (
  productId: number,
) => Promise<unknown> = async function getProductCategoriesByProductId(productId) {
  const sqlQuery = `
    SELECT 
      upc.id AS product_category_id, 
      mc.category,
      mc.slug,
      mc.description,
      mm.label AS icon_label,
      mm.uri AS icon_url
    FROM m_products mp 
      LEFT JOIN u_product up ON up.id_m_products = mp.id 
      LEFT JOIN u_product_categories upc ON upc.id_u_product = up.id 
      RIGHT JOIN m_categories mc ON mc.id = upc.id_m_categories 
      LEFT JOIN m_medias mm ON mm.id = mc.id_icon 
    WHERE mp.id = :productId
    `;

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
    replacements: { productId },
  });
};

export const getCategory: (
  categoryId: number,
) => Promise<Record<string, unknown> | null> = async function getCategory(categoryId) {
  const sqlQuery = `
    SELECT
      mc.id AS category_id,
      mc.category,
      mc.slug,
      mc.description
    FROM m_categories mc
    WHERE mc.id = :categoryId
    `;

  return sequelize.query<Record<string, unknown>>(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { categoryId },
  });
};

export const getProductCategory: (
  categoryId: number,
  userId: number,
) => Promise<unknown | null> = async function getProductCategory(categoryId, userId) {
  const sqlQuery = `
    SELECT
      upc.id AS product_category_id
    FROM u_product_categories upc
      LEFT JOIN u_product up ON up.id = upc.id_u_product
      LEFT JOIN m_products mp ON mp.id = up.id_m_products
    WHERE upc.id = :categoryId
      AND mp.id_m_users = :userId
      AND mp.is_visible <= 3
    `;

  return sequelize.query<Record<string, unknown>>(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { categoryId, userId },
  });
};

export const getProductImage: (
  imageId: number,
  userId: number,
) => Promise<unknown | null> = async function getProductImage(imageId, userId) {
  const sqlQuery = `
    SELECT
      upp.id AS product_image_id
    FROM u_product_photos upp
      LEFT JOIN u_product up ON up.id = upp.id_u_product
      LEFT JOIN m_products mp ON mp.id = up.id_m_products
    WHERE upp.id = :imageId 
      AND mp.id_m_users = :userId 
      AND mp.is_visible <= 3
    `;

  return sequelize.query<Record<string, unknown>>(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { imageId, userId },
  });
};

export const getMerchantOrders: (
  merchantId: number,
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function getMerchantOrders(merchantId, { status, ...query }) {
  let sqlQuery = `
    SELECT *
    FROM v_user_transaction vut 
    WHERE vut.merchant_id= :merchantId
    `;

  if (status) sqlQuery += `AND vut.status = ${status}`;

  sqlQuery = `
    SELECT *
    FROM (
      ${sqlQuery}
    ) AS products
    `;

  sqlQuery += queryingBuilder(query);

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
    replacements: { merchantId },
  });
};

export const getMerchantProductsOrder: (
  merchantId: number,
  transactionId: number,
) => Promise<unknown> = async function getMerchantProductsOrder(merchantId, transactionId) {
  const sqlQuery = `
    SELECT *
    FROM v_user_transaction_products vutp
    WHERE vutp.transaction_id = :transactionId
      AND vutp.merchant_id= :merchantId
    `;

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
    replacements: { merchantId, transactionId },
  });
};

export const getMerchantProductOrder: (
  merchantId: number,
  transactionId: number,
) => Promise<ProductOrderType | null> = async function getMerchantProductOrder(
  merchantId,
  transactionId,
) {
  const sqlQuery = `
    SELECT *
    FROM v_user_transaction_products vutp
    WHERE vutp.transaction_id = :transactionId
      AND vutp.merchant_id= :merchantId
      AND status NOT IN (3, 4)
    `;

  return sequelize.query<ProductOrderType>(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { merchantId, transactionId },
  });
};

export const getUserWalletBalance: (
  userId: number,
) => Promise<UserWalletBalanceType | null> = async function getUserWalletBalance(userId) {
  const sqlQuery = `
    SELECT
      uuw.id,
      uuw.balance
    FROM u_user_wallet uuw
      LEFT JOIN u_user uu ON uu.id = uuw.id_u_user = uu.id
    WHERE uu.id_m_users = :userId
    `;

  return sequelize.query<UserWalletBalanceType>(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { userId },
  });
};

export const getMerchants: (
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = async function getMerchants(query) {
  let sqlQuery = 'SELECT * FROM v_merchant';

  sqlQuery += queryingBuilder(query);

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
  });
};

export const getRandomMerchants: (
  limit: number,
) => Promise<unknown> = async function getRandomMerchants(limit) {
  const sqlQuery = `
    SELECT * 
    FROM v_merchant 
    ORDER BY RAND() 
    LIMIT :limit
    `;

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
    replacements: { limit },
  });
};

export const getMerchantTransactions: (
  merchantId: number,
  date: string,
) => Promise<MerchantTransactionType[]> = async function getMerchantTransactions(merchantId, date) {
  const sqlQuery = `
    SELECT
      uut.id,
      uut.id_m_users AS buyer_id,
      uut.id_merchant AS merchant_id,
      uut.transaction_token,
      uut.total_price,
      uut.created_at,
      uut.updated_at
    FROM u_user_transaction uut
    WHERE uut.created_at LIKE :date
      AND uut.status = 3 
      AND uut.id_merchant = :merchantId
    ORDER BY uut.created_at DESC
    `;

  return sequelize.query<MerchantTransactionType>(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
    replacements: { merchantId, date: `'${date}%'` },
  });
};

export const countProductImagesByProductId: (
  productId: number,
  userId: number,
) => Promise<ProductImagesType | null> = async function countProductImagesByProductId(
  productId,
  userId,
) {
  const sqlQuery = `
    SELECT
      up.id as producUtilId,
      COUNT(upp.id_u_product) as images
    FROM m_products mp
      LEFT JOIN u_product up ON up.id_m_products = mp.id 
      RIGHT JOIN u_product_photos upp ON upp.id_u_product = up.id 
      LEFT JOIN m_medias mm ON mm.id = upp.id_m_medias
    WHERE mp.id = :productId 
      AND mp.id_m_users = :userId
    GROUP BY upp.id_u_product
    `;

  return sequelize.query<ProductImagesType>(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { productId, userId },
  });
};
