import type { UserPassword, UserToken } from "../../types/model";
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
    const user = await sequelize.query(sqlQuery, {
        replacements: { username },
        type: QueryTypes.SELECT,
        plain: true,
    });
    return user as UserPassword;
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
    const user = await sequelize.query(sqlQuery, {
        replacements: { userId },
        type: QueryTypes.SELECT,
        plain: true,
    });
    return user as UserToken;
};
