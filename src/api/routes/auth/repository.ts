import type { RegisterBody, LoginBody } from "../../types/schema";
import type { CustModelType } from "../../types/model";
import bcrypt from "bcrypt";
import { ErrorResponse } from "../../utils/error-handler";
import {
    userPassword,
    userUtility,
    userAccount,
    userWallets,
    createUser,
    createUserUtility,
    createUserWallet,
} from "./model";

export const userRegistration: (
    data: RegisterBody
) => Promise<CustModelType["UserToken"]> = async (data) => {
    const user = await createUser(data);
    const userUtility = await createUserUtility(data.password, user.id);
    await createUserWallet(userUtility.id);

    const type = userUtility.type as number;
    const token = userUtility.api_token;

    return { type, token };
};

export const userLogin: (
    data: LoginBody
) => Promise<CustModelType["UserToken"]> = async ({ username, password }) => {
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
