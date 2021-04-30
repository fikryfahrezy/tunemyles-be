import bcrypt from 'bcrypt';
import type { RegisterBody, LoginBody } from '../../types/schema';
import type CustModelType from '../../types/model';
import { ErrorResponse } from '../../utils/error-handler';
import { issueJwt } from '../../utils/jwt';
import {
  userPassword,
  userUtility,
  userAccount,
  userWallets,
  createUser,
  createUserUtility,
  createUserWallet,
} from '../../repositories/AuthRepository';

export const userRegistration: (
  data: RegisterBody
) => Promise<CustModelType['UserToken']> = async (data) => {
  const user = await createUser(data);
  const { id, type } = await createUserUtility(data.password, user.id);
  await createUserWallet(id);

  const userType = type as number;
  const token = issueJwt(user.id, id, userType);
  const returnData = {
    token,
    type: userType,
  };

  return returnData;
};

export const userLogin: (
  data: LoginBody
) => Promise<CustModelType['UserToken']> = async ({ username, password }) => {
  const user = await userPassword(username);
  if (!user) throw new ErrorResponse('invalid credentials user', 400);

  const isSame = await bcrypt.compare(password, user.password);
  if (!isSame) throw new ErrorResponse('invalid credentials', 400);

  const { utilId, type } = await userUtility(user.id);
  if (type >= 3) throw new ErrorResponse('account already banned', 403);

  const token = issueJwt(user.id, utilId, type);
  const data = {
    type,
    token,
  };

  return data;
};

export const userProfile: (userId: number) => Promise<unknown> = async (
  userId,
) => {
  const { id, ...user } = await userAccount(userId);
  const wallets = await userWallets(id as number);
  const data = {
    ...user,
    wallets,
  };
  return data;
};

export const updateUserProfile: (userId: number) => Promise<boolean> = async (
  userId,
) => {
  const test = userId === 1;
  return Promise.resolve(test);
};

export const forgotUserPassword: (userId: number) => Promise<boolean> = async (
  userId,
) => {
  const test = userId === 1;
  return Promise.resolve(test);
};

export const verifyUserToken: (userId: number) => Promise<boolean> = async (
  userId,
) => {
  const test = userId === 1;
  return Promise.resolve(test);
};

export const resetUserPassword: (userId: number) => Promise<boolean> = async (
  userId,
) => {
  const test = userId === 1;
  return Promise.resolve(test);
};
