import type { RegisterBody, LoginBody } from "../../types/schema";
import type { UserToken } from "../../types/model";
import bcrypt from "bcrypt";
import { ErrorResponse } from "../../utils/error-handler";
import { initModels } from "../../models/sql/init-models";
import { userPassword, userUtility, userAccount, userWallets } from "./model";

const { User, UserUtility, UserWallet } = initModels();

export const userRegistration: (
    data: RegisterBody
) => Promise<UserToken> = async (data) => {
    const user = await User.create(data);
    const userUtility = await UserUtility.create({
        api_token: data.password,
        id_m_users: user.id,
    });
    await UserWallet.create({ id_u_user: userUtility.id });

    const type = userUtility.type as number;
    const token = userUtility.api_token;

    return { type, token };
};

export const userLogin: (data: LoginBody) => Promise<UserToken> = async ({
    username,
    password,
}) => {
    const user = await userPassword(username);
    if (!user) throw new ErrorResponse("invalid credentials", 400);
    const isSame = await bcrypt.compare(password, user.password);
    if (!isSame) throw new ErrorResponse("invalid credentials", 400);
    const utility = await userUtility(user.id);
    if (utility.type >= 3)
        throw new ErrorResponse("account already banned", 403);

    return utility;
};

export const userProfile: (token: string) => Promise<unknown> = async (
    token
) => {
    const user = await userAccount(token);
    const wallets = await userWallets(user.id as number);
    const data = {
        ...user,
        wallets,
    };
    delete data.id;
    return data;
};
