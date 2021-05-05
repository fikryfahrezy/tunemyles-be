import type { Server } from 'http';
import type { ReadStream } from 'fs';
import fs from 'fs';
import supertest from 'supertest';
import app from '../../src/config/app';
import sequelize from '../../src/databases/sequelize';
import { verifyToken } from '../../src/api/utils/jwt';
import { userRegistration, userLogin, updateUserProfile } from '../../src/api/routes/auth/service';

const setUpServer = async function setUpServer() {
  const appServer = app();
  await appServer.ready();
  const server = appServer.server;

  return { appServer, server };
};

const register = function register(
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

const login = function login(server: Server, payload: { username?: string; password?: string }) {
  return supertest(server)
    .post('/api/v2/auth/login')
    .set('Content-Type', 'application/json')
    .send(payload);
};

const getProfile = function getProfile(server: Server, token?: string) {
  const req = supertest(server).get('/api/v2/auth/me');

  if (token) req.set('authorization', `Bearer ${token}`);

  return req;
};

const updateUser = function updateUser(
  server: Server,
  payload: {
    token?: string;
    fields?: { full_name?: string; address?: string; phone_number?: string };
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
    .put('/api/v2/auth/update-profile')
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

const forgotPassword = function forgotPassword(server: Server, payload: { phone_number?: string }) {
  return supertest(server).post('/api/v2/auth/forgot-password').send(payload);
};

const registerPayload = function registerPayload() {
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

beforeAll(() => sequelize.authenticate());

afterAll(() => sequelize.close());

describe('Registration', () => {
  test('Register Success', async () => {
    const { appServer, server } = await setUpServer();
    const payload = registerPayload();

    const { status, headers, body } = await register(server, payload);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);

    appServer.close();
  });

  test('Register Fail, Phone Number Already Exist', async () => {
    const { appServer, server } = await setUpServer();
    const payload = registerPayload();
    const phone_number = Date.now().toString();
    await userRegistration({ ...payload, phone_number });

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
    const payload = registerPayload();
    const { username } = payload;
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
    const payload = registerPayload();
    const full_name = '';

    const { status, headers, body } = await register(server, { ...payload, full_name });

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Register Fail, Empty Address', async () => {
    const { appServer, server } = await setUpServer();
    const payload = registerPayload();
    const address = '';

    const { status, headers, body } = await register(server, { ...payload, address });

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Register Fail, Name too Short', async () => {
    const { appServer, server } = await setUpServer();
    const payload = registerPayload();
    const full_name = 'x';

    const { status, headers, body } = await register(server, { ...payload, full_name });

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Register Fail, Name too Long', async () => {
    const { appServer, server } = await setUpServer();
    const payload = registerPayload();
    const full_name = Array(257).toString();

    const { status, headers, body } = await register(server, { ...payload, full_name });

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Register Fail, Username too Short', async () => {
    const { appServer, server } = await setUpServer();
    const payload = registerPayload();
    const username = Math.random().toString(36).substring(7);

    const { status, headers, body } = await register(server, { ...payload, username });

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Register Fail, Username too Long', async () => {
    const { appServer, server } = await setUpServer();
    const payload = registerPayload();
    const username = Array(22).toString();

    const { status, headers, body } = await register(server, { ...payload, username });

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Register Fail, Phone Number too Short', async () => {
    const { appServer, server } = await setUpServer();
    const payload = registerPayload();
    const phone_number = '1234';

    const { status, headers, body } = await register(server, { ...payload, phone_number });

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Register Fail, Phone Number too Long', async () => {
    const { appServer, server } = await setUpServer();
    const payload = registerPayload();
    const phone_number = '123456789012345';

    const { status, headers, body } = await register(server, { ...payload, phone_number });

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Register Fail, Address too Short', async () => {
    const { appServer, server } = await setUpServer();
    const payload = registerPayload();
    const address = 'addr';

    const { status, headers, body } = await register(server, { ...payload, address });

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Register Fail, Address too Long', async () => {
    const { appServer, server } = await setUpServer();
    const payload = registerPayload();
    const address = Array(1002).toString();

    const { status, headers, body } = await register(server, { ...payload, address });

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Register Fail, No Data Provided', async () => {
    const { appServer, server } = await setUpServer();

    const { status, headers, body } = await register(server, {});

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });
});

describe('Login', () => {
  test('Login Success', async () => {
    const { appServer, server } = await setUpServer();
    const regPayload = registerPayload();
    const { username, password } = regPayload;
    await userRegistration(regPayload);

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
    const regPayload = registerPayload();
    const { username } = regPayload;
    await userRegistration(regPayload);
    const password = 'wrong-password';

    const { status, headers, body } = await login(server, {
      username,
      password,
    });

    expect(status).toBe(400);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Login Failed, User Not Registered', async () => {
    const { appServer, server } = await setUpServer();
    const username = 'this-username-doesnt-exist';
    const password = 'just-random-password';

    const { status, headers, body } = await login(server, {
      username,
      password,
    });

    expect(status).toBe(400);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Login Failed, No Data Provided', async () => {
    const { appServer, server } = await setUpServer();

    const { status, headers, body } = await login(server, {});

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });
});

describe('Get Profile', () => {
  test('Get Profile Success', async () => {
    const { appServer, server } = await setUpServer();
    const regPayload = registerPayload();
    const { username, password } = regPayload;
    await userRegistration(regPayload);
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
  test('Update Profile Success, and Add New Profile Image', async () => {
    const { appServer, server } = await setUpServer();
    const regPayload = registerPayload();
    const { username, password } = regPayload;
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

    const { status, headers, body } = await updateUser(server, updatePayload);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);

    appServer.close();
  });

  test('Update Profile Success, and Update Profile Image', async () => {
    const { appServer, server } = await setUpServer();
    const regPayload = registerPayload();
    const { username, password } = regPayload;
    await userRegistration(regPayload);
    const { token } = await userLogin({ username, password });
    const file = fs.createReadStream('./__test__/image-test.png');
    const updatePayload = {
      token,
      fields: {
        full_name: 'New Full Name',
        address: 'New Address',
        phone_number: Date.now().toString(),
      },
      files: [{ file, field: 'avatar' }],
    };
    await updateUserProfile(verifyToken('USER', `Bearer ${token}`), {
      ...updatePayload.fields,
      avatar: [
        {
          data: fs.readFileSync('./__test__/image-test.png'),
          limit: false,
          encoding: '7bit',
          filename: 'image-test.png',
          mimetype: 'image/png',
        },
      ],
    });

    const { status, headers, body } = await updateUser(server, updatePayload);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);

    appServer.close();
  });

  test('Update Profile Failed, Wrong API Key', async () => {
    const { appServer, server } = await setUpServer();
    const authorization = 'this-is-wrong-token';

    const { status, headers, body } = await updateUser(server, {
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

    const { status, headers, body } = await updateUser(server);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Update Profile Failed, Name too Short', async () => {
    const { appServer, server } = await setUpServer();
    const regPayload = registerPayload();
    const { username, password } = regPayload;
    await userRegistration(regPayload);
    const { token } = await userLogin({ username, password });
    const updatePayload = {
      token,
      fields: {
        full_name: 'x',
      },
    };

    const { status, headers, body } = await updateUser(server, updatePayload);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Update Profile Failed, Name too Long', async () => {
    const { appServer, server } = await setUpServer();
    const regPayload = registerPayload();
    const { username, password } = regPayload;
    await userRegistration(regPayload);
    const { token } = await userLogin({ username, password });
    const updatePayload = {
      token,
      fields: {
        full_name: Array(257).toString(),
      },
    };

    const { status, headers, body } = await updateUser(server, updatePayload);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Update Profile Failed, Phone Number too Short', async () => {
    const { appServer, server } = await setUpServer();
    const regPayload = registerPayload();
    const { username, password } = regPayload;
    await userRegistration(regPayload);
    const { token } = await userLogin({ username, password });
    const updatePayload = {
      token,
      fields: {
        phone_number: '1234',
      },
    };

    const { status, headers, body } = await updateUser(server, updatePayload);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Update Profile Failed, Phone Number too Long', async () => {
    const { appServer, server } = await setUpServer();
    const regPayload = registerPayload();
    const { username, password } = regPayload;
    await userRegistration(regPayload);
    const { token } = await userLogin({ username, password });
    const updatePayload = {
      token,
      fields: {
        phone_number: '123456789012345',
      },
    };

    const { status, headers, body } = await updateUser(server, updatePayload);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Update Profile Failed, Address too Short', async () => {
    const { appServer, server } = await setUpServer();
    const regPayload = registerPayload();
    const { username, password } = regPayload;
    await userRegistration(regPayload);
    const { token } = await userLogin({ username, password });
    const updatePayload = {
      token,
      fields: {
        address: 'addr',
      },
    };

    const { status, headers, body } = await updateUser(server, updatePayload);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Update Profile Failed, Address too Long', async () => {
    const { appServer, server } = await setUpServer();
    const regPayload = registerPayload();
    const { username, password } = regPayload;
    await userRegistration(regPayload);
    const { token } = await userLogin({ username, password });
    const updatePayload = {
      token,
      fields: {
        address: Array(1002).toString(),
      },
    };

    const { status, headers, body } = await updateUser(server, updatePayload);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });
});

describe('Forgot Password', () => {
  test('Request Forgot Password Success', async () => {
    const { appServer, server } = await setUpServer();
    const regPayload = registerPayload();
    const { username, password, phone_number } = regPayload;
    await userRegistration(regPayload);
    await userLogin({ username, password });
    const payload = { phone_number };

    const { status, headers, body } = await forgotPassword(server, payload);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);

    appServer.close();
  });

  test('Request Forgot Failed, Number not Registered', async () => {
    const { appServer, server } = await setUpServer();
    const payload = { phone_number: '6991224220261' };

    const { status, headers, body } = await forgotPassword(server, payload);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);

    appServer.close();
  });

  test('Request Forgot Password, Request Empty', async () => {
    const { appServer, server } = await setUpServer();

    const { status, headers, body } = await forgotPassword(server, {});

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });
});

//describe('Verify Token', () => {});

//describe('Reset Password', () => {});
