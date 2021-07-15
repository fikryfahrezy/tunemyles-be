import type { Server } from 'http';
import type { FastifyInstance } from 'fastify';
import supertest from 'supertest';
import fs from 'fs';
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

describe('Get Data', () => {
  test('Success', async () => {
    const { status, headers, body } = await supertest(server).get('/api/v1/example');

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });
});

describe('Get Single Data', () => {
  test('Found Single Data', async () => {
    const { status, headers, body } = await supertest(server).get('/api/v1/example/1');

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Data Not Found', async () => {
    const { status, headers, body } = await supertest(server).get('/api/v1/example/100');

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Post Data', () => {
  test('Success', async () => {
    const { status, headers, body } = await supertest(server)
      .post('/api/v1/example')
      .set('Content-Type', 'application/json')
      .send({ name: 'name' });

    expect(status).toBe(201);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Validation Fail', async () => {
    const { status, headers, body } = await supertest(server)
      .post('/api/v1/example')
      .set('Content-Type', 'application/json')
      .send({});

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Post File', () => {
  test('Success', async () => {
    const file = fs.createReadStream('./__test__/image-test.png');

    const { status, headers, body } = await supertest(server)
      .post('/api/v1/example/file')
      .set('Content-Type', 'multipart/form-data')
      .attach('file', file);

    expect(status).toBe(201);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });
});

describe('Get Private Data', () => {
  test('Success', async () => {
    const { status, headers, body } = await supertest(server)
      .get('/api/v1/example/private')
      .set('authorization', '1');

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Header Authorization Not Given', async () => {
    const { status, headers, body } = await supertest(server).get('/api/v1/example/private');

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong Header Authorization', async () => {
    const { status, headers, body } = await supertest(server)
      .get('/api/v1/example/private')
      .set('authorization', '2');

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});
