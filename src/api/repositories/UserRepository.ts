import { QueryTypes, Op } from 'sequelize';
import type { RegisterBody, ActivateMerchantBody, UpdateProfileBody } from '../types/schema';
import sequelize from '../../databases/sequelize';
import initModels, { ModelType } from '../models/sql/init-models';
import { Merchant } from '../models/sql/Merchant';

type UserType = {
  id: number;
  full_name: string;
  username: string;
  password: string;
  address: string;
  phone_number: string;
  imgUrl: string | null;
  imgId: number | null;
  utilId: number;
  type: number;
};

type UserUtilityType = {
  id: number;
  userId: number;
  token: string;
  type: number;
  previousType: number;
};

type UserForgotToken = {
  userId: number;
};

const { User, UserUtility, UserWallet, Media, UserLostPassword } = initModels(sequelize);

export const createUser: (data: RegisterBody) => Promise<ModelType['User']> = function createUser(
  data: RegisterBody,
) {
  return User.create(data);
};

export const createUserUtility: (
  token: string,
  userId: number,
) => Promise<ModelType['UserUtility']> = function createUserUtility(token, userId) {
  return UserUtility.create({ api_token: token, id_m_users: userId });
};

export const createUserWallet: (
  userUtilityId: number,
) => Promise<ModelType['UserWallet']> = function createUserWallet(userUtilityId) {
  return UserWallet.create({ id_u_user: userUtilityId });
};

export const createUserImg: (label: string) => Promise<ModelType['Media']> = function createUserImg(
  label,
) {
  return Media.create({ label, uri: `/img/${label}` });
};

export const createForgotPassword: (data: {
  utilId: number;
  phone: string;
}) => Promise<ModelType['UserLostPassword']> = function createForgotPassword({ utilId, phone }) {
  return UserLostPassword.create({ id_u_user: utilId, verification_token: phone });
};

export const createImgs: (labels: string[]) => Promise<ModelType['Media'][]> = function createImgs(
  labels,
) {
  return Media.bulkCreate(labels.map((label) => ({ label, uri: `/img/${label}` })));
};

export const createMerchant: (
  data: Omit<ActivateMerchantBody, 'identity_photo' | 'market_photo'> & {
    id_u_user: number;
    id_identity_photo: number;
    id_market_photo: number;
  },
) => Promise<[ModelType['Merchant'], boolean]> = function createMerchant(data) {
  return Merchant.findOrCreate({ where: { id_u_user: data.id_u_user }, defaults: data });
};

export const updateUser: (
  userId: number,
  data: UpdateProfileBody & { id_photo?: number },
) => Promise<[number, ModelType['User'][]]> = function updateUser(userId, data) {
  return User.update(data, { where: { id: userId } });
};

export const updateUserImg: (
  imgId: number,
  imgName: string,
) => Promise<[number, ModelType['Media'][]]> = function updateUserImg(imgId, label) {
  return Media.update({ label, uri: `/img/${label}` }, { where: { id: imgId } });
};

export const updateForgotTokenStatus: (
  token: string,
  fromStatus: number,
  toStatus: number,
) => Promise<[number, ModelType['UserLostPassword'][]]> = function updateTokenStatus(
  token,
  fromStatus,
  toStatus,
) {
  return UserLostPassword.update(
    { status: toStatus },
    { where: { [Op.and]: [{ verification_token: token }, { status: fromStatus }] } },
  );
};

export const updateUserType: (
  role: 'ADMIN' | 'MERCHANT' | 'BANNED',
  userId: number,
) => Promise<[number, ModelType['UserUtility'][]]> = function updateUserType(role, userId) {
  let type = 0;

  switch (role) {
    case 'ADMIN':
      type = 2;
      break;
    case 'BANNED':
      type = 3;
      break;
    default:
      type = 1;
  }

  return UserUtility.update({ type }, { where: { id_m_users: userId } });
};

export const getUser: (
  by: 'ID' | 'USERNAME' | 'PHONE',
  val: string | number,
) => Promise<UserType | null> = function getUser(by, val) {
  let sqlQuery = ` 
        SELECT
            mu.id,
            mu.full_name,
            mu.username,
            mu.password,
            mu.address,
            mu.phone_number,
            mm.uri AS imgUrl,
            mm.id AS imgId,
            uu.id AS utilId,
            uu.type AS type
        FROM m_users mu
        LEFT JOIN m_medias mm ON mm.id = mu.id_photo
        LEFT JOIN u_user uu ON uu.id_m_users = mu.id
    `;

  switch (by) {
    case 'USERNAME':
      sqlQuery += ' WHERE mu.username = :val';
      break;
    case 'PHONE':
      sqlQuery += ' where mu.phone_number = :val';
      break;
    default:
      sqlQuery += ' WHERE mu.id = :val';
  }

  return sequelize.query<UserType>(sqlQuery, {
    replacements: { val },
    type: QueryTypes.SELECT,
    plain: true,
  });
};

export const getUserUtility: (userId: number) => Promise<UserUtilityType> = function getUserUtility(
  userId,
) {
  const sqlQuery = `
        SELECT
            id,
            id_m_users AS userId,
            api_token AS token,
            type,
            type_before_banned AS previousType
        FROM u_user
        WHERE id_m_users = :userId
    `;

  return sequelize.query<UserUtilityType>(sqlQuery, {
    replacements: { userId },
    type: QueryTypes.SELECT,
    plain: true,
  });
};

export const getUserWallets: (userId: number) => Promise<unknown> = function getUserWallets(
  userId,
) {
  const sqlQuery = `
        SELECT
            uuw.balance,
            uuw.is_visible,
            mw.wallet_name,
            mw.wallet_description,
            mm.uri,
            mm.label
        FROM u_user_wallet uuw
        LEFT JOIN m_wallets mw ON mw.id = uuw.id_m_wallets
        LEFT JOIN m_medias mm ON mm.id = mw.id_logo
        WHERE uuw.id_u_user = :userId
    `;

  return sequelize.query(sqlQuery, {
    replacements: { userId },
    type: QueryTypes.SELECT,
  });
};

export const getUserForgotToken: (
  token: string,
) => Promise<UserForgotToken | null> = function getUserForgotToken(token) {
  const sqlQuery = `
        SELECT
            uu. id_m_users AS userId
        FROM u_user_lost_password uulp
        LEFT JOIN u_user uu ON uu.id = uulp.id_u_user
        WHERE uulp.verification_token = :token
          AND uulp.status = 1
    `;

  return sequelize.query<UserForgotToken>(sqlQuery, {
    replacements: { token },
    type: QueryTypes.SELECT,
    plain: true,
  });
};
