import type { Server } from 'http';
import type { ReadStream } from 'fs';
import fs from 'fs';
import supertest from 'supertest';
import app from '../../src/config/app';
import sequelize from '../../src/databases/sequelize';
import { userRegistration, userLogin } from '../../src/api/routes/auth/service';

const setUpServer = async function setUpServer() {
  const appServer = app();
  await appServer.ready();
  const server = appServer.server;

  return { appServer, server };
};

const register = (
  server: Server,
  payload: {
    full_name: string;
    username: string;
    password: string;
    phone_number: string;
    address: string;
  }
) =>
  supertest(server)
    .post('/api/v2/auth/register')
    .set('Content-Type', 'application/json')
    .send(payload);

const login = (
  server: Server,
  payload: { username: string; password: string }
) =>
  supertest(server)
    .post('/api/v2/auth/login')
    .set('Content-Type', 'application/json')
    .send(payload);

const getProfile = (server: Server, token?: string) => {
  const req = supertest(server).get('/api/v2/auth/me');

  if (token) req.set('authorization', `Bearer ${token}`);

  return req;
};

const resetPw = (
  server: Server,
  payload: {
    token?: string;
    fields?: { full_name: string; address: string; phone_number: string };
    files?: { field: string; file: ReadStream }[];
  } = {}
) => {
  const {
    token,
    fields = { full_name: '', address: '', phone_number: '' },
    files,
  } = payload;
  const req = supertest(server)
    .put('/api/v2/auth/update-profile')
    .set('authorization', `Bearer ${token}`)
    .set('Content-Type', 'multipart/form-data');

  if (fields) {
    Object.entries(fields).forEach(([key, value]) => {
      req.field(key, value);
    });
  }

  if (files)
    files.forEach(({ field, file }) => {
      req.attach(field, file);
    });

  return req;
};

beforeAll(() => sequelize.authenticate());

afterAll(() => sequelize.close());

describe('Registration', () => {
  test('Register Success', async () => {
    const { appServer, server } = await setUpServer();

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

    const { status, headers, body } = await register(server, payload);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);

    appServer.close();
  });

  test('Register Fail, Phone Number Already Exist', async () => {
    const { appServer, server } = await setUpServer();
    const phone_number = Date.now().toString();
    const payload = {
      phone_number,
      full_name: 'Name',
      username: Math.random().toString(36).substring(2),
      password: 'password',
      address: 'address',
    };
    await userRegistration(payload);

    const newPayload = {
      ...payload,
      username: Math.random().toString(36).substring(2),
      phone_number,
    };
    const { status, headers, body } = await register(server, newPayload);

    expect(status).toBe(400);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Register Fail, Username Already Exist', async () => {
    const { appServer, server } = await setUpServer();
    const username = Math.random().toString(36).substring(2);
    const payload = {
      username,
      full_name: 'Name',
      password: 'password',
      phone_number: Date.now().toString(),
      address: 'address',
    };
    await userRegistration(payload);

    const newPayload = {
      ...payload,
      username,
      phone_number: Date.now().toString(),
    };
    const { status, headers, body } = await register(server, newPayload);

    expect(status).toBe(400);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Register Fail, Empty Name', async () => {
    const { appServer, server } = await setUpServer();
    const payload = {
      full_name: '',
      username: Math.random().toString(36).substring(2),
      password: 'password',
      phone_number: Date.now().toString(),
      address: 'address',
    };

    const { status, headers, body } = await register(server, payload);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Register Fail, Empty Address', async () => {
    const { appServer, server } = await setUpServer();
    const payload = {
      full_name: 'Name',
      username: Math.random().toString(36).substring(2),
      password: 'password',
      phone_number: Date.now().toString(),
      address: '',
    };

    const { status, headers, body } = await register(server, payload);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });
});

describe('Login', () => {
  test('Login Success', async () => {
    const { appServer, server } = await setUpServer();
    const username = Math.random().toString(36).substring(2);
    const password = 'password';
    const payload = {
      username,
      password,
      full_name: 'Name',
      phone_number: Date.now().toString(),
      address: 'address',
    };
    await userRegistration(payload);

    const { status, headers, body } = await login(server, {
      username,
      password,
    });

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);

    appServer.close();
  });

  test('Login Failed, Wrong Password', async () => {
    const { appServer, server } = await setUpServer();
    const username = Math.random().toString(36).substring(2);
    const payload = {
      username,
      full_name: 'Name',
      password: 'password',
      phone_number: Date.now().toString(),
      address: 'address',
    };
    await userRegistration(payload);

    const wrongPassword = 'wrong-password';
    const { status, headers, body } = await login(server, {
      username,
      password: wrongPassword,
    });

    expect(status).toBe(400);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Login Failed, User Not Registered', async () => {
    const { appServer, server } = await setUpServer();
    const wrongUsername = 'this-username-doesnt-exist';
    const wrongPasssword = 'just-random-password';

    const { status, headers, body } = await login(server, {
      username: wrongUsername,
      password: wrongPasssword,
    });

    expect(status).toBe(400);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });
});

describe('Get Profile', () => {
  test('Get Profile Success', async () => {
    const { appServer, server } = await setUpServer();
    const username = Math.random().toString(36).substring(2);
    const password = 'password';
    const payload = {
      username,
      password,
      full_name: 'Name',
      phone_number: Date.now().toString(),
      address: 'address',
    };
    await userRegistration(payload);
    const { token } = await userLogin({ username, password });

    const { status, headers, body } = await getProfile(server, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);

    appServer.close();
  });

  test('Get Profile Failed, Wrong API Key', async () => {
    const { appServer, server } = await setUpServer();
    const authorization = 'this-is-wrong-token';

    const { status, headers, body } = await getProfile(server, authorization);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Get Profile Failed, API Key Not Given', async () => {
    const { appServer, server } = await setUpServer();
    const authorization = undefined;

    const { status, headers, body } = await getProfile(server, authorization);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });
});

describe('Update Profile', () => {
  test('Update Profile Success', async () => {
    const { appServer, server } = await setUpServer();
    const username = Math.random().toString(36).substring(2);
    const password = 'password';
    const regPayload = {
      username,
      password,
      full_name: 'Name',
      phone_number: Date.now().toString(),
      address: 'address',
    };
    const file = fs.createReadStream('./__test__/image-test.png');
    await userRegistration(regPayload);
    const { token } = await userLogin({ username, password });
    const updatePayload = {
      token,
      fields: {
        full_name: 'New Full Name',
        address: 'New Address',
        phone_number: Date.now().toString(),
      },
      files: [{ file, field: 'avatar' }],
    };

    const { status, headers, body } = await resetPw(server, updatePayload);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);

    appServer.close();
  });

  test('Update Profile Failed, Wrong API Key', async () => {
    const { appServer, server } = await setUpServer();
    const authorization = 'this-is-wrong-token';

    const { status, headers, body } = await resetPw(server, {
      token: authorization,
    });

    const contenType = headers['content-type'];
    const isSuccess = body.success;
    expect(status).toBe(403);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(false);

    appServer.close();
  });

  test('Update Profile Failed, API Key Not Given', async () => {
    const { appServer, server } = await setUpServer();

    const { status, headers, body } = await resetPw(server);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });
});

//describe('Forgot Password', () => {});

//describe('Verify Token', () => {});

//describe('Reset Password', () => {});
