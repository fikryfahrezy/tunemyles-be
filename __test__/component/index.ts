import type { Server } from 'http';
import type { ReadStream } from 'fs';
import supertest from 'supertest';
import app from '../../src/config/app';
import { userRegistration, userLogin } from '../../src/api/routes/account/service';
import {
  getUser,
  createForgotPassword,
  createImgs,
  createMerchant,
} from '../../src/api/repositories/UserRepository';

export const setUpServer = async function setUpServer() {
  const appServer = app();
  await appServer.ready();
  const server = appServer.server;

  return { appServer, server };
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
  return supertest(server)
    .post('/api/v2/account/register')
    .set('Content-Type', 'application/json')
    .send(payload);
};

export const registerMerchant = function registerMerchant(
  server: Server,
  payload: {
    token?: string;
    fields?: {
      no_identity?: string;
      market_name?: string;
      market_address?: string;
      market_lat?: number;
      market_lon?: number;
      market_close_time?: string;
    };
    files?: { field: string; file: ReadStream }[];
  } = {},
) {
  const { token, fields = registerMerchPayload(), files } = payload;
  const req = supertest(server)
    .post('/api/v2/account/merchant')
    .set('authorization', `Bearer ${token}`)
    .set('Content-Type', 'multipart/form-data');

  if (fields) {
    Object.entries(fields).forEach(([key, value]) => {
      if (Object.prototype.hasOwnProperty.call(fields, key)) req.field(key, value);
    });
  }

  if (files)
    files.forEach(({ field, file }) => {
      req.attach(field, file);
    });

  return req;
};

export const login = function login(
  server: Server,
  payload: { username?: string; password?: string },
) {
  return supertest(server)
    .post('/api/v2/account/login')
    .set('Content-Type', 'application/json')
    .send(payload);
};

export const getProfile = function getProfile(server: Server, token?: string) {
  const req = supertest(server).get('/api/v2/account/me');

  if (token) req.set('authorization', `Bearer ${token}`);

  return req;
};

export const updateProfile = function updateProfile(
  server: Server,
  payload: {
    token?: string;
    fields?: { full_name?: string; address?: string; phone_number?: string; password?: string };
    files?: { field: string; file: ReadStream }[];
  } = {},
) {
  const { token, fields = updateProfilePayload(), files } = payload;
  const req = supertest(server)
    .patch('/api/v2/account/update-profile')
    .set('authorization', `Bearer ${token}`)
    .set('Content-Type', 'multipart/form-data');

  if (fields) {
    Object.entries(fields).forEach(([key, value]) => {
      if (Object.prototype.hasOwnProperty.call(fields, key)) req.field(key, value);
    });
  }

  if (files)
    files.forEach(({ field, file }) => {
      req.attach(field, file);
    });

  return req;
};

export const forgotPassword = function forgotPassword(
  server: Server,
  payload: { phone_number?: string },
) {
  return supertest(server).post('/api/v2/account/forgot-password').send(payload);
};

export const verifyForgotToken = function verifyForgotToken(server: Server, token?: string) {
  const url = `/api/v2/account/verify-token/${token ? token : ''}`;

  return supertest(server).patch(url);
};

export const resetPassword = function forgotPassword(
  server: Server,
  payload: { token?: string; new_password?: string },
) {
  return supertest(server).patch('/api/v2/account/reset-password').send(payload);
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
