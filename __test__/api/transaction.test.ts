import type { Server } from 'http';
import type { FastifyInstance } from 'fastify';
import app from '../../src/config/app';
import {
  sequelize,
  getUserTransactions,
  getUserTransactionDetail,
  finishTransaction,
  reviewProduct,
  getReviewedProducts,
  registration,
  createUser,
  addToCheckout,
  endUserTransaction,
  makeProductReview,
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

describe('Get User Transactions', () => {
  test('Success, Without Query', async () => {
    const { token } = await registration();
    const query = '';

    const { status, headers, body } = await getUserTransactions(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?limit=1`', async () => {
    const { token, userId } = await createUser();
    await Promise.all([addToCheckout(userId), addToCheckout(userId)]);
    const query = '?limit=1';

    const { status, headers, body } = await getUserTransactions(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
    expect(body.data.length).toBe(1);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=&status=0`', async () => {
    const { token } = await registration();
    const query = '?orderDirection=DESC&orderBy=created_at&search=&page=&limit=&status=0';

    const { status, headers, body } = await getUserTransactions(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=full_name&search=&page=&limit=&status=0`', async () => {
    const { token } = await registration();
    const query = '?orderDirection=DESC&orderBy=full_name&search=&page=&limit=&status=0';

    const { status, headers, body } = await getUserTransactions(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=phone_number&search=&page=&limit=&status=0`', async () => {
    const { token } = await registration();
    const query = '?orderDirection=DESC&orderBy=phone_number&search=&page=&limit=&status=0';

    const { status, headers, body } = await getUserTransactions(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=address&search=&page=&limit=&status=0`', async () => {
    const { token } = await registration();
    const query = '?orderDirection=DESC&orderBy=address&search=&page=&limit=&status=0';

    const { status, headers, body } = await getUserTransactions(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=&status=0`', async () => {
    const { token } = await registration();
    const query = '?orderDirection=ASC&orderBy=created_at&search=&page=&limit=&status=0';

    const { status, headers, body } = await getUserTransactions(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=full_name&search=&page=&limit=&status=0`', async () => {
    const { token } = await registration();
    const query = '?orderDirection=ASC&orderBy=full_name&search=&page=&limit=&status=0';

    const { status, headers, body } = await getUserTransactions(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=phone_number&search=&page=&limit=&status=0`', async () => {
    const { token } = await registration();
    const query = '?orderDirection=ASC&orderBy=phone_number&search=&page=&limit=&status=0';

    const { status, headers, body } = await getUserTransactions(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=address&search=&page=&limit=&status=0`', async () => {
    const { token } = await registration();
    const query = '?orderDirection=ASC&orderBy=address&search=&page=&limit=&status=0';

    const { status, headers, body } = await getUserTransactions(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=`', async () => {
    const { token } = await registration();
    const query = '?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=';

    const { status, headers, body } = await getUserTransactions(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`', async () => {
    const { token } = await registration();
    const query = '?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=';

    const { status, headers, body } = await getUserTransactions(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const query = '';

    const { status, headers, body } = await getUserTransactions(server, query, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const query = '';

    const { status, headers, body } = await getUserTransactions(server, query);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get User Transaction Detail', () => {
  test('Success', async () => {
    const { token, userId } = await createUser();
    const { transactionId } = await addToCheckout(userId);

    const { status, headers, body } = await getUserTransactionDetail(server, transactionId, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Transaction Not Found', async () => {
    const { token } = await registration();
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
    const { token, userId } = await createUser();
    const { transactionId } = await addToCheckout(userId);

    const { status, headers, body } = await finishTransaction(server, transactionId, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, User Transaction Not Found', async () => {
    const { token } = await registration();
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

describe('Review Product', () => {
  const payload = {
    rating: 1,
    review: 'review',
  };

  test('Success', async () => {
    const { token, userId } = await createUser();
    const { transactionProductId } = await endUserTransaction(userId);

    const { status, headers, body } = await reviewProduct(
      server,
      transactionProductId,
      payload,
      token,
    );

    expect(status).toBe(201);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, No Data Provided', async () => {
    const token = 'this.is.token';
    const transactionProductId = 0;

    const { status, headers, body } = await reviewProduct(server, transactionProductId, {}, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const transactionProductId = 0;

    const { status, headers, body } = await reviewProduct(
      server,
      transactionProductId,
      payload,
      token,
    );

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const transactionProductId = 0;

    const { status, headers, body } = await reviewProduct(server, transactionProductId, payload);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Reviewed Products', () => {
  test('Success, Without Query', async () => {
    const { token } = await registration();
    const query = '';

    const { status, headers, body } = await getReviewedProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?limit=1`', async () => {
    const { token, userId } = await createUser();
    await Promise.all([makeProductReview(userId), makeProductReview(userId)]);
    const query = '?limit=1';

    const { status, headers, body } = await getReviewedProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
    expect(body.data.length).toBe(1);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=`', async () => {
    const { token } = await registration();
    const query = '?orderDirection=DESC&orderBy=created_at&search=&page=&limit=';

    const { status, headers, body } = await getReviewedProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=rating&search=&page=&limit=`', async () => {
    const { token } = await registration();
    const query = '?orderDirection=DESC&orderBy=rating&search=&page=&limit=';

    const { status, headers, body } = await getReviewedProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=`', async () => {
    const { token } = await registration();
    const query = '?orderDirection=ASC&orderBy=created_at&search=&page=&limit=';

    const { status, headers, body } = await getReviewedProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=rating&search=&page=&limit=`', async () => {
    const { token } = await registration();
    const query = '?orderDirection=ASC&orderBy=rating&search=&page=&limit=';
    ('?orderDirection=ASC&orderBy=rating&search=&page=&limit=');

    const { status, headers, body } = await getReviewedProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=`', async () => {
    const { token } = await registration();
    const query = '?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=';

    const { status, headers, body } = await getReviewedProducts(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`', async () => {
    const { token } = await registration();
    const query = '?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=';

    const { status, headers, body } = await getReviewedProducts(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const query = '';

    const { status, headers, body } = await getReviewedProducts(server, query, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const query = '';

    const { status, headers, body } = await getReviewedProducts(server, query);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});
