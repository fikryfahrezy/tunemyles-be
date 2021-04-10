import { FastifyInstance } from 'fastify';
import app from '../../src/config/app';

let server: null | FastifyInstance = null;

const userRegistration = (payload: {
  full_name: string;
  username: string;
  password: string;
  phone_number: string;
  address: string;
}) =>
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

const userProfile = (token?: string) => {
  let headers = {};
  if (token) headers = { authorization: `Bearer ${token}` };

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
    const response = await userRegistration(newPayload);

    const statusCode = response.statusCode;
    const contenType = response.headers['content-type'];
    const isSuccess = response.json().success;
    expect(statusCode).toBe(400);
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
    await userRegistration(payload);

    const newPayload = {
      ...payload,
      username,
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
    const username = Math.random().toString(36).substring(2);
    const password = 'password';
    const payload = {
      username,
      password,
      full_name: 'Name',
      phone_number: Date.now().toString(),
      address: 'address',
    };
    const registration = await userRegistration(payload);
    registration.json();

    const response = await userLogin(username, password);
    const resBody = response.json();

    const statusCode = response.statusCode;
    const contenType = response.headers['content-type'];
    const isSuccess = resBody.success;
    expect(statusCode).toBe(200);
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
    await userRegistration(payload);

    const wrongPassword = 'wrong-password';
    const response = await userLogin(username, wrongPassword);

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
      username,
      password,
      full_name: 'Name',
      phone_number: Date.now().toString(),
      address: 'address',
    };
    const registration = await userRegistration(payload);
    registration.json();

    const user = await userLogin(username, password);
    const userBody = user.json();
    const token = userBody.data.token;

    const response = await userProfile(token);

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
