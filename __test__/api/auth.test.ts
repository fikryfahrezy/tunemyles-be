import { FastifyInstance } from 'fastify';
import app from '../src/app';

let server: null | FastifyInstance = null;

const userRegistration = (payload: Record<string, unknown>) =>
  server.inject({
    method: 'POST',
    url: '/api/v2/auth/register',
    headers: {
      'content-type': 'application/json',
    },
    payload,
  });

const userLogin = (username: string, password: string) =>
  server.inject({
    method: 'POST',
    url: '/api/v2/auth/login',
    headers: {
      'content-type': 'application/json',
    },
    payload: {
      username,
      password,
    },
  });

const userProfile = (authorization?: string) => {
  const headers = { authorization };
  if (!authorization) delete headers.authorization;
  return server.inject({
    method: 'GET',
    url: '/api/v2/auth/me',
    headers,
  });
};

beforeAll(() => {
  server = app();
  return server.ready();
});

afterAll(() => {
  return server.close();
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

    const response = await userRegistration(payload);

    const statusCode = response.statusCode;
    const contenType = response.headers['content-type'];
    const isSuccess = response.json().success;
    expect(statusCode).toBe(200);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(true);
  });

  test('Register Fail, Phone Number Already Exist', async () => {
    const usedPhoneNumber = Date.now().toString();
    const payload = {
      full_name: 'Name',
      username: Math.random().toString(36).substring(2),
      password: 'password',
      phone_number: usedPhoneNumber,
      address: 'address',
    };
    await userRegistration(payload);

    const newPayload = {
      ...payload,
      username: Math.random().toString(36).substring(2),
      phone_number: usedPhoneNumber,
    };
    const response = await userRegistration(newPayload);

    const statusCode = response.statusCode;
    const contenType = response.headers['content-type'];
    const isSuccess = response.json().success;
    expect(statusCode).toBe(400);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(false);
  });

  test('Register Fail, Username Already Exist', async () => {
    const usedUsername = Math.random().toString(36).substring(2);
    const payload = {
      full_name: 'Name',
      username: usedUsername,
      password: 'password',
      phone_number: Date.now().toString(),
      address: 'address',
    };
    await userRegistration(payload);

    const newPayload = {
      ...payload,
      username: usedUsername,
      phone_number: Date.now().toString(),
    };
    const response = await userRegistration(newPayload);

    const statusCode = response.statusCode;
    const contenType = response.headers['content-type'];
    const isSuccess = response.json().success;
    expect(statusCode).toBe(400);
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

    const response = await userRegistration(payload);

    const statusCode = response.statusCode;
    const contenType = response.headers['content-type'];
    const isSuccess = response.json().success;
    expect(statusCode).toBe(422);
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

    const statusCode = response.statusCode;
    const contenType = response.headers['content-type'];
    const isSuccess = response.json().success;
    expect(statusCode).toBe(422);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(false);
  });
});

describe('Login', () => {
  test('Login Success', async () => {
    const userUsername = Math.random().toString(36).substring(2);
    const userPassword = 'password';
    const payload = {
      full_name: 'Name',
      username: userUsername,
      password: userPassword,
      phone_number: Date.now().toString(),
      address: 'address',
    };
    await userRegistration(payload);

    const response = await userLogin(userUsername, userPassword);

    const statusCode = response.statusCode;
    const contenType = response.headers['content-type'];
    const isSuccess = response.json().success;
    expect(statusCode).toBe(200);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(true);
  });

  test('Login Failed, Wrong Password', async () => {
    const userUsername = Math.random().toString(36).substring(2);
    const payload = {
      full_name: 'Name',
      username: userUsername,
      password: 'password',
      phone_number: Date.now().toString(),
      address: 'address',
    };
    await userRegistration(payload);

    const wrongPassword = 'wrong-password';
    const response = await userLogin(userUsername, wrongPassword);

    const statusCode = response.statusCode;
    const contenType = response.headers['content-type'];
    const isSuccess = response.json().success;
    expect(statusCode).toBe(400);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(false);
  });

  test('Login Failed, User Not Registered', async () => {
    const wrongUsername = 'this-username-doesnt-exist';
    const wrongPasssword = 'just-random-password';

    const response = await userLogin(wrongUsername, wrongPasssword);

    const statusCode = response.statusCode;
    const contenType = response.headers['content-type'];
    const isSuccess = response.json().success;
    expect(statusCode).toBe(400);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(false);
  });
});

describe('Get Profile', () => {
  test('Get Profile Success', async () => {
    const username = Math.random().toString(36).substring(2);
    const password = 'password';
    const payload = {
      full_name: 'Name',
      username,
      password,
      phone_number: Date.now().toString(),
      address: 'address',
    };
    await userRegistration(payload);
    const user = await userLogin(username, password);

    const authorization = user.json().data.token;
    const response = await userProfile(authorization);

    const statusCode = response.statusCode;
    const contenType = response.headers['content-type'];
    const isSuccess = response.json().success;
    expect(statusCode).toBe(200);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(true);
  });

  test('Get Profile Failed, Wrong API Key', async () => {
    const authorization = 'this-is-wrong-token';

    const response = await userProfile(authorization);

    const statusCode = response.statusCode;
    const contenType = response.headers['content-type'];
    const isSuccess = response.json().success;
    expect(statusCode).toBe(403);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(false);
  });

  test('Get Profile Failed, API Key Not Given', async () => {
    const authorization = undefined;

    const response = await userProfile(authorization);

    const statusCode = response.statusCode;
    const contenType = response.headers['content-type'];
    const isSuccess = response.json().success;
    expect(statusCode).toBe(403);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(false);
  });
});
