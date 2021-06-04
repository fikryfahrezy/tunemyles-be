import supertest from 'supertest';
import sequelize from '../../src/databases/sequelize';
import { setUpServer } from '../component';

beforeAll(() => sequelize.authenticate());

afterAll(() => sequelize.close());

test('test server is live', async () => {
  const { appServer, server } = await setUpServer();

  const { status, headers, body } = await supertest(server).get('/api/v2');

  expect(status).toBe(200);
  expect(headers['content-type']).toBe('application/json; charset=utf-8');
  expect(body.message).toBe('hello world');

  appServer.close();
});

test('test not found route', async () => {
  const { appServer, server } = await setUpServer();

  const { status, headers, body } = await supertest(server).get('/not-found');

  expect(status).toBe(404);
  expect(headers['content-type']).toBe('application/json; charset=utf-8');
  expect(body.message).toBe('not found');

  appServer.close();
});
