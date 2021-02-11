import { FastifyInstance } from 'fastify';
import app from '../src/app';

let server: null | FastifyInstance = null;

beforeEach(() => {
  server = app();
  return server.ready();
});

afterEach(() => {
  return server.close();
});

test('test server is live', async () => {
  const response = await server.inject({
    method: 'GET',
    url: '/hello-world',
  });

  expect(response.statusCode).toBe(200);
  expect(response.headers['content-type']).toBe('text/plain; charset=utf-8');
  expect(response.body).toBe('hello world');
});
