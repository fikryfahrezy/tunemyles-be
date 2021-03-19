import type {
    UserAccount,
    UserPassword,
    UserToken,
    UserWallet,
} from "../../types/model";
import { QueryTypes } from "sequelize";
import { sequelize } from "../../../databases/sequelize";

export const userPassword: (username: string) => Promise<UserPassword> = async (
    username
) => {
    const sqlQuery = `
        SELECT
            id,
            password 
        FROM m_users
        WHERE username = :username
    `;
    const user = await sequelize.query<UserPassword>(sqlQuery, {
        replacements: { username },
        type: QueryTypes.SELECT,
        plain: true,
    });
    return user;
};

export const userUtility: (userId: number) => Promise<UserToken> = async (
    userId
) => {
    const sqlQuery = `
        SELECT
            type,
            api_token as token
        FROM u_user
        WHERE id_m_users = :userId
    `;
    const user = await sequelize.query<UserToken>(sqlQuery, {
        replacements: { userId },
        type: QueryTypes.SELECT,
        plain: true,
    });
    return user;
};

export const userAccount: (token: string) => Promise<UserAccount> = async (
    token
) => {
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
    const userAccount = await sequelize.query<UserAccount>(sqlQuery, {
        replacements: { token },
        type: QueryTypes.SELECT,
        plain: true,
    });
    return userAccount;
};

export const userWallets: (userId: number) => Promise<UserWallet[]> = async (
    userId
) => {
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
    const userWallet = await sequelize.query<UserWallet>(sqlQuery, {
        replacements: { userId },
        type: QueryTypes.SELECT,
    });
    return userWallet;
};
