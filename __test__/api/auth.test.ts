import type { Server } from 'http';
import type { FastifyInstance } from 'fastify';
import supertest from 'supertest';
import app from '../../src/config/app';

let appServer: null | FastifyInstance = null;
let server: null | Server = null;

const userRegistration = (payload: {
  full_name: string;
  username: string;
  password: string;
  phone_number: string;
  address: string;
}) =>
  supertest(server)
    .post('/api/v2/auth/register')
    .set('Content-Type', 'application/json')
    .send(payload);

const userLogin = (payload: { username: string; password: string }) =>
  supertest(server)
    .post('/api/v2/auth/login')
    .set('Content-Type', 'application/json')
    .send(payload);

const userProfile = (token?: string) => {
  const req = supertest(server).get('/api/v2/auth/me');

  if (token) req.set('authorization', `Bearer ${token}`);

  return req;
};

beforeAll(async () => {
  appServer = app();
  appServer.ready();
  server = appServer.server;
});

afterAll(() => {
  return appServer.close();
});

describe('Registration', () => {
  test('Register Success', async () => {
    /**
     * NOTE: Generate random string/characters in JavaScript
     * https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
     */
    const payload = {
      full_name: 'Name',
      username: Math.random().toString(36).substring(2),
      password: 'password',
      phone_number: Date.now().toString(),
      address: 'address',
    };

    const { status, headers, body } = await userRegistration(payload);

    const contenType = headers['content-type'];
    const isSuccess = body.success;
    expect(status).toBe(200);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(true);
  });

  test('Register Fail, Phone Number Already Exist', async () => {
    const phone_number = Date.now().toString();
    const payload = {
      phone_number,
      full_name: 'Name',
      username: Math.random().toString(36).substring(2),
      password: 'password',
      address: 'address',
    };
    const { body: regBody } = await userRegistration(payload);
    expect(regBody.success).toBe(true);

    const newPayload = {
      ...payload,
      username: Math.random().toString(36).substring(2),
      phone_number,
    };
    const { status, headers, body } = await userRegistration(newPayload);

    const contenType = headers['content-type'];
    const isSuccess = body.success;
    expect(status).toBe(400);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(false);
  });

  test('Register Fail, Username Already Exist', async () => {
    const username = Math.random().toString(36).substring(2);
    const payload = {
      username,
      full_name: 'Name',
      password: 'password',
      phone_number: Date.now().toString(),
      address: 'address',
    };
    const { body: regBody } = await userRegistration(payload);
    expect(regBody.success).toBe(true);

    const newPayload = {
      ...payload,
      username,
      phone_number: Date.now().toString(),
    };
    const { status, headers, body } = await userRegistration(newPayload);

    const contenType = headers['content-type'];
    const isSuccess = body.success;
    expect(status).toBe(400);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(false);
  });

  test('Register Fail, Empty Name', async () => {
    const payload = {
      full_name: '',
      username: Math.random().toString(36).substring(2),
      password: 'password',
      phone_number: Date.now().toString(),
      address: 'address',
    };

    const { status, headers, body } = await userRegistration(payload);

    const contenType = headers['content-type'];
    const isSuccess = body.success;
    expect(status).toBe(422);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(false);
  });

  test('Register Fail, Empty Address', async () => {
    const payload = {
      full_name: 'Name',
      username: Math.random().toString(36).substring(2),
      password: 'password',
      phone_number: Date.now().toString(),
      address: '',
    };

    const response = await userRegistration(payload);

    const statusCode = response.status;
    const contenType = response.headers['content-type'];
    const isSuccess = response.body.success;
    expect(statusCode).toBe(422);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(false);
  });
});

describe('Login', () => {
  test('Login Success', async () => {
    const username = Math.random().toString(36).substring(2);
    const password = 'password';
    const payload = {
      username,
      password,
      full_name: 'Name',
      phone_number: Date.now().toString(),
      address: 'address',
    };
    const { body: regBody } = await userRegistration(payload);
    expect(regBody.success).toBe(true);

    const { status, headers, body } = await userLogin({ username, password });

    const contenType = headers['content-type'];
    const isSuccess = body.success;
    expect(status).toBe(200);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(true);
  });

  test('Login Failed, Wrong Password', async () => {
    const username = Math.random().toString(36).substring(2);
    const payload = {
      username,
      full_name: 'Name',
      password: 'password',
      phone_number: Date.now().toString(),
      address: 'address',
    };
    const { body: regBody } = await userRegistration(payload);
    expect(regBody.success).toBe(true);

    const wrongPassword = 'wrong-password';
    const { status, headers, body } = await userLogin({
      username,
      password: wrongPassword,
    });

    const contenType = headers['content-type'];
    const isSuccess = body.success;
    expect(status).toBe(400);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(false);
  });

  test('Login Failed, User Not Registered', async () => {
    const wrongUsername = 'this-username-doesnt-exist';
    const wrongPasssword = 'just-random-password';

    const { status, headers, body } = await userLogin({
      username: wrongUsername,
      password: wrongPasssword,
    });

    const contenType = headers['content-type'];
    const isSuccess = body.success;
    expect(status).toBe(400);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(false);
  });
});

describe('Get Profile', () => {
  test('Get Profile Success', async () => {
    const username = Math.random().toString(36).substring(2);
    const password = 'password';
    const payload = {
      username,
      password,
      full_name: 'Name',
      phone_number: Date.now().toString(),
      address: 'address',
    };
    const { body: regBody } = await userRegistration(payload);
    expect(regBody.success).toBe(true);

    const { body: logBody } = await userLogin({ username, password });
    expect(logBody.success).toBe(true);
    const token = logBody.data.token;

    const { status, headers, body } = await userProfile(token);

    const contenType = headers['content-type'];
    const isSuccess = body.success;
    expect(status).toBe(200);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(true);
  });

  test('Get Profile Failed, Wrong API Key', async () => {
    const authorization = 'this-is-wrong-token';

    const { status, headers, body } = await userProfile(authorization);

    const contenType = headers['content-type'];
    const isSuccess = body.success;
    expect(status).toBe(403);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(false);
  });

  test('Get Profile Failed, API Key Not Given', async () => {
    const authorization = undefined;

    const { status, headers, body } = await userProfile(authorization);

    const contenType = headers['content-type'];
    const isSuccess = body.success;
    expect(status).toBe(403);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(false);
  });
});
