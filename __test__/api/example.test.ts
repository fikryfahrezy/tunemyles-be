import { FastifyInstance } from 'fastify';
import formAutoContent from 'form-auto-content';
import fs from 'fs';
import app from '../../src/app';

let server: null | FastifyInstance = null;

beforeAll(() => {
  server = app();
  return server.ready();
});

afterAll(() => {
  return server.close();
});

describe('Get Data', () => {
  test('Get Success', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/v2/example',
    });

    const statusCode = response.statusCode;
    const contenType = response.headers['content-type'];
    const isSuccess = response.json().success;
    expect(statusCode).toBe(200);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(true);
  });
});

describe('Get Single Data', () => {
  test('Found Single Data', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/v2/example/1',
    });

    const statusCode = response.statusCode;
    const contenType = response.headers['content-type'];
    const isSuccess = response.json().success;
    expect(statusCode).toBe(200);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(true);
  });

  test('Data Not Found', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/v2/example/100',
    });

    const statusCode = response.statusCode;
    const contenType = response.headers['content-type'];
    const isSuccess = response.json().success;
    expect(statusCode).toBe(404);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(false);
  });
});

describe('Post Data', () => {
  test('Post Success', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/v2/example',
      headers: {
        'content-type': 'application/json',
      },
      payload: {
        name: 'name',
      },
    });

    const statusCode = response.statusCode;
    const contenType = response.headers['content-type'];
    const isSuccess = response.json().success;
    expect(statusCode).toBe(200);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(true);
  });

  test('Post Fail, Validation Fail', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/v2/example',
      headers: {
        'content-type': 'application/json',
      },
      payload: {},
    });

    const statusCode = response.statusCode;
    const contenType = response.headers['content-type'];
    const isSuccess = response.json().success;
    expect(statusCode).toBe(422);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(false);
  });
});

describe('Post File', () => {
  test('Post File Success', async () => {
    const file = fs.createReadStream('./__test__/image-test.png');
    const form = formAutoContent({ file });

    const response = await server.inject({
      method: 'POST',
      url: '/api/v2/example/file',
      ...form,
    });

    const statusCode = response.statusCode;
    const contenType = response.headers['content-type'];
    const isSuccess = response.json().success;
    expect(statusCode).toBe(200);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(true);
  });
});

describe('Get Private Data', () => {
  test('Get Private Data Success', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/v2/example/private',
      headers: { authorization: 1 },
    });

    const statusCode = response.statusCode;
    const contenType = response.headers['content-type'];
    const isSuccess = response.json().success;
    expect(statusCode).toBe(200);
    expect(contenType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(true);
  });

  test('Get Private Data Fail, Header Authorization Not Given', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/v2/example/private',
    });

    const statusCode = response.statusCode;
    const contentType = response.headers['content-type'];
    const isSuccess = response.json().success;
    expect(statusCode).toBe(403);
    expect(contentType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(false);
  });

  test('Get Private Data Fail, Wrong Header Authorization', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/v2/example/private',
      headers: { authorization: 2 },
    });

    const statusCode = response.statusCode;
    const contentType = response.headers['content-type'];
    const isSuccess = response.json().success;
    expect(statusCode).toBe(403);
    expect(contentType).toBe('application/json; charset=utf-8');
    expect(isSuccess).toBe(false);
  });
});
