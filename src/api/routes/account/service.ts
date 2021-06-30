import bcrypt from 'bcrypt';
import type CustModelType from '../../types/model';
import type {
  VerifyTokenParams,
  RegisterBody,
  ActivateMerchantBody,
  LoginBody,
  UpdateProfileBody,
  ForgotPasswordBody,
  ResetPasswordBody,
} from '../../types/schema';
import { ErrorResponse } from '../../utils/error-handler';
import { issueJwt } from '../../utils/jwt';
import { saveFile, saveFiles, deleteLocalFile } from '../../utils/file-management';
import {
  createUser,
  createUserUtility,
  createUserWallet,
  createMedia,
  createForgotPassword,
  createMedias,
  createMerchant,
  updateUser,
  updateMedia,
  updateForgotTokenStatus,
  updateUserType,
  getUser,
  getUserUtility,
  getUserWallets,
  getUserForgotToken,
} from '../../repositories/UserRepository';

type UserAuth = {
  type: number;
  token: string;
};

export const userRegistration: (
  data: RegisterBody,
) => Promise<UserAuth> = async function userRegistration(data) {
  const user = await createUser(data);
  const { id, type } = await createUserUtility(data.password, user.id);

  await createUserWallet(id);

  const userType = type as number;
  const jwtToken = issueJwt(user.id, id, 'USER');

  return {
    type: userType,
    token: jwtToken,
  };
};

export const merchantRegistration: (
  data: ActivateMerchantBody,
  userToken: CustModelType['UserToken'],
) => Promise<UserAuth> = async function merchantRegistration(
  { identity_photo: identityPhoto, market_photo: marketPhoto, ...data },
  { userId, utilId, type },
) {
  if (type === 1) throw new ErrorResponse('user already merchant', 400);

  const identity = identityPhoto[0];
  const market = marketPhoto[0];
  const [identityImg, marketImg] = await createMedias([identity.filename, market.filename]);
  const [, created] = await createMerchant(utilId, {
    ...data,
    id_identity_photo: identityImg.id,
    id_market_photo: marketImg.id,
  });

  if (!created) throw new ErrorResponse('user already merchant', 400);

  await updateUserType('MERCHANT', userId);
  await saveFiles(identity, market);

  const jwtToken = issueJwt(userId, utilId, 'MERCHANT');

  return {
    type: 1,
    token: jwtToken,
  };
};

export const userLogin: (data: LoginBody) => Promise<UserAuth> = async function userLogin({
  username,
  password,
}) {
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

  if (!user) throw new ErrorResponse('user profile not found', 404);

  const userWallets = await getUserWallets(user.utilId);

  return {
    full_name: user.full_name,
    username: user.address,
    address: user.address,
    phone_number: user.phone_number,
    img_label: user.imgLabel,
    img_url: user.imgUrl,
    wallets: userWallets,
  };
};

export const updateUserProfile: (
  userId: CustModelType['UserToken']['userId'],
  data: UpdateProfileBody,
) => Promise<void> = async function updateUserProfile(userId, { avatar, ...userData }) {
  const user = await getUser('ID', userId);

  if (!user) throw new ErrorResponse('user profile not found', 404);

  const { id, imgId, imgUrl } = user;

  if (avatar && imgId) {
    const img = avatar[0];

    await Promise.all([updateUser(id, userData), updateMedia(imgId, img.filename)]);
    await Promise.all([saveFile(img), deleteLocalFile(imgUrl)]);
  } else if (avatar && !imgId) {
    const img = avatar[0];
    const { id: newImgId } = await createMedia(img.filename);

    await updateUser(id, { ...userData, id_photo: newImgId });
    await saveFile(img);
  } else await updateUser(id, userData);
};

export const forgotUserPassword: (
  data: ForgotPasswordBody,
) => Promise<{ token: string }> = async function forgotUserPassword({ phone_number }) {
  const user = await getUser('PHONE', phone_number);

  if (!user) throw new ErrorResponse('no user available', 404);
  else if (user.type >= 3) throw new ErrorResponse('user already banned', 403);

  const { verification_token: token } = await createForgotPassword({
    utilId: user.utilId,
    phone: phone_number,
  });

  return { token };
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

  if (!user) throw new ErrorResponse('reset password failed', 404);
  else if (affectedRows < 1) throw new ErrorResponse('verify failed', 404);

  const { userId } = await getUserUtility(user.userId);

  await updateUser(userId, { password: newPassword });
};

export const makeUserAdmin: (
  userId: number,
  utilId: number,
) => Promise<string> = async function makeUserAdmin(userId, utilId) {
  const [affectedRows] = await updateUserType('ADMIN', userId);

  if (affectedRows < 1) throw new ErrorResponse('update failed', 404);

  return issueJwt(userId, utilId, 'ADMIN');
};

export const bannedUser: (userId: number) => Promise<void> = async function bannedUser(userId) {
  await updateUserType('BANNED', userId);
};
