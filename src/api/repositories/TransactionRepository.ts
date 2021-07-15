import { QueryTypes, Op } from 'sequelize';
import type CustModelType from '../types/model';
import type { ReviewProductBody } from '../types/schema';
import sequelize from '../../databases/sequelize';
import { queryingBuilder } from '../utils/sql-query-builder';
import initModels, { ModelType } from '../models/sql/init-models';

type UserTransactionType = {
  merchant_id: number;
  total_price: number;
  [index: string]: unknown;
};

type UserWalletBalanceType = {
  id: number;
  balance: number;
  [index: string]: unknown;
};

type TransactionProductType = {
  status: number;
  [index: string]: unknown;
};

const { UserWallet, ProductReview, UserTransaction } = initModels(sequelize);

export const createProductReview: (
  transactionProductId: number,
  data: ReviewProductBody,
) => Promise<[ModelType['ProductReview'], boolean]> = function createProductReview(
  transactionProductId,
  data,
) {
  return ProductReview.findOrCreate({
    where: { id_u_user_transaction_products: transactionProductId },
    defaults: { ...data, id_u_user_transaction_products: transactionProductId },
  });
};

export const updateUserWallet: (
  id: number,
  data: { balance: number },
) => Promise<[number, ModelType['UserWallet'][]]> = function updateUserWallet(id, { balance }) {
  return UserWallet.update({ balance }, { where: { id } });
};

export const updateUserTransaction: (
  transactionId: number,
  userId: number,
) => Promise<[number, ModelType['UserTransaction'][]]> = function updateUserTransaction(
  transactionId,
  userId,
) {
  return UserTransaction.update(
    { status: 3 },
    {
      where: {
        id: transactionId,
        id_m_users: userId,
        status: { [Op.lt]: 3, [Op.gt]: 0 },
      },
    },
  );
};

export const getUserTransactions: (
  userId: number,
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = function getUserTransactions(userId, { status, ...query }) {
  let sqlQuery = `
    SELECT 
      *
    FROM v_user_transaction vut 
    WHERE vut.buyer_id= :userId
  `;

  if (status) sqlQuery += `AND vut.status = ${status}`;

  sqlQuery = `
    SELECT 
      *
    FROM (
      ${sqlQuery}
    ) AS products
    `;

  sqlQuery += queryingBuilder(query);

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
    replacements: { userId },
  });
};

export const getUserTransaction: (
  transactionId: number,
  userId: number,
) => Promise<UserTransactionType | null> = function getUserTransaction(transactionId, userId) {
  const sqlQuery = `
    SELECT 
      *
    FROM v_user_transaction vut 
    WHERE vut.id = :transactionId AND vut.buyer_id = :userId
  `;

  return sequelize.query<UserTransactionType>(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { transactionId, userId },
  });
};

export const getUserTransactionProducts: (
  transactionId: number,
  userId: number,
) => Promise<unknown> = function getUserTransactionProducts(transactionId, userId) {
  const sqlQuery = `
    SELECT
      *
    FROM v_user_transaction_products 
    WHERE transaction_id = :transactionId AND buyer_id = :userId
  `;

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
    replacements: { transactionId, userId },
  });
};

export const getUserReviewedTransactions: (
  userId: number,
  query: CustModelType['SearchQuery'],
) => Promise<unknown> = function getUserReviewedTransactions(userId, query) {
  let sqlQuery = `
    SELECT
      *
    FROM (
      SELECT
        uutpr.id,
        mp.id AS product_id,
        mp.product_name,
        up.price_selling AS selling_price,
        mm.label AS cover_label,
        mm.uri AS cover_url,
        uu.id_m_users AS merchant_id,
        uuim.id AS market_id,
        uuim.market_name,
        uutpr.rating,
        uutpr.review,
        uutpr.created_at,
        uutpr.updated_at
      FROM u_user_transaction uut
        LEFT JOIN u_user_transaction_products uutp ON uut.id = uutp.id_u_user_transaction
        LEFT JOIN u_user_transaction_product_reviews uutpr ON uutpr.id_u_user_transaction_products = uutp.id
        LEFT JOIN m_products mp ON mp.id = uutp.id_m_products
        LEFT JOIN m_medias mm ON mm.id = mp.id_cover
        LEFT JOIN u_product up ON up.id_m_products = mp.id
        LEFT JOIN m_users mu ON mu.id = uut.id_merchant
        LEFT JOIN u_user uu ON uu.id_m_users = mu.id
        LEFT JOIN u_user_is_merchant uuim ON uuim.id_u_user = uu.id
      WHERE uut.id_m_users = :userId
    ) AS reviews
  `;

  sqlQuery += queryingBuilder(query);

  return sequelize.query(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: false,
    replacements: { userId },
  });
};

export const getUserWalletBalance: (
  userId: number,
) => Promise<UserWalletBalanceType | null> = function getUserWalletBalance(userId) {
  const sqlQuery = `
    SELECT
      uuw.id,
      uuw.balance
    FROM u_user_wallet uuw
      LEFT JOIN u_user uu ON uu.id = uuw.id_u_user
    WHERE uu.id_m_users = :userId
  `;

  return sequelize.query<UserWalletBalanceType>(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { userId },
  });
};

export const getUserTransactionProduct: (
  transactionProductId: number,
  userId: number,
) => Promise<TransactionProductType | null> = function getUserTransactionProduct(
  transactionProductId,
  userId,
) {
  const sqlQuery = `
    SELECT
       uut.status
    FROM u_user_transaction_products uutp
      LEFT JOIN u_user_transaction uut ON uut.id = uutp.id_u_user_transaction
      LEFT JOIN m_users mu ON mu.id = uut.id_m_users
    WHERE uutp.id = :transactionProductId AND uut.id_m_users = :userId 
  `;

  return sequelize.query<TransactionProductType>(sqlQuery, {
    type: QueryTypes.SELECT,
    raw: true,
    plain: true,
    replacements: { transactionProductId, userId },
  });
};
