import type { Server } from 'http';
import supertest, { Test } from 'supertest';
import { userRegistration, userLogin } from '../../src/api/routes/account/service';
import {
  getUser,
  createForgotPassword,
  createImgs,
  createMerchant,
} from '../../src/api/repositories/UserRepository';

type FilesType = { field: string; fileDir: string }[];

type SupertestReqType = {
  server: Server;
  type: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  url: string;
  payload?:
    | { obj: Record<string, unknown> }
    | { fields: Record<string, string | number>; files: FilesType };
  token?: string;
};

export const registerPayload = function registerPayload() {
  /**
   * NOTE: Generate random string/characters in JavaScript
   * https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
   */
  return {
    full_name: 'Name',
    username: Math.random().toString(36).substring(2),
    password: 'password',
    phone_number: Date.now().toString(),
    address: 'address',
  };
};

export const registerMerchPayload = function registerMerchPaylod() {
  return {
    no_identity: Date.now().toString(),
    market_name: 'Market Name',
    market_address: 'Market Address',
    market_lat: 3.4123213,
    market_lon: -4.321321312,
    market_close_time: '21:00',
  };
};

export const updateProfilePayload = function updateProfilePayload() {
  return {
    full_name: 'New Full Name',
    address: 'New Address',
    phone_number: Date.now().toString(),
  };
};

const supertestReq = function supertestReq({
  server,
  type,
  url,
  payload,
  token,
}: SupertestReqType) {
  const init = supertest(server);
  let req: Test;

  switch (type) {
    case 'POST':
      req = init.post(url);
      break;
    case 'PATCH':
      req = init.patch(url);
      break;
    case 'DELETE':
      req = init.delete(url);
      break;
    default:
      req = init.get(url);
  }

  if (token) req.set('authorization', `Bearer ${token}`);

  if (payload)
    if ('obj' in payload) {
      req.set('Content-Type', 'application/json');
      req.send(payload.obj);
    } else {
      const { fields, files } = payload;

      if (fields) {
        Object.entries(fields).forEach(([key, value]) => {
          if (Object.prototype.hasOwnProperty.call(fields, key)) req.field(key, value);
        });
      }

      if (files)
        files.forEach(({ field, fileDir }) => {
          req.attach(field, fileDir);
        });
    }

  return req;
};

export const register = function register(
  server: Server,
  payload: {
    full_name?: string;
    username?: string;
    password?: string;
    phone_number?: string;
    address?: string;
  },
) {
  return supertestReq({
    server,
    type: 'POST',
    url: '/api/v2/account/register',
    payload: { obj: payload },
  });
};

export const registerMerchant = function registerMerchant(
  server: Server,
  payload: {
    fields?: {
      no_identity?: string;
      market_name?: string;
      market_address?: string;
      market_lat?: number;
      market_lon?: number;
      market_close_time?: string;
    };
    files?: FilesType;
  } = {},
  token?: string,
) {
  const { fields = registerMerchPayload(), files } = payload;

  return supertestReq({
    server,
    type: 'POST',
    url: '/api/v2/account/merchant',
    payload: { fields, files },
    token: token,
  });
};

export const login = function login(
  server: Server,
  payload: { username?: string; password?: string },
) {
  return supertestReq({
    server,
    type: 'POST',
    url: '/api/v2/account/login',
    payload: { obj: payload },
  });
};

export const getProfile = function getProfile(server: Server, token?: string) {
  return supertestReq({
    server,
    token,
    type: 'GET',
    url: '/api/v2/account/me',
  });
};

export const updateProfile = function updateProfile(
  server: Server,
  payload: {
    fields?: { full_name?: string; address?: string; phone_number?: string; password?: string };
    files?: FilesType;
  } = {},
  token?: string,
) {
  const { fields = updateProfilePayload(), files } = payload;

  return supertestReq({
    server,
    type: 'PATCH',
    url: '/api/v2/account/update-profile',
    payload: { fields, files },
    token: token,
  });
};

export const forgotPassword = function forgotPassword(
  server: Server,
  payload: { phone_number?: string },
) {
  return supertestReq({
    server,
    type: 'POST',
    url: '/api/v2/account/forgot-password',
    payload: { obj: payload },
  });
};

export const verifyForgotToken = function verifyForgotToken(server: Server, token?: string) {
  return supertestReq({
    server,
    type: 'PATCH',
    url: `/api/v2/account/verify-token/${token ? token : ''}`,
  });
};

export const resetPassword = function forgotPassword(
  server: Server,
  payload: { token?: string; new_password?: string },
) {
  return supertestReq({
    server,
    type: 'PATCH',
    url: '/api/v2/account/reset-password',
    payload: { obj: payload },
  });
};

export const registration = async function registration() {
  const regPayload = registerPayload();
  const { username, password, phone_number } = regPayload;
  const { token } = await userRegistration(regPayload);

  return { username, password, phone_number, token };
};

export const registerThenLogin = async function registerThenLogin() {
  const { username, password, phone_number } = await registration();
  const { token } = await userLogin({ username, password });

  return { username, phone_number, token };
};

export const registerThenForgotPass = async function registerThenForgotPass() {
  const { username, phone_number } = await registration();
  const { utilId } = await getUser('USERNAME', username);
  const { verification_token } = await createForgotPassword({
    utilId,
    phone: phone_number,
  });

  return { username, verification_token };
};

export const createMercUser = async function createMerAccount() {
  const { username, password, token } = await registration();
  const { utilId } = await getUser('USERNAME', username);
  const [identityPhoto, marketPhoto] = await createImgs(['a', 'b']);

  await createMerchant({
    ...registerMerchPayload(),
    id_identity_photo: identityPhoto.id,
    id_market_photo: marketPhoto.id,
    id_u_user: utilId,
  });

  return { username, password, token };
};
