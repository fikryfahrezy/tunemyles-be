import bcrypt from 'bcrypt';
import type { RegisterBody, LoginBody, UpdateProfileBody } from '../../types/schema';
import type CustModelType from '../../types/model';
import { ErrorResponse } from '../../utils/error-handler';
import { issueJwt } from '../../utils/jwt';
import { saveFiles } from '../../utils/file-management';
import {
  getUser,
  getUserUtility,
  getUserAccount,
  getUserWallets,
  updateUser,
  updateUserImg,
  createUserImg,
  createUser,
  createUserUtility,
  createUserWallet,
} from '../../repositories/UserRepository';

export const userRegistration: (data: RegisterBody) => Promise<CustModelType['UserAuth']> = async (
  data,
) => {
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

export const userLogin: (data: LoginBody) => Promise<CustModelType['UserAuth']> = async ({
  username,
  password,
}) => {
  const user = await getUser('USERNAME', username);
  if (!user) throw new ErrorResponse('invalid credential', 400);

  const isSame = await bcrypt.compare(password, user.password);
  if (!isSame) throw new ErrorResponse('invalid credentials', 400);

  const { id, type } = await getUserUtility(user.id);
  if (type >= 3) throw new ErrorResponse('account already banned', 403);

  const token = issueJwt(user.id, id, type);
  const data = {
    type,
    token,
  };

  return data;
};

export const userProfile: (userId: number) => Promise<unknown> = async (userId) => {
  const { id, ...user } = await getUserAccount(userId);
  const wallets = await getUserWallets(id as number);
  const data = {
    ...user,
    wallets,
  };
  return data;
};

export const updateUserProfile: (
  userUtility: CustModelType['UserToken'],
  data: UpdateProfileBody,
) => Promise<void> = async ({ userId }, { avatar, ...userData }) => {
  const user = await getUser('ID', userId);

  if (!user) throw new ErrorResponse('no user available', 404);

  const { id, id_photo: imgId } = user;

  if (avatar && imgId) {
    await Promise.all([updateUser(id, userData), updateUserImg(imgId, avatar[0].filename)]);
    await saveFiles(avatar);
  } else if (avatar && !imgId) {
    const img = await createUserImg(avatar[0].filename);
    await updateUser(id, { ...userData, id_photo: img.id });
    await saveFiles(avatar);
  } else await updateUser(id, userData);
};

export const forgotUserPassword: (userId: number) => Promise<boolean> = async (userId) => {
  const test = userId === 1;
  return Promise.resolve(test);
};

export const verifyUserToken: (userId: number) => Promise<boolean> = async (userId) => {
  const test = userId === 1;
  return Promise.resolve(test);
};

export const resetUserPassword: (userId: number) => Promise<boolean> = async (userId) => {
  const test = userId === 1;
  return Promise.resolve(test);
};
