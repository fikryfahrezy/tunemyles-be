import type { Server } from 'http';
import type { FastifyInstance } from 'fastify';
import app from '../../src/config/app';
import sequelize from '../../src/databases/sequelize';
import { createBank, createBankStep } from '../../src/api/repositories/MasterRepository';
import {
  fileDir,
  postMasterBank,
  getMasterBanks,
  postMasterBankStep,
  getMasterBankDetail,
  updateMasterBank,
  updateMasterBankDetail,
  changeMasterBankLogo,
  deleteMasterBankStep,
  deleteMasterBank,
  postCategory,
  getCategories,
  updateCategory,
  changeCategoryIcon,
  deleteCategory,
  postMedia,
  getMedias,
  updateMedia,
  deleteMedia,
  postMasterWallet,
  getMasterWallets,
  updateMasterWallet,
  changeMasterWalletLogo,
  deleteMasterWallet,
  postFaq,
  getFaqs,
  updateFaq,
  deleteFaq,
  createAdminUser,
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

describe.only('run this', () => {
  describe('Post Master Bank', () => {
    const payload = {
      fields: { bank_name: 'bank name' },
      files: [{ fileDir, field: 'logo' }],
    };
    const { fields, files } = payload;

    test('Success, With Logo', async () => {
      const token = await createAdminUser();

      const { status, headers, body } = await postMasterBank(server, payload, token);

      expect(status).toBe(201);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(true);
    });

    test('Success, Without Logo', async () => {
      const token = await createAdminUser();
      const { status, headers, body } = await postMasterBank(server, { fields }, token);

      expect(status).toBe(201);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(true);
    });

    test('Fail, No `bank_name` Provided', async () => {
      const token = await createAdminUser();

      const { status, headers, body } = await postMasterBank(server, { files }, token);

      expect(status).toBe(422);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });

    test('Fail, Wrong API Key', async () => {
      const token = 'this-is-wrong-token';

      const { status, headers, body } = await postMasterBank(server, { fields }, token);

      expect(status).toBe(403);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });

    test('Fail, API Key Not Given', async () => {
      const { status, headers, body } = await postMasterBank(server, { fields });

      expect(status).toBe(403);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });
  });

  describe('Get Master Banks', () => {
    test('Success, Without Query', async () => {
      const token = await createAdminUser();
      const query = '';

      const { status, headers, body } = await getMasterBanks(server, query, token);

      expect(status).toBe(200);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(true);
    });

    test('Success, with Query `limit=1', async () => {
      const token = await createAdminUser();
      const payload = { bank_name: 'bank_name' };
      await Promise.all([createBank(payload), createBank(payload)]);
      const query = '?limit=1';

      const { status, headers, body } = await getMasterBanks(server, query, token);

      expect(status).toBe(200);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(true);
      expect(body.data.length).toBe(1);
    });

    test('Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=`', async () => {
      const token = await createAdminUser();
      const query = '?orderDirection=DESC&orderBy=created_at&search=&page=&limit=';

      const { status, headers, body } = await getMasterBanks(server, query, token);

      expect(status).toBe(200);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(true);
    });

    test('Success, with Query `?orderDirection=DESC&orderBy=bank_name&search=&page=&limit=`', async () => {
      const token = await createAdminUser();
      const query = '?orderDirection=DESC&orderBy=bank_name&search=&page=&limit=';

      const { status, headers, body } = await getMasterBanks(server, query, token);

      expect(status).toBe(200);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(true);
    });

    test('Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=`', async () => {
      const token = await createAdminUser();
      const query = '?orderDirection=ASC&orderBy=created_at&search=&page=&limit=';

      const { status, headers, body } = await getMasterBanks(server, query, token);

      expect(status).toBe(200);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(true);
    });

    test('Success, with Query `?orderDirection=ASC&orderBy=bank_name&search=&page=&limit=`', async () => {
      const token = await createAdminUser();
      const query = '?orderDirection=ASC&orderBy=bank_name&search=&page=&limit=';

      const { status, headers, body } = await getMasterBanks(server, query, token);

      expect(status).toBe(200);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(true);
    });

    test('Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=`', async () => {
      const token = await createAdminUser();
      const query = '?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=';

      const { status, headers, body } = await getMasterBanks(server, query, token);

      expect(status).toBe(422);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });

    test('Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`', async () => {
      const token = await createAdminUser();
      const query = '?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=';

      const { status, headers, body } = await getMasterBanks(server, query, token);

      expect(status).toBe(422);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });

    test('Fail, Wrong API Key', async () => {
      const token = 'this-is-wrong-token';
      const query = '';

      const { status, headers, body } = await getMasterBanks(server, query, token);

      expect(status).toBe(403);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });

    test('Fail, API Key Not Given', async () => {
      const query = '';

      const { status, headers, body } = await getMasterBanks(server, query);

      expect(status).toBe(403);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });
  });

  describe('Post Master Bank Step', () => {
    const payload = { step: 'step' };
    const bankPayload = { bank_name: 'bank_name' };

    test('Success', async () => {
      const token = await createAdminUser();
      const { id: bankId } = await createBank(bankPayload);

      const { status, headers, body } = await postMasterBankStep(server, bankId, payload, token);

      expect(status).toBe(201);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(true);
    });

    test('Fail, No `step` Provided', async () => {
      const token = await createAdminUser();
      const { id: bankId } = await createBank(bankPayload);

      const { status, headers, body } = await postMasterBankStep(server, bankId, {}, token);

      expect(status).toBe(422);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });

    test('Fail, Wrong API Key', async () => {
      const token = 'this-is-wrong-token';
      const bankId = 0;

      const { status, headers, body } = await postMasterBankStep(server, bankId, payload, token);

      expect(status).toBe(403);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });

    test('Fail, API Key Not Given', async () => {
      const bankId = 0;

      const { status, headers, body } = await postMasterBankStep(server, bankId, payload);

      expect(status).toBe(403);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });
  });

  describe('Get Master Bank Detail', () => {
    test('Success', async () => {
      const token = await createAdminUser();
      const { id: bankId } = await createBank({ bank_name: 'bank_name' });

      const { status, headers, body } = await getMasterBankDetail(server, bankId, token);

      expect(status).toBe(200);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(true);
    });

    test('Fail, Master Bank Not Found', async () => {
      const token = await createAdminUser();
      const bankId = 0;

      const { status, headers, body } = await getMasterBankDetail(server, bankId, token);

      expect(status).toBe(404);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });

    test('Fail, Wrong API Key', async () => {
      const token = 'this-is-wrong-token';
      const bankId = 0;

      const { status, headers, body } = await getMasterBankDetail(server, bankId, token);

      expect(status).toBe(403);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });

    test('Fail, API Key Not Given', async () => {
      const bankId = 0;

      const { status, headers, body } = await getMasterBankDetail(server, bankId);

      expect(status).toBe(403);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });
  });

  describe('Update Master Bank', () => {
    const payload = { bank_name: 'new bank name', visibility: 2 };

    test('Success', async () => {
      const token = await createAdminUser();
      const { id: bankId } = await createBank({ bank_name: 'bank_name' });

      const { status, headers, body } = await updateMasterBank(server, bankId, payload, token);

      expect(status).toBe(200);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(true);
    });

    test('Fail, Master Bank Not Found', async () => {
      const token = await createAdminUser();
      const bankId = 0;

      const { status, headers, body } = await updateMasterBank(server, bankId, payload, token);

      expect(status).toBe(404);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });

    test('Fail, Wrong API Key', async () => {
      const token = 'this-is-wrong-token';
      const bankId = 0;

      const { status, headers, body } = await updateMasterBank(server, bankId, {}, token);

      expect(status).toBe(403);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });

    test('Fail, API Key Not Given', async () => {
      const bankId = 0;

      const { status, headers, body } = await updateMasterBank(server, bankId, {});

      expect(status).toBe(403);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });
  });

  describe('Update Master Bank Account', () => {
    const payload = { account_name: 'new account name', account_number: '2378947239042' };

    test('Success', async () => {
      const token = await createAdminUser();
      const { id: bankId } = await createBank({ bank_name: 'bank_name' });

      const { status, headers, body } = await updateMasterBankDetail(
        server,
        bankId,
        payload,
        token,
      );

      expect(status).toBe(200);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(true);
    });

    test('Fail, Master Bank Not Found', async () => {
      const token = await createAdminUser();
      const bankId = 0;

      const { status, headers, body } = await updateMasterBankDetail(
        server,
        bankId,
        payload,
        token,
      );

      expect(status).toBe(404);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });

    test('Fail, Wrong API Key', async () => {
      const token = 'this-is-wrong-token';
      const bankId = 0;

      const { status, headers, body } = await updateMasterBankDetail(server, bankId, {}, token);

      expect(status).toBe(403);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });

    test('Fail, API Key Not Given', async () => {
      const bankId = 0;

      const { status, headers, body } = await updateMasterBankDetail(server, bankId, {});

      expect(status).toBe(403);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });
  });

  describe('Change Master Bank Logo', () => {
    const payload = { files: [{ fileDir, field: 'logo' }] };

    test('Success', async () => {
      const token = await createAdminUser();
      const { id: bankId } = await createBank({ bank_name: 'bank_name' });

      const { status, headers, body } = await changeMasterBankLogo(server, bankId, payload, token);

      expect(status).toBe(200);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(true);
    });

    test('Fail, No `logo` Provided', async () => {
      const token = await createAdminUser();
      const bankId = 0;

      const { status, headers, body } = await changeMasterBankLogo(server, bankId, {}, token);

      expect(status).toBe(422);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });
  });

  describe('Delete Master Bank Step', () => {
    test('Success', async () => {
      const token = await createAdminUser();
      const { id: bankId } = await createBank({ bank_name: 'bank_name' });
      const { id: stepId } = await createBankStep(bankId, 'step');

      const { status, headers, body } = await deleteMasterBankStep(server, stepId, token);

      expect(status).toBe(200);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(true);
    });

    test('Fail, Master Bank Step Not Found', async () => {
      const token = await createAdminUser();
      const stepId = 0;

      const { status, headers, body } = await deleteMasterBankStep(server, stepId, token);

      expect(status).toBe(404);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });

    test('Fail, Wrong API Key', async () => {
      const token = 'this-is-wrong-token';
      const stepId = 0;

      const { status, headers, body } = await deleteMasterBankStep(server, stepId, token);

      expect(status).toBe(403);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });

    test('Fail, API Key Not Given', async () => {
      const stepId = 0;

      const { status, headers, body } = await deleteMasterBankStep(server, stepId);

      expect(status).toBe(403);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });
  });

  describe('Delete Master Bank', () => {
    test('Success', async () => {
      const token = await createAdminUser();
      const { id: bankId } = await createBank({ bank_name: 'bank_name' });

      const { status, headers, body } = await deleteMasterBank(server, bankId, token);

      expect(status).toBe(200);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(true);
    });

    test('Fail, Master Bank Not Found', async () => {
      const token = await createAdminUser();
      const bankId = 0;

      const { status, headers, body } = await deleteMasterBank(server, bankId, token);

      expect(status).toBe(404);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });

    test('Fail, Wrong API Key', async () => {
      const token = 'this-is-wrong-token';
      const bankId = 0;

      const { status, headers, body } = await deleteMasterBank(server, bankId, token);

      expect(status).toBe(403);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });

    test('Fail, API Key Not Given', async () => {
      const bankId = 0;

      const { status, headers, body } = await deleteMasterBank(server, bankId);

      expect(status).toBe(403);
      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(body.success).toBe(false);
    });
  });
});

describe('Post Category', () => {
  test('Success, With Icon', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await postCategory(server, {}, token);

    expect(status).toBe(201);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, Without Icon', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await postCategory(server, {}, token);

    expect(status).toBe(201);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, No Data Provided', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await postCategory(server, {}, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';

    const { status, headers, body } = await postCategory(server, {}, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const { status, headers, body } = await postCategory(server, {});

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Categories', () => {
  test('Success, Without Query', async () => {
    const token = 'this.is.token';
    const query = '';

    const { status, headers, body } = await getCategories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `limit=1', async () => {
    const token = 'this.is.token';
    const query = '?limit=1';

    const { status, headers, body } = await getCategories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
    // expect(body.data.length).toBe(1);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=created_at&search=&page=&limit=';

    const { status, headers, body } = await getCategories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=category&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=category&search=&page=&limit=';

    const { status, headers, body } = await getCategories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=description&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=description&search=&page=&limit=';

    const { status, headers, body } = await getCategories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=created_at&search=&page=&limit=';

    const { status, headers, body } = await getCategories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=category&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=category&search=&page=&limit=';

    const { status, headers, body } = await getCategories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=description&search=&page=&limit=';

    const { status, headers, body } = await getCategories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=';

    const { status, headers, body } = await getCategories(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=';

    const { status, headers, body } = await getCategories(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const query = '';

    const { status, headers, body } = await getCategories(server, query, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const query = '';

    const { status, headers, body } = await getCategories(server, query);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Update Category', () => {
  test('Success, With Icon', async () => {
    const token = 'this.is.token';
    const categoryId = 0;

    const { status, headers, body } = await updateCategory(server, categoryId, {}, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Category Not Found', async () => {
    const token = 'this.is.token';
    const categoryId = 0;

    const { status, headers, body } = await updateCategory(server, categoryId, {}, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const categoryId = 0;

    const { status, headers, body } = await updateCategory(server, categoryId, {}, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const categoryId = 0;

    const { status, headers, body } = await updateCategory(server, categoryId, {});

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Change Category Icon', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const categoryId = 0;

    const { status, headers, body } = await changeCategoryIcon(server, categoryId, {}, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, No `icon` Provided', async () => {
    const token = 'this.is.token';
    const categoryId = 0;

    const { status, headers, body } = await changeCategoryIcon(server, categoryId, {}, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Delete Category', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const categoryId = 0;

    const { status, headers, body } = await deleteCategory(server, categoryId, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Category Not Found', async () => {
    const token = 'this.is.token';
    const categoryId = 0;

    const { status, headers, body } = await deleteCategory(server, categoryId, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const categoryId = 0;

    const { status, headers, body } = await deleteCategory(server, categoryId, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const categoryId = 0;

    const { status, headers, body } = await deleteCategory(server, categoryId);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Post Media', () => {
  test('Success', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await postMedia(server, {}, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, No `image` Provided', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await postMedia(server, {}, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Medias', () => {
  test('Success, Without Query', async () => {
    const token = 'this.is.token';
    const query = '';

    const { status, headers, body } = await getMedias(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?limit=1`', async () => {
    const token = 'this.is.token';
    const query = '?limit=1';

    const { status, headers, body } = await getMedias(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
    // expect(body.data.length).toBe(1);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=created_at&search=&page=&limit=';

    const { status, headers, body } = await getMedias(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=label&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=label&search=&page=&limit=';

    const { status, headers, body } = await getMedias(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=created_at&search=&page=&limit=';

    const { status, headers, body } = await getMedias(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=label&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=label&search=&page=&limit=';

    const { status, headers, body } = await getMedias(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=';

    const { status, headers, body } = await getMedias(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=';

    const { status, headers, body } = await getMedias(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const query = '';

    const { status, headers, body } = await getMedias(server, query, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const query = '';

    const { status, headers, body } = await getMedias(server, query);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Update Media', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const mediaId = 0;

    const { status, headers, body } = await updateMedia(server, mediaId, {}, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, No `image` Provided', async () => {
    const token = 'this.is.token';
    const mediaId = 0;

    const { status, headers, body } = await updateMedia(server, mediaId, {}, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });
});

describe('Delete Media', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const mediaId = 0;

    const { status, headers, body } = await deleteMedia(server, mediaId, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Media Not Found', async () => {
    const token = 'this.is.token';
    const mediaId = 0;

    const { status, headers, body } = await deleteMedia(server, mediaId, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const mediaId = 0;

    const { status, headers, body } = await deleteMedia(server, mediaId, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const mediaId = 0;

    const { status, headers, body } = await deleteMedia(server, mediaId);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Post Master Wallet', () => {
  test('Success, With Logo', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await postMasterWallet(server, {}, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, Without Logo', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await postMasterWallet(server, {}, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, No Data Provided', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await postMasterWallet(server, {}, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';

    const { status, headers, body } = await postMasterWallet(server, {}, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const { status, headers, body } = await postMasterWallet(server, {});

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Master Wallets', () => {
  test('Success, Without Query', async () => {
    const token = 'this.is.token';
    const query = '';

    const { status, headers, body } = await getMasterWallets(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?limit=1`', async () => {
    const token = 'this.is.token';
    const query = '?limit=1';

    const { status, headers, body } = await getMasterWallets(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
    // expect(body.data.length).toBe(1);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=created_at&search=&page=&limit=';

    const { status, headers, body } = await getMasterWallets(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=wallet_name&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=wallet_name&search=&page=&limit=';

    const { status, headers, body } = await getMasterWallets(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=wallet_description&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=wallet_description&search=&page=&limit=';

    const { status, headers, body } = await getMasterWallets(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=created_at&search=&page=&limit=';

    const { status, headers, body } = await getMasterWallets(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=wallet_name&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=wallet_name&search=&page=&limit=';

    const { status, headers, body } = await getMasterWallets(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=wallet_description&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=wallet_description&search=&page=&limit=';

    const { status, headers, body } = await getMasterWallets(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=';

    const { status, headers, body } = await getMasterWallets(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=';

    const { status, headers, body } = await getMasterWallets(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this.is.token';
    const query = '';

    const { status, headers, body } = await getMasterWallets(server, query, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const query = '';

    const { status, headers, body } = await getMasterWallets(server, query);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Update Master Wallet', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const walletId = 0;

    const { status, headers, body } = await updateMasterWallet(server, walletId, {}, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Wallet Not Found', async () => {
    const token = 'this.is.token';
    const walletId = 0;

    const { status, headers, body } = await updateMasterWallet(server, walletId, {}, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const walletId = 0;

    const { status, headers, body } = await updateMasterWallet(server, walletId, {}, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const walletId = 0;

    const { status, headers, body } = await updateMasterWallet(server, walletId, {});

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Change Master Wallet Logo', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const walletId = 0;

    const { status, headers, body } = await changeMasterWalletLogo(server, walletId, {}, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Change Wallet Logo Fail, No `logo` Provided', async () => {
    const token = 'this.is.token';
    const walletId = 0;

    const { status, headers, body } = await changeMasterWalletLogo(server, walletId, {}, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Delete Master Wallet', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const walletId = 0;

    const { status, headers, body } = await deleteMasterWallet(server, walletId, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Wallet Not Found', async () => {
    const token = 'this.is.token';
    const walletId = 0;

    const { status, headers, body } = await deleteMasterWallet(server, walletId, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const walletId = 0;

    const { status, headers, body } = await deleteMasterWallet(server, walletId, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const walletId = 0;

    const { status, headers, body } = await deleteMasterWallet(server, walletId);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Post Faq', () => {
  test('Success', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await postFaq(server, {}, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, No Data Provided', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await postFaq(server, {}, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';

    const { status, headers, body } = await postFaq(server, {}, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const { status, headers, body } = await postFaq(server, {});

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Faqs', () => {
  test('Success', async () => {
    const { status, headers, body } = await getFaqs(server);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });
});

describe('Update Faq', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const faqId = 0;

    const { status, headers, body } = await updateFaq(server, faqId, {}, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Faq Not Found', async () => {
    const token = 'this.is.token';
    const faqId = 0;

    const { status, headers, body } = await updateFaq(server, faqId, {}, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const faqId = 0;

    const { status, headers, body } = await updateFaq(server, faqId, {}, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const faqId = 0;

    const { status, headers, body } = await updateFaq(server, faqId, {});

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Delete Faq', () => {
  test('', async () => {
    const token = 'this.is.token';
    const faqId = 0;

    const { status, headers, body } = await deleteFaq(server, faqId, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Faq Not Found', async () => {
    const token = 'this.is.token';
    const faqId = 0;

    const { status, headers, body } = await deleteFaq(server, faqId, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const faqId = 0;

    const { status, headers, body } = await deleteFaq(server, faqId, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const faqId = 0;

    const { status, headers, body } = await deleteFaq(server, faqId);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});
