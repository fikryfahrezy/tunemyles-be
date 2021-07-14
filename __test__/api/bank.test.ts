import type { Server } from 'http';
import type { FastifyInstance } from 'fastify';
import app from '../../src/config/app';
import {
  sequelize,
  postBankUser,
  getBanks,
  getBankDetail,
  getBankUsers,
  updateBankUser,
  deleteBankUser,
  registration,
  createUser,
  createMasterBank,
  addBankUser,
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

describe('Post Bank User', () => {
  const payload = {
    bank_id: 0,
    account_name: 'name',
    account_number: '123721890',
  };

  test('Success', async () => {
    const [{ token }, { id }] = await Promise.all([registration(), createMasterBank()]);
    const newPayload = {
      ...payload,
      bank_id: id,
    };

    const { status, headers, body } = await postBankUser(server, newPayload, token);

    expect(status).toBe(201);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, No Data Provided', async () => {
    const { token } = await registration();

    const { status, headers, body } = await postBankUser(server, {}, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';

    const { status, headers, body } = await postBankUser(server, payload, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const { status, headers, body } = await postBankUser(server, payload);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Banks', () => {
  test('Success', async () => {
    const { token } = await registration();

    const { status, headers, body } = await getBanks(server, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';

    const { status, headers, body } = await getBanks(server, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const { status, headers, body } = await getBanks(server);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Bank Detail', () => {
  test('Success', async () => {
    const [{ token }, { id: bankId }] = await Promise.all([registration(), createMasterBank()]);

    const { status, headers, body } = await getBankDetail(server, bankId, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Bank Not Found', async () => {
    const { token } = await registration();
    const bankId = 0;

    const { status, headers, body } = await getBankDetail(server, bankId, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const bankId = 0;

    const { status, headers, body } = await getBankDetail(server, bankId, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const bankId = 0;

    const { status, headers, body } = await getBankDetail(server, bankId);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Bank Users', () => {
  test('Success', async () => {
    const { token } = await registration();

    const { status, headers, body } = await getBankUsers(server, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';

    const { status, headers, body } = await getBankUsers(server, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const { status, headers, body } = await getBankUsers(server);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Update Bank User', () => {
  test('Success', async () => {
    const { token, userId } = await createUser();
    const { userBankId } = await addBankUser(userId);
    const payload = {
      account_name: 'new name',
      account_number: Date.now().toString(),
    };

    const { status, headers, body } = await updateBankUser(server, userBankId, payload, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Wrong API Key', async () => {
    const { token } = await registration();
    const userBankId = 0;

    const { status, headers, body } = await updateBankUser(server, userBankId, {}, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const userBankId = 0;

    const { status, headers, body } = await updateBankUser(server, userBankId, {}, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const userBankId = 0;

    const { status, headers, body } = await updateBankUser(server, userBankId, {});

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Delete Bank User', () => {
  test('Success', async () => {
    const { token, userId } = await createUser();
    const { userBankId } = await addBankUser(userId);

    const { status, headers, body } = await deleteBankUser(server, userBankId, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Bank User Not Found', async () => {
    const { token } = await registration();
    const userBankId = 0;

    const { status, headers, body } = await deleteBankUser(server, userBankId, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const userBankId = 0;

    const { status, headers, body } = await deleteBankUser(server, userBankId, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const userBankId = 0;

    const { status, headers, body } = await deleteBankUser(server, userBankId);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});
