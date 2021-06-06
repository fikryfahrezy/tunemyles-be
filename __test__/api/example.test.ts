import supertest from 'supertest';
import fs from 'fs';
import sequelize from '../../src/databases/sequelize';
import { setUpServer } from '../component';

beforeAll(() => sequelize.authenticate());

afterAll(() => sequelize.close());

describe('Get Data', () => {
  test('Success', async () => {
    const { appServer, server } = await setUpServer();

    const { status, headers, body } = await supertest(server).get('/api/v2/example');

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);

    appServer.close();
  });
});

describe('Get Single Data', () => {
  test('Found Single Data', async () => {
    const { appServer, server } = await setUpServer();

    const { status, headers, body } = await supertest(server).get('/api/v2/example/1');

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);

    appServer.close();
  });

  test('Data Not Found', async () => {
    const { appServer, server } = await setUpServer();

    const { status, headers, body } = await supertest(server).get('/api/v2/example/100');

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });
});

describe('Post Data', () => {
  test('Success', async () => {
    const { appServer, server } = await setUpServer();

    const { status, headers, body } = await supertest(server)
      .post('/api/v2/example')
      .set('Content-Type', 'application/json')
      .send({ name: 'name' });

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);

    appServer.close();
  });

  test('Fail, Validation Fail', async () => {
    const { appServer, server } = await setUpServer();

    const { status, headers, body } = await supertest(server)
      .post('/api/v2/example')
      .set('Content-Type', 'application/json')
      .send({});

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });
});

describe('Post File', () => {
  test('Success', async () => {
    const { appServer, server } = await setUpServer();
    const file = fs.createReadStream('./__test__/image-test.png');

    const { status, headers, body } = await supertest(server)
      .post('/api/v2/example/file')
      .set('Content-Type', 'multipart/form-data')
      .attach('file', file);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);

    appServer.close();
  });
});

describe('Get Private Data', () => {
  test('Success', async () => {
    const { appServer, server } = await setUpServer();

    const { status, headers, body } = await supertest(server)
      .get('/api/v2/example/private')
      .set('authorization', '1');

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);

    appServer.close();
  });

  test('Fail, Header Authorization Not Given', async () => {
    const { appServer, server } = await setUpServer();

    const { status, headers, body } = await supertest(server).get('/api/v2/example/private');

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });

  test('Fail, Wrong Header Authorization', async () => {
    const { appServer, server } = await setUpServer();

    const { status, headers, body } = await supertest(server)
      .get('/api/v2/example/private')
      .set('authorization', '2');

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);

    appServer.close();
  });
});
