import { QueryTypes } from 'sequelize';
import type CustModelType from '../types/model';
import type { RegisterBody } from '../types/schema';
import sequelize from '../../databases/sequelize';
import initModels, { ModelType } from '../models/sql/init-models';

const { User, UserUtility, UserWallet } = initModels(sequelize);

export const createUser: (
  data: RegisterBody
) => Promise<ModelType['UserType']> = (data: RegisterBody) => User.create(data);

export const createUserUtility: (
  token: string,
  userId: number
) => Promise<ModelType['UserUtility']> = (token, userId) => UserUtility.create({ api_token: token, id_m_users: userId });

export const createUserWallet = (
  userUtilityId: number,
): Promise<ModelType['UserWallet']> => UserWallet.create({ id_u_user: userUtilityId });

export const userPassword: (
  username: string
) => Promise<CustModelType['UserPassword']> = (username) => {
  const sqlQuery = `
        SELECT
            id,
            password 
        FROM m_users
        WHERE username = :username
    `;
  const user = sequelize.query<CustModelType['UserPassword']>(sqlQuery, {
    replacements: { username },
    type: QueryTypes.SELECT,
    plain: true,
  });
  return user;
};

export const userUtility: (
  userId: number
) => Promise<CustModelType['UserUtility']> = (userId) => {
  const sqlQuery = `
        SELECT
            id AS utilId,
            type,
            api_token as token
        FROM u_user
        WHERE id_m_users = :userId
    `;
  const user = sequelize.query<CustModelType['UserUtility']>(sqlQuery, {
    replacements: { userId },
    type: QueryTypes.SELECT,
    plain: true,
  });
  return user;
};

export const userAccount: (
  userId: number
) => Promise<CustModelType['UserAccount']> = (userId) => {
  const sqlQuery = ` 
        SELECT
            mu.full_name AS fullName,
            mu.username,
            mu.address,
            mu.phone_number AS phoneNumber,
            mm.uri AS face,
            uu.id
        FROM m_users mu
        LEFT JOIN m_medias mm ON mu.id_photo = mm.id
        LEFT JOIN u_user uu ON mu.id = uu.id_m_users
        WHERE uu.id = :userId;
    `;
  const user = sequelize.query<CustModelType['UserAccount']>(sqlQuery, {
    replacements: { userId },
    type: QueryTypes.SELECT,
    plain: true,
  });
  return user;
};

export const userWallets: (
  userId: number
) => Promise<CustModelType['UserWallet'][]> = (userId) => {
  const sqlQuery = `
        SELECT
            uuw.balance,
            uuw.is_visible AS isVisible,
            mw.wallet_name AS walletName,
            mw.wallet_description AS walletDescription,
            mm.uri,
            mm.label
        FROM u_user_wallet uuw
        LEFT JOIN m_wallets mw ON uuw.id_m_wallets = mw.id
        LEFT JOIN m_medias mm ON mw.id_logo = mm.id
        WHERE uuw.id_u_user = :userId;
    `;
  const userWallet = sequelize.query<CustModelType['UserWallet']>(
    sqlQuery,
    {
      replacements: { userId },
      type: QueryTypes.SELECT,
    },
  );
  return userWallet;
};

export const userToken: (
  token: string
) => Promise<CustModelType['UserUtility']> = (token) => {
  const sqlQuery = `
        SELECT
            id_m_users AS userId,
            id AS utilId,
            type
        FROM u_user
        WHERE api_token = :token
   `;
  const utility = sequelize.query<CustModelType['UserUtility']>(sqlQuery, {
    replacements: { token },
    type: QueryTypes.SELECT,
    plain: true,
  });
  return utility;
};
