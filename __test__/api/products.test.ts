import type { Server } from 'http';
import type { FastifyInstance } from 'fastify';
import app from '../../src/config/app';
import {
  sequelize,
  getProducts,
  getProductsByCategory,
  createMerchantUser,
  createMerchantProduct,
  createProductWithCategory,
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

describe('Get Products', () => {
  test('Success, Without Query', async () => {
    const query = '';

    const { status, headers, body } = await getProducts(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?limit=1`', async () => {
    const query = '?limit=1';
    const { id } = await createMerchantUser();
    await Promise.all([createMerchantProduct(id), createMerchantProduct(id)]);

    const { status, headers, body } = await getProducts(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
    expect(body.data.length).toBe(1);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=`', async () => {
    const query = '?orderDirection=DESC&orderBy=created_at&search=&page=&limit=';

    const { status, headers, body } = await getProducts(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=product_name&search=&page=&limit=`', async () => {
    const query = '?orderDirection=DESC&orderBy=product_name&search=&page=&limit=';

    const { status, headers, body } = await getProducts(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=market_name&search=&page=&limit=`', async () => {
    const query = '?orderDirection=DESC&orderBy=market_name&search=&page=&limit=';

    const { status, headers, body } = await getProducts(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=market_address&search=&page=&limit=`', async () => {
    const query = '?orderDirection=DESC&orderBy=market_address&search=&page=&limit=';

    const { status, headers, body } = await getProducts(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=`', async () => {
    const query = '?orderDirection=ASC&orderBy=created_at&search=&page=&limit=';

    const { status, headers, body } = await getProducts(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=product_name&search=&page=&limit=`', async () => {
    const query = '?orderDirection=ASC&orderBy=product_name&search=&page=&limit=';

    const { status, headers, body } = await getProducts(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=market_name&search=&page=&limit=', async () => {
    const query = '?orderDirection=ASC&orderBy=market_name&search=&page=&limit=';

    const { status, headers, body } = await getProducts(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=market_address&search=&page=&limit=`', async () => {
    const query = '?orderDirection=ASC&orderBy=market_address&search=&page=&limit=';

    const { status, headers, body } = await getProducts(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, with Query `?orderDirection=ASC&orderBy=market_name&search=&page=&limit=`', async () => {
    const query = '?orderDirection=ASC&orderBy=market_name&search=&page=&limit=`';

    const { status, headers, body } = await getProducts(server, query);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`', async () => {
    const query = '?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`';

    const { status, headers, body } = await getProducts(server, query);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Products by Category', () => {
  test('Success, Without Query', async () => {
    const query = '';
    const { categoryId } = await createProductWithCategory(1);

    const { status, headers, body } = await getProductsByCategory(server, categoryId, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, Without Query and Category Not Found', async () => {
    const categoryId = 9999;
    const query = '';
    await createProductWithCategory(1);

    const { status, headers, body } = await getProductsByCategory(server, categoryId, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
    expect(body.data.length).toBe(0);
  });

  test('Success, with Query `?limit=1`', async () => {
    const query = '?limit=1';
    const { categoryId } = await createProductWithCategory(2);

    const { status, headers, body } = await getProductsByCategory(server, categoryId, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
    expect(body.data.length).toBe(1);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=`', async () => {
    const query = '?orderDirection=DESC&orderBy=created_at&search=&page=&limit=';
    const { categoryId } = await createProductWithCategory(1);

    const { status, headers, body } = await getProductsByCategory(server, categoryId, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=product_name&search=&page=&limit=`', async () => {
    const query = '?orderDirection=DESC&orderBy=product_name&search=&page=&limit=';
    const { categoryId } = await createProductWithCategory(1);

    const { status, headers, body } = await getProductsByCategory(server, categoryId, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=market_name&search=&page=&limit=`', async () => {
    const query = '?orderDirection=DESC&orderBy=market_name&search=&page=&limit=';
    const { categoryId } = await createProductWithCategory(1);

    const { status, headers, body } = await getProductsByCategory(server, categoryId, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=market_address&search=&page=&limit=`', async () => {
    const query = '?orderDirection=DESC&orderBy=market_address&search=&page=&limit=';
    const { categoryId } = await createProductWithCategory(1);

    const { status, headers, body } = await getProductsByCategory(server, categoryId, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=`', async () => {
    const query = '?orderDirection=ASC&orderBy=created_at&search=&page=&limit=';
    const { categoryId } = await createProductWithCategory(1);

    const { status, headers, body } = await getProductsByCategory(server, categoryId, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=product_name&search=&page=&limit=`', async () => {
    const query = '?orderDirection=ASC&orderBy=product_name&search=&page=&limit=';
    const { categoryId } = await createProductWithCategory(1);

    const { status, headers, body } = await getProductsByCategory(server, categoryId, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=market_name&search=&page=&limit=', async () => {
    const query = '?orderDirection=ASC&orderBy=market_name&search=&page=&limit=';
    const { categoryId } = await createProductWithCategory(1);

    const { status, headers, body } = await getProductsByCategory(server, categoryId, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=market_address&search=&page=&limit=`', async () => {
    const query = '?orderDirection=ASC&orderBy=market_address&search=&page=&limit=';
    const { categoryId } = await createProductWithCategory(1);

    const { status, headers, body } = await getProductsByCategory(server, categoryId, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=`', async () => {
    const categoryId = 0;
    const query = '?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=`';

    const { status, headers, body } = await getProductsByCategory(server, categoryId, query);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`', async () => {
    const categoryId = 0;
    const query = '?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`';

    const { status, headers, body } = await getProductsByCategory(server, categoryId, query);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});
