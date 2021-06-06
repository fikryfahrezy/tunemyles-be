import type { Server } from 'http';
import type { ReadStream } from 'fs';
import supertest from 'supertest';
import app from '../../src/config/app';
import { userRegistration, userLogin } from '../../src/api/routes/auth/service';
import { getUser, createForgotPassword } from '../../src/api/repositories/UserRepository';

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
    .post('/api/v2/auth/register')
    .set('Content-Type', 'application/json')
    .send(payload);
};

export const login = function login(
  server: Server,
  payload: { username?: string; password?: string },
) {
  return supertest(server)
    .post('/api/v2/auth/login')
    .set('Content-Type', 'application/json')
    .send(payload);
};

export const getProfile = function getProfile(server: Server, token?: string) {
  const req = supertest(server).get('/api/v2/auth/me');

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
  const {
    token,
    fields = {
      full_name: 'Name',
      address: 'Address',
      phone_number: '12345678901234',
    },
    files,
  } = payload;
  const req = supertest(server)
    .patch('/api/v2/auth/update-profile')
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
  return supertest(server).post('/api/v2/auth/forgot-password').send(payload);
};

export const verifyForgotToken = function verifyForgotToken(server: Server, token?: string) {
  const url = `/api/v2/auth/verify-token/${token ? token : ''}`;

  return supertest(server).patch(url);
};

export const resetPassword = function forgotPassword(
  server: Server,
  payload: { token?: string; new_password?: string },
) {
  return supertest(server).patch('/api/v2/auth/reset-password').send(payload);
};

export const registration = async function registration() {
  const regPayload = registerPayload();
  const { username, password, phone_number } = regPayload;
  await userRegistration(regPayload);

  return { username, password, phone_number };
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
