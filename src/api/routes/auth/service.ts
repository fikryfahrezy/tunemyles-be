import bcrypt from 'bcrypt';
import type {
  VerifyTokenParams,
  RegisterBody,
  LoginBody,
  UpdateProfileBody,
  ForgotPasswordBody,
  ResetPasswordBody,
} from '../../types/schema';
import type CustModelType from '../../types/model';
import { ErrorResponse } from '../../utils/error-handler';
import { issueJwt } from '../../utils/jwt';
import { saveFiles, deleteLocalFile } from '../../utils/file-management';
import {
  getUser,
  getUserUtility,
  getUserWallets,
  getUserForgotToken,
  createUserImg,
  createUser,
  createUserUtility,
  createUserWallet,
  createForgotPassword,
  updateUser,
  updateUserImg,
  updateForgotTokenStatus,
  updateUserToAdmin,
} from '../../repositories/UserRepository';

export const userRegistration: (
  data: RegisterBody,
) => Promise<CustModelType['UserAuth']> = async function userRegistration(regData) {
  const user = await createUser(regData);
  const { id, type } = await createUserUtility(regData.password, user.id);

  await createUserWallet(id);

  const userType = type as number;
  const token = issueJwt(user.id, id, userType);

  return {
    token,
    type: userType,
  };
};

export const userLogin: (
  data: LoginBody,
) => Promise<CustModelType['UserAuth']> = async function userLogin({ username, password }) {
  const user = await getUser('USERNAME', username);

  if (!user) throw new ErrorResponse('invalid credential', 400);

  const isSame = await bcrypt.compare(password, user.password);

  if (!isSame) throw new ErrorResponse('invalid credentials', 400);

  const { id, type } = await getUserUtility(user.id);

  if (type >= 3) throw new ErrorResponse('account already banned', 403);

  const token = issueJwt(user.id, id, type);

  return {
    type,
    token,
  };
};

export const userProfile: (userId: number) => Promise<unknown> = async function userProfile(
  userId,
) {
  const user = await getUser('ID', userId);

  if (!user) throw new ErrorResponse('invalid credential', 400);

  const userWallets = await getUserWallets(user.utilId);

  return {
    full_name: user.full_name,
    username: user.address,
    address: user.address,
    phone_number: user.phone_number,
    face: user.face,
    wallets: userWallets,
  };
};

export const updateUserProfile: (
  userUtility: CustModelType['UserToken'],
  data: UpdateProfileBody,
) => Promise<void> = async function updateUserProfile({ userId }, { avatar, ...userData }) {
  const user = await getUser('ID', userId);

  if (!user) throw new ErrorResponse('no user available', 404);

  const { id, imgId, face } = user;

  if (avatar && imgId) {
    await Promise.all([
      updateUser(id, userData),
      updateUserImg(imgId, avatar[0].filename),
      saveFiles(avatar),
    ]);
    deleteLocalFile(face as string);
  } else if (avatar && !imgId) {
    const img = await createUserImg(avatar[0].filename);

    await Promise.all([updateUser(id, { ...userData, id_photo: img.id }), saveFiles(avatar)]);
  } else await updateUser(id, userData);
};

export const forgotUserPassword: (
  data: ForgotPasswordBody,
) => Promise<void> = async function forgotUserPassword({ phone_number }) {
  const user = await getUser('PHONE', phone_number);

  if (!user) throw new ErrorResponse('no user available', 404);
  else if (user.type >= 3) throw new ErrorResponse('user banned', 403);

  await createForgotPassword({
    utilId: user.utilId,
    phone: phone_number,
  });
};

export const verifyUserToken: (
  data: VerifyTokenParams,
) => Promise<{ token: string }> = async function verifyUserToken({ token }) {
  const [affectedRows] = await updateForgotTokenStatus(token, 0, 1);

  if (affectedRows < 1) throw new ErrorResponse('verify failed', 404);

  return { token };
};

export const resetUserPassword: (
  data: ResetPasswordBody,
) => Promise<void> = async function resetUserPassword({ token, new_password: newPassword }) {
  const [user, [affectedRows]] = await Promise.all([
    getUserForgotToken(token),
    updateForgotTokenStatus(token, 1, 2),
  ]);

  if (!user) throw new ErrorResponse('reset failed', 404);
  else if (affectedRows < 1) throw new ErrorResponse('verify failed', 404);

  const { userId } = await getUserUtility(user.userId);
  await updateUser(userId, { password: newPassword });
};

export const makeUserAdmin: (userId: number) => Promise<string> = async function makeUserAdmin(
  userId,
) {
  const [affectedRows] = await updateUserToAdmin(userId);

  if (affectedRows < 1) throw new ErrorResponse('update failed', 404);

  const { id, type } = await getUserUtility(userId);

  if (type >= 3) throw new ErrorResponse('account already banned', 403);

  const token = issueJwt(userId, id, type);

  return token;
};
