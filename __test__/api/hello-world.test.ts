import { FastifyInstance } from 'fastify';
import app from '../../src/config/app';

let server: null | FastifyInstance = null;

beforeAll(() => {
  server = app();
  return server.ready();
});

afterAll(() => {
  return server.close();
});

test('test server is live', async () => {
  const response = await server.inject({
    method: 'GET',
    url: '/api/v2',
  });

  expect(response.statusCode).toBe(200);
  expect(response.headers['content-type']).toBe(
    'application/json; charset=utf-8'
  );
  expect(response.json().message).toBe('hello world');
});

test('test not found route', async () => {
  const response = await server.inject({
    method: 'GET',
    url: '/not-found',
  });

  expect(response.statusCode).toBe(200);
  expect(response.headers['content-type']).toBe(
    'application/json; charset=utf-8'
  );
  expect(response.json().message).toBe('not found');
});
