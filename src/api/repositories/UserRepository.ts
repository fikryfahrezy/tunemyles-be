import { QueryTypes, Op } from 'sequelize';
import type CustModelType from '../types/model';
import type { RegisterBody, UpdateProfileBody } from '../types/schema';
import sequelize from '../../databases/sequelize';
import initModels, { ModelType } from '../models/sql/init-models';

const { User, UserUtility, UserWallet, Media, UserLostPassword } = initModels(sequelize);

export const createUser: (data: RegisterBody) => Promise<ModelType['User']> = (
  data: RegisterBody,
) => User.create(data);

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

export const createUserImg: (
  imgName: string,
) => Promise<ModelType['Media']> = function createUserImg(label) {
  return Media.create({ label, uri: `/img/${label}` });
};

export const createForgotPassword: (data: {
  utilId: number;
  phone: string;
}) => Promise<ModelType['UserLostPassword']> = function createForgotPassword({ utilId, phone }) {
  return UserLostPassword.create({ id_u_user: utilId, verification_token: phone });
};

export const updateUser: (
  userId: number,
  data: UpdateProfileBody & { id_photo?: number },
) => Promise<[number, ModelType['User'][]]> = function updateUser(id, data) {
  return User.update(data, { where: { id } });
};

export const updateUserImg: (
  imgId: number,
  imgName: string,
) => Promise<[number, ModelType['Media'][]]> = function updateUserImg(id, label) {
  return Media.update({ label, uri: `/img/${label}` }, { where: { id } });
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

export const updateUserToAdmin: (
  userId: number,
) => Promise<[number, ModelType['UserUtility'][]]> = function updateUserToAdmin(userId) {
  return UserUtility.update({ type: 2 }, { where: { id_m_users: userId } });
};

export const getUser: (
  by: 'ID' | 'USERNAME' | 'PHONE',
  val: string | number,
) => Promise<CustModelType['User'] | null> = function getUser(by, val) {
  let sqlQuery = ` 
        SELECT
            mu.id,
            mu.full_name,
            mu.username,
            mu.password,
            mu.address,
            mu.phone_number,
            mm.uri AS face,
            mm.id AS imgId,
            uu.id AS utilId,
            uu.type AS type
        FROM m_users mu
        LEFT JOIN m_medias mm ON mu.id_photo = mm.id
        LEFT JOIN u_user uu ON mu.id = uu.id_m_users
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

  return sequelize.query<CustModelType['User']>(sqlQuery, {
    replacements: { val },
    type: QueryTypes.SELECT,
    plain: true,
  });
};

export const getUserUtility: (
  userId: number,
) => Promise<CustModelType['UserUtility']> = function getUserUtility(userId) {
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

  return sequelize.query<CustModelType['UserUtility']>(sqlQuery, {
    replacements: { userId },
    type: QueryTypes.SELECT,
    plain: true,
  });
};

export const getUserWallets: (
  userId: number,
) => Promise<CustModelType['UserWallet'][]> = function getUserWallets(userId) {
  const sqlQuery = `
        SELECT
            uuw.balance,
            uuw.is_visible,
            mw.wallet_name,
            mw.wallet_description,
            mm.uri,
            mm.label
        FROM u_user_wallet uuw
        LEFT JOIN m_wallets mw ON uuw.id_m_wallets = mw.id
        LEFT JOIN m_medias mm ON mw.id_logo = mm.id
        WHERE uuw.id_u_user = :userId
    `;

  return sequelize.query<CustModelType['UserWallet']>(sqlQuery, {
    replacements: { userId },
    type: QueryTypes.SELECT,
  });
};

export const getUserForgotToken: (
  token: string,
) => Promise<CustModelType['UserForgotToken'] | null> = function getUserForgotToken(token) {
  const sqlQuery = `
        SELECT
            uu. id_m_users AS userId
        FROM u_user_lost_password uulp
        LEFT JOIN u_user uu ON uulp.id_u_user = uu.id
        WHERE uulp.verification_token = :token
          AND uulp.status = 1
    `;

  return sequelize.query<CustModelType['UserForgotToken']>(sqlQuery, {
    replacements: { token },
    type: QueryTypes.SELECT,
    plain: true,
  });
};
