import type { CustModelType } from "../types/model";
import type { RegisterBody } from "../types/schema";
import { QueryTypes } from "sequelize";
import { sequelize } from "../../databases/sequelize";
import { ModelType, initModels } from "../models/sql/init-models";
const { User, UserUtility, UserWallet } = initModels(sequelize);

export const createUser: (
    data: RegisterBody
) => Promise<ModelType["UserType"]> = async (data: RegisterBody) =>
    User.create(data);

export const createUserUtility: (
    token: string,
    userId: number
) => Promise<ModelType["UserUtility"]> = (token, userId) =>
    UserUtility.create({ api_token: token, id_m_users: userId });

export const createUserWallet = (
    userUtilityId: number
): Promise<ModelType["UserWallet"]> =>
    UserWallet.create({ id_u_user: userUtilityId });

export const userPassword: (
    username: string
) => Promise<CustModelType["UserPassword"]> = async (username) => {
    const sqlQuery = `
        SELECT
            id,
            password 
        FROM m_users
        WHERE username = :username
    `;
    const user = await sequelize.query<CustModelType["UserPassword"]>(
        sqlQuery,
        {
            replacements: { username },
            type: QueryTypes.SELECT,
            plain: true,
        }
    );
    return user;
};

export const userUtility: (
    userId: number
) => Promise<CustModelType["UserToken"]> = async (userId) => {
    const sqlQuery = `
        SELECT
            type,
            api_token as token
        FROM u_user
        WHERE id_m_users = :userId
    `;
    const user = await sequelize.query<CustModelType["UserToken"]>(sqlQuery, {
        replacements: { userId },
        type: QueryTypes.SELECT,
        plain: true,
    });
    return user;
};

export const userAccount: (
    token: string
) => Promise<CustModelType["UserAccount"]> = async (token) => {
    const sqlQuery = ` 
        SELECT
            mu.full_name,
            mu.username,
            mu.address,
            mu.phone_number,
            mm.uri AS face,
            uu.id
        FROM m_users mu
        LEFT JOIN m_medias mm ON mu.id_photo = mm.id
        LEFT JOIN u_user uu ON mu.id = uu.id_m_users
        WHERE uu.api_token = :token;
    `;
    const userAccount = await sequelize.query<CustModelType["UserAccount"]>(
        sqlQuery,
        {
            replacements: { token },
            type: QueryTypes.SELECT,
            plain: true,
        }
    );
    return userAccount;
};

export const userWallets: (
    userId: number
) => Promise<CustModelType["UserWallet"][]> = async (userId) => {
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
    const userWallet = await sequelize.query<CustModelType["UserWallet"]>(
        sqlQuery,
        {
            replacements: { userId },
            type: QueryTypes.SELECT,
        }
    );
    return userWallet;
};

export const userToken: (
    token: string
) => Promise<CustModelType["UserUtility"]> = (token) => {
    const sqlQuery = `
        SELECT
            id,
            id_m_users AS user_id,
            type
        FROM u_user
        WHERE api_token = :token
   `;
    const userUtility = sequelize.query<CustModelType["UserUtility"]>(
        sqlQuery,
        {
            replacements: { token },
            type: QueryTypes.SELECT,
            plain: true,
        }
    );
    return userUtility;
};
