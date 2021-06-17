import type { Server } from 'http';
import type { FastifyInstance } from 'fastify';
import app from '../../src/config/app';
import sequelize from '../../src/databases/sequelize';
import {
  topUp,
  withdraw,
  getWallets,
  getTopUpHistories,
  getWithdrawHistories,
  getTopUpDetail,
  getWithdrawDetail,
  getAllUserTopUp,
  getAllUserWithdraw,
  uploadTopUpProof,
  updateTopUpStatus,
  updateWithdrawStatus,
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

describe('Top Up', () => {
  test('Success', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await topUp(server, {}, token);

    expect(status).toBe(201);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Wallet Not Found', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await topUp(server, {}, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, No Data Provided', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await topUp(server, {}, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';

    const { status, headers, body } = await topUp(server, {}, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const { status, headers, body } = await topUp(server, {});

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Withdraw', () => {
  test('Success', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await withdraw(server, {}, token);

    expect(status).toBe(201);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Wallet Not Found', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await withdraw(server, {}, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, No Data Provided', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await withdraw(server, {}, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';

    const { status, headers, body } = await withdraw(server, {}, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const { status, headers, body } = await withdraw(server, {});

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Wallets', () => {
  test('Success', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await getWallets(server, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';

    const { status, headers, body } = await getWallets(server, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const { status, headers, body } = await getWallets(server);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Top Up Histories', () => {
  test('Success, Without Query', async () => {
    const token = 'this.is.token';
    const query = '';

    const { status, headers, body } = await getTopUpHistories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?limit=1`', async () => {
    const token = 'this.is.token';
    const query = '?limit=1';

    const { status, headers, body } = await getTopUpHistories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
    // expect(body.data.length).toBe(1);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=created_at&search=&page=&limit=&status=0';

    const { status, headers, body } = await getTopUpHistories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=balance_request&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=balance_request&search=&page=&limit=&status=0';

    const { status, headers, body } = await getTopUpHistories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=balance_transfer&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=balance_transfer&search=&page=&limit=&status=0';

    const { status, headers, body } = await getTopUpHistories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=created_at&search=&page=&limit=&status=0';

    const { status, headers, body } = await getTopUpHistories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=balance_request&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=balance_request&search=&page=&limit=&status=0';

    const { status, headers, body } = await getTopUpHistories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=balance_transfer&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=balance_transfer&search=&page=&limit=&status=0';

    const { status, headers, body } = await getTopUpHistories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=&status=0`';

    const { status, headers, body } = await getTopUpHistories(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=&status=0';

    const { status, headers, body } = await getTopUpHistories(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const query = '';

    const { status, headers, body } = await getTopUpHistories(server, query, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const query = '';

    const { status, headers, body } = await getTopUpHistories(server, query);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Withdraw Histories', () => {
  test('Success, Without Query', async () => {
    const token = 'this.is.token';
    const query = '';

    const { status, headers, body } = await getWithdrawHistories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?limit=1`', async () => {
    const token = 'this.is.token';
    const query = '?limit=1';

    const { status, headers, body } = await getWithdrawHistories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
    // expect(body.data.length).toBe(1);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=created_at&search=&page=&limit=&status=0';

    const { status, headers, body } = await getWithdrawHistories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=balance_request&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=balance_request&search=&page=&limit=&status=0';

    const { status, headers, body } = await getWithdrawHistories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=created_at&search=&page=&limit=&status=0';

    const { status, headers, body } = await getWithdrawHistories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=balance_request&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=balance_request&search=&page=&limit=&status=0';

    const { status, headers, body } = await getWithdrawHistories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=&status=0';

    const { status, headers, body } = await getWithdrawHistories(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=&status=0';

    const { status, headers, body } = await getWithdrawHistories(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const query = '';

    const { status, headers, body } = await getWithdrawHistories(server, query, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const query = '';

    const { status, headers, body } = await getWithdrawHistories(server, query);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Top Up Detail', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const topUpId = 0;

    const { status, headers, body } = await getTopUpDetail(server, topUpId, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Top Up Data Not Found', async () => {
    const token = 'this.is.token';
    const topUpId = 0;

    const { status, headers, body } = await getTopUpDetail(server, topUpId, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const topUpId = 0;

    const { status, headers, body } = await getTopUpDetail(server, topUpId, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const topUpId = 0;

    const { status, headers, body } = await getTopUpDetail(server, topUpId);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Withdraw Detail', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const withdrawId = 0;

    const { status, headers, body } = await getWithdrawDetail(server, withdrawId, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Withdraw Data Not Found', async () => {
    const token = 'this.is.token';
    const withdrawId = 0;

    const { status, headers, body } = await getTopUpDetail(server, withdrawId, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const withdrawId = 0;

    const { status, headers, body } = await getTopUpDetail(server, withdrawId, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const withdrawId = 0;

    const { status, headers, body } = await getTopUpDetail(server, withdrawId);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get All User Top Up', () => {
  test('Success, Without Query', async () => {
    const token = 'this.is.token';
    const query = '';

    const { status, headers, body } = await getAllUserTopUp(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?limit=1`', async () => {
    const token = 'this.is.token';
    const query = '?limit=1';

    const { status, headers, body } = await getAllUserTopUp(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
    // expect(body.data.length).toBe(1);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=created_at&search=&page=&limit=&status=0';

    const { status, headers, body } = await getAllUserTopUp(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=balance_request&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=balance_request&search=&page=&limit=&status=0';

    const { status, headers, body } = await getAllUserTopUp(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=balance_transfer&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=balance_transfer&search=&page=&limit=&status=0';

    const { status, headers, body } = await getAllUserTopUp(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=created_at&search=&page=&limit=&status=0';

    const { status, headers, body } = await getAllUserTopUp(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=balance_request&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=balance_request&search=&page=&limit=&status=0';

    const { status, headers, body } = await getAllUserTopUp(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=balance_transfer&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=balance_transfer&search=&page=&limit=&status=0';

    const { status, headers, body } = await getAllUserTopUp(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=&status=0`';

    const { status, headers, body } = await getAllUserTopUp(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=&status=0';

    const { status, headers, body } = await getAllUserTopUp(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const query = '';

    const { status, headers, body } = await getAllUserTopUp(server, query, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const query = '';

    const { status, headers, body } = await getAllUserTopUp(server, query);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get All User Withdraw', () => {
  test('Success, Without Query', async () => {
    const token = 'this.is.token';
    const query = '';

    const { status, headers, body } = await getAllUserWithdraw(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?limit=1`', async () => {
    const token = 'this.is.token';
    const query = '?limit=1';

    const { status, headers, body } = await getAllUserWithdraw(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
    // expect(body.data.length).toBe(1);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=created_at&search=&page=&limit=&status=0';

    const { status, headers, body } = await getAllUserWithdraw(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=balance_request&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=balance_request&search=&page=&limit=&status=0';

    const { status, headers, body } = await getAllUserWithdraw(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=created_at&search=&page=&limit=&status=0';

    const { status, headers, body } = await getAllUserWithdraw(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=balance_request&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=balance_request&search=&page=&limit=&status=0';

    const { status, headers, body } = await getAllUserWithdraw(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=&status=0';

    const { status, headers, body } = await getAllUserWithdraw(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=&status=0';

    const { status, headers, body } = await getAllUserWithdraw(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const query = '';

    const { status, headers, body } = await getAllUserWithdraw(server, query, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const query = '';

    const { status, headers, body } = await getAllUserWithdraw(server, query);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Upload Top Up Proof', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const topupId = 0;
    const payload = {
      files: [],
    };

    const { status, headers, body } = await uploadTopUpProof(server, topupId, payload, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, No `image` Provided', async () => {
    const token = 'this.is.token';
    const topupId = 0;
    const payload = {
      files: [],
    };

    const { status, headers, body } = await uploadTopUpProof(server, topupId, payload, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Update Top Up Status', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const topUpId = 0;

    const { status, headers, body } = await updateTopUpStatus(server, topUpId, {}, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Top Up Data Not Found', async () => {
    const token = 'this.is.token';
    const topUpId = 0;

    const { status, headers, body } = await updateTopUpStatus(server, topUpId, {}, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail No `status` Provided', async () => {
    const token = 'this.is.token';
    const topUpId = 0;

    const { status, headers, body } = await updateTopUpStatus(server, topUpId, {}, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const topUpId = 0;

    const { status, headers, body } = await updateTopUpStatus(server, topUpId, {}, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const topUpId = 0;

    const { status, headers, body } = await updateTopUpStatus(server, topUpId, {});

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Update Withdraw Status', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const withdrawId = 0;

    const { status, headers, body } = await updateWithdrawStatus(server, withdrawId, {}, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Withdraw Data Not Found', async () => {
    const token = 'this.is.token';
    const withdrawId = 0;

    const { status, headers, body } = await updateWithdrawStatus(server, withdrawId, {}, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail No `status` Provided', async () => {
    const token = 'this.is.token';
    const withdrawId = 0;

    const { status, headers, body } = await updateWithdrawStatus(server, withdrawId, {}, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const withdrawId = 0;

    const { status, headers, body } = await updateWithdrawStatus(server, withdrawId, {}, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const withdrawId = 0;

    const { status, headers, body } = await updateWithdrawStatus(server, withdrawId, {});

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});
