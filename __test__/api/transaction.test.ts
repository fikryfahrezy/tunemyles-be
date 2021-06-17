import type { Server } from 'http';
import type { FastifyInstance } from 'fastify';
import app from '../../src/config/app';
import sequelize from '../../src/databases/sequelize';
import {
  getUserProcessedTransactions,
  getUserTransactionDetail,
  finishTransaction,
  reviewTransaction,
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

describe('Get User Processed Transactions', () => {
  test('Success, Without Query', async () => {
    const token = 'this.is.token';
    const query = '';

    const { status, headers, body } = await getUserProcessedTransactions(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?limit=1`', async () => {
    const token = 'this.is.token';
    const query = '?limit=1';

    const { status, headers, body } = await getUserProcessedTransactions(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
    // expect(body.data.length).toBe(1);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=created_at&search=&page=&limit=&status=0';

    const { status, headers, body } = await getUserProcessedTransactions(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=full_name&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=full_name&search=&page=&limit=&status=0';

    const { status, headers, body } = await getUserProcessedTransactions(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=phone_number&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=phone_number&search=&page=&limit=&status=0';

    const { status, headers, body } = await getUserProcessedTransactions(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=address&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=address&search=&page=&limit=&status=0';

    const { status, headers, body } = await getUserProcessedTransactions(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=created_at&search=&page=&limit=&status=0';

    const { status, headers, body } = await getUserProcessedTransactions(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=full_name&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=full_name&search=&page=&limit=&status=0';

    const { status, headers, body } = await getUserProcessedTransactions(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=phone_number&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=phone_number&search=&page=&limit=&status=0';

    const { status, headers, body } = await getUserProcessedTransactions(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=address&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=address&search=&page=&limit=&status=0';

    const { status, headers, body } = await getUserProcessedTransactions(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=';

    const { status, headers, body } = await getUserProcessedTransactions(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=';

    const { status, headers, body } = await getUserProcessedTransactions(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const query = '';

    const { status, headers, body } = await getUserProcessedTransactions(server, query, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const query = '';

    const { status, headers, body } = await getUserProcessedTransactions(server, query);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get User Transaction Detail', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const transactionId = 0;

    const { status, headers, body } = await getUserTransactionDetail(server, transactionId, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success', async () => {
    const token = 'this.is.token';
    const transactionId = 0;

    const { status, headers, body } = await getUserTransactionDetail(server, transactionId, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const transactionId = 0;

    const { status, headers, body } = await getUserTransactionDetail(server, transactionId, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const transactionId = 0;

    const { status, headers, body } = await getUserTransactionDetail(server, transactionId);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Finish Transaction', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const transactionId = 0;

    const { status, headers, body } = await finishTransaction(server, transactionId, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, User Transaction Not Found', async () => {
    const token = 'this.is.token';
    const transactionId = 0;

    const { status, headers, body } = await finishTransaction(server, transactionId, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const transactionId = 0;

    const { status, headers, body } = await finishTransaction(server, transactionId, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const transactionId = 0;

    const { status, headers, body } = await finishTransaction(server, transactionId);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Review Transaction', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const transactionId = 0;

    const { status, headers, body } = await reviewTransaction(server, transactionId, {}, token);

    expect(status).toBe(201);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, No Data Provided', async () => {
    const token = 'this.is.token';
    const transactionId = 0;

    const { status, headers, body } = await reviewTransaction(server, transactionId, {}, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const transactionId = 0;

    const { status, headers, body } = await reviewTransaction(server, transactionId, {}, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const transactionId = 0;

    const { status, headers, body } = await reviewTransaction(server, transactionId, {});

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});
