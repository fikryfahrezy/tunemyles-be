import { QueryTypes } from 'sequelize';
import type CustModelType from '../types/model';
import type { RegisterBody, UpdateProfileBody } from '../types/schema';
import sequelize from '../../databases/sequelize';
import initModels, { ModelType } from '../models/sql/init-models';

const { User, UserUtility, UserWallet, Media } = initModels(sequelize);

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

export const updateUser: (
  userId: number,
  data: UpdateProfileBody & { id_photo?: number },
) => Promise<[number, ModelType['User'][]]> = function updateUser(id, data) {
  return User.update(data, { where: { id } });
};

export const updateUserImg: (
  imgId: number,
  imgName: string,
) => Promise<[number, ModelType['Media'][]]> = function getUpdateUserImg(id, label) {
  return Media.update({ label, uri: `/img/${label}` }, { where: { id } });
};

export const getUser: (
  by: 'USERNAME' | 'ID',
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
            uu.id AS utilId
        FROM m_users mu
        LEFT JOIN m_medias mm ON mu.id_photo = mm.id
        LEFT JOIN u_user uu ON mu.id = uu.id_m_users
    `;

  switch (by) {
    case 'USERNAME':
      sqlQuery += ' WHERE mu.username = :val';
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
            id_m_users AS user_id,
            api_token AS token,
            type,
            type_before_banned AS previous_type
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
        WHERE uuw.id_u_user = :userId;
    `;

  return sequelize.query<CustModelType['UserWallet']>(sqlQuery, {
    replacements: { userId },
    type: QueryTypes.SELECT,
  });
};
