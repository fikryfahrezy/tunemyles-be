import type { Server } from 'http';
import type { FastifyInstance } from 'fastify';
import supertest from 'supertest';
import app from '../../src/config/app';
import { sequelize } from '../component';

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

test('test server is live', async () => {
  const { status, headers, body } = await supertest(server).get('/api/v1');

  expect(status).toBe(200);
  expect(headers['content-type']).toBe('application/json; charset=utf-8');
  expect(body.message).toBe('hello world');
});

test('test not found route', async () => {
  const { status, headers, body } = await supertest(server).get('/not-found');

  expect(status).toBe(404);
  expect(headers['content-type']).toBe('application/json; charset=utf-8');
  expect(body.message).toBe('not found');
});
