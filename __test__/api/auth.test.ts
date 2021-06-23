import type { Server } from 'http';
import type { FastifyInstance } from 'fastify';
import app from '../../src/config/app';
import sequelize from '../../src/databases/sequelize';
import { createUserImg, updateUser, getUser } from '../../src/api/repositories/UserRepository';
import {
  userRegistration,
  userLogin,
  resetUserPassword,
  verifyUserToken,
} from '../../src/api/routes/account/service';
import {
  registerPayload,
  registerMerchPayload,
  updateProfilePayload,
  register,
  registerMerchant,
  login,
  getProfile,
  updateProfile,
  forgotPassword,
  verifyForgotToken,
  resetPassword,
  registration,
  registerThenLogin,
  registerThenForgotPass,
  createMercUser,
} from '../component';

let server: Server = null;
let appServer: FastifyInstance = null;

beforeAll(async () => {
  await sequelize.authenticate();
  appServer = app();
  await appServer.ready();
  server = appServer.server;
});

afterAll(async () => {
  await appServer.close();
  await sequelize.close();
});

describe('Register', () => {
  const payload = registerPayload();

  test('Success', async () => {
    const { status, headers, body } = await register(server, payload);

    expect(status).toBe(201);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, `phone_number` Already Exist', async () => {
    const payload = registerPayload();
    const phoneNumber = Date.now().toString();
    await userRegistration({ ...payload, phone_number: phoneNumber });

    const newPayload = {
      ...payload,
      username: Math.random().toString(36).substring(2),
      phone_number: phoneNumber,
    };

    const { status, headers, body } = await register(server, newPayload);

    expect(status).toBe(400);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, `username` Already Exist', async () => {
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
  });

  test('Fail, Empty `full_name`', async () => {
    const fullName = '';

    const { status, headers, body } = await register(server, { ...payload, full_name: fullName });

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Empty `address`', async () => {
    const address = '';

    const { status, headers, body } = await register(server, { ...payload, address });

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, `full_name` too Short', async () => {
    const fullName = 'x';

    const { status, headers, body } = await register(server, { ...payload, full_name: fullName });

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, `full_name` too Long', async () => {
    const fullName = Array(257).toString();

    const { status, headers, body } = await register(server, { ...payload, full_name: fullName });

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, `username` too Short', async () => {
    const username = Math.random().toString(36).substring(7);

    const { status, headers, body } = await register(server, { ...payload, username });

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, `username` too Long', async () => {
    const username = Array(22).toString();

    const { status, headers, body } = await register(server, { ...payload, username });

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, `phone_number` too Short', async () => {
    const phoneNumber = '1234';

    const { status, headers, body } = await register(server, {
      ...payload,
      phone_number: phoneNumber,
    });

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, `phone_number` too Long', async () => {
    const phoneNumber = '123456789012345';

    const { status, headers, body } = await register(server, {
      ...payload,
      phone_number: phoneNumber,
    });

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, `address` too Short', async () => {
    const address = 'addr';

    const { status, headers, body } = await register(server, { ...payload, address });

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, `address` too Long', async () => {
    const address = Array(1002).toString();

    const { status, headers, body } = await register(server, { ...payload, address });

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, No Data Provided', async () => {
    const { status, headers, body } = await register(server, {});

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Activate Merchant', () => {
  const payload = registerMerchPayload();

  test('Success', async () => {
    const { token } = await registration();
    const payload = registerMerchPayload();

    const { status, headers, body } = await registerMerchant(server, payload, token);

    expect(status).toBe(201);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, User Already Merchant Identified by User ID', async () => {
    const { token } = await createMercUser();
    const payload = registerMerchPayload();

    const { status, headers, body } = await registerMerchant(server, payload, token);

    expect(status).toBe(400);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, User Already Merchant Identified by Token Type', async () => {
    const { username, password } = await createMercUser();
    const { token } = await userLogin({ username, password });

    const { status, headers, body } = await registerMerchant(server, payload, token);

    expect(status).toBe(400);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, No Data Provided', async () => {
    const { token } = await registration();

    const { status, headers, body } = await registerMerchant(server, { fields: {} }, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Token Invalid', async () => {
    const token = 'invalid-token';

    const { status, headers, body } = await registerMerchant(server, payload, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, No Token Provided', async () => {
    const { status, headers, body } = await registerMerchant(server, payload);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Login', () => {
  test('Success', async () => {
    const { username, password } = await registration();

    const { status, headers, body } = await login(server, {
      username,
      password,
    });

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Wrong `password`', async () => {
    const { username } = await registration();
    const password = 'wrong-password';

    const { status, headers, body } = await login(server, {
      username,
      password,
    });

    expect(status).toBe(400);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, User Not Registered', async () => {
    const username = 'this-username-doesnt-exist';
    const password = 'just-random-password';

    const { status, headers, body } = await login(server, {
      username,
      password,
    });

    expect(status).toBe(400);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, No `username` Provided', async () => {
    const { status, headers, body } = await login(server, { username: 'username' });

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, No `password` Provided', async () => {
    const { status, headers, body } = await login(server, { password: 'password' });

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Profile', () => {
  test('Success', async () => {
    const { token } = await registerThenLogin();

    const { status, headers, body } = await getProfile(server, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';

    const { status, headers, body } = await getProfile(server, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const { status, headers, body } = await getProfile(server);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Update Profile', () => {
  const payload = updateProfilePayload();

  test('Success, Add New Profile Image', async () => {
    const { token } = await registerThenLogin();
    const payload = updateProfilePayload();

    const { status, headers, body } = await updateProfile(server, payload, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, Update Profile Image', async () => {
    const { token, username } = await registerThenLogin();
    const payload = updateProfilePayload();
    const [{ id: userId }, { id: imgId }] = await Promise.all([
      getUser('USERNAME', username),
      createUserImg(`${username}-not-valid.jpg`),
    ]);
    await updateUser(userId, { id_photo: imgId });

    const { status, headers, body } = await updateProfile(server, payload, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, `full_name` too Short', async () => {
    const { token } = await registerThenLogin();
    const updatePayload = {
      fields: {
        full_name: 'x',
      },
    };

    const { status, headers, body } = await updateProfile(server, updatePayload, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, `full_name` too Long', async () => {
    const { token } = await registerThenLogin();
    const updatePayload = {
      fields: {
        full_name: Array(257).toString(),
      },
    };

    const { status, headers, body } = await updateProfile(server, updatePayload, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, `phone_number` too Short', async () => {
    const { token } = await registerThenLogin();
    const updatePayload = {
      fields: {
        phone_number: '1234',
      },
    };

    const { status, headers, body } = await updateProfile(server, updatePayload, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, `phone_number` too Long', async () => {
    const { token } = await registerThenLogin();
    const updatePayload = {
      fields: {
        phone_number: '123456789012345',
      },
    };

    const { status, headers, body } = await updateProfile(server, updatePayload, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, `address` too Short', async () => {
    const { token } = await registerThenLogin();
    const updatePayload = {
      fields: {
        address: 'addr',
      },
    };

    const { status, headers, body } = await updateProfile(server, updatePayload, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, `address` too Long', async () => {
    const { token } = await registerThenLogin();
    const updatePayload = {
      fields: {
        address: Array(1002).toString(),
      },
    };

    const { status, headers, body } = await updateProfile(server, updatePayload, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, `password` too Short', async () => {
    const { token } = await registerThenLogin();
    const updatePayload = {
      fields: {
        password: 'pass',
      },
    };

    const { status, headers, body } = await updateProfile(server, updatePayload, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, `password` too Long', async () => {
    const { token } = await registerThenLogin();
    const updatePayload = {
      fields: {
        password: Array(257).toString(),
      },
    };

    const { status, headers, body } = await updateProfile(server, updatePayload, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';

    const { status, headers, body } = await updateProfile(server, payload, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const { status, headers, body } = await updateProfile(server, payload);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Forgot Password', () => {
  test('Success', async () => {
    const { phone_number } = await registerThenLogin();
    const payload = { phone_number };

    const { status, headers, body } = await forgotPassword(server, payload);

    expect(status).toBe(201);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, `phone_number` Not Registered', async () => {
    const payload = { phone_number: '6991224220261' };

    const { status, headers, body } = await forgotPassword(server, payload);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, No `phone_number` Provided', async () => {
    const { status, headers, body } = await forgotPassword(server, {});

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Verify Forgot Password Token', () => {
  test('Success', async () => {
    const { verification_token } = await registerThenForgotPass();
    const { status, headers, body } = await verifyForgotToken(server, verification_token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Token Invalid', async () => {
    const wrongToken = 'this-token-not-exist';

    const { status, headers, body } = await verifyForgotToken(server, wrongToken);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, No Token Provided', async () => {
    const { status, headers, body } = await verifyForgotToken(server);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Reset Password', () => {
  test('Success', async () => {
    const { username, verification_token } = await registerThenForgotPass();
    await verifyUserToken({ token: verification_token });
    const payload = {
      token: verification_token,
      new_password: 'newpassword',
    };
    await resetUserPassword(payload);

    const { status, headers, body } = await login(server, {
      username: username,
      password: payload.new_password,
    });

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, `token` Invalid', async () => {
    const payload = {
      token: 'this-token-not-exists',
      new_password: 'newpassword',
    };

    const { status, headers, body } = await resetPassword(server, payload);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, `password` too Short', async () => {
    const { verification_token } = await registerThenForgotPass();
    await verifyUserToken({ token: verification_token });
    const payload = {
      token: verification_token,
      new_password: 'short',
    };

    const { status, headers, body } = await resetPassword(server, payload);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, `new_password` too Long', async () => {
    const { verification_token } = await registerThenForgotPass();
    await verifyUserToken({ token: verification_token });
    const payload = {
      token: verification_token,
      new_password: Array(257).toString(),
    };

    const { status, headers, body } = await resetPassword(server, payload);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, No `token` Provided', async () => {
    const payload = { new_password: 'newpassword' };

    const { status, headers, body } = await resetPassword(server, payload);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, No `new_password` Provided', async () => {
    const payload = { token: 'this-token-not-exists' };

    const { status, headers, body } = await resetPassword(server, payload);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});
