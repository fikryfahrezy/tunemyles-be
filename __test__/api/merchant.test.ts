import type { Server } from 'http';
import type { FastifyInstance } from 'fastify';
import app from '../../src/config/app';
import {
  sequelize,
  createProductCategory,
  fileDir,
  updateMerchantProfile,
  updateMerchantClosetime,
  getMerchantProfile,
  postMerchantProduct,
  getMerchantProducts,
  updateMerchantProduct,
  updateMerchantProductCover,
  updateMerchantProductStatus,
  bindMerchantProductCategory,
  getMerchantProductDetail,
  postMerchantProductImage,
  deleteMerchantProductCategory,
  deleteMerchantProductImage,
  deleteMerchantProduct,
  getMerchantOrders,
  getMerchantOrderDetail,
  updateMerchantOrderStatus,
  getMerchantList,
  getMerchantProductList,
  getRandomMerchant,
  getMerchantTransactionHistories,
  getMerchantIncomeHistories,
  createMerchantUser,
  createMerchantProduct,
  addCategory,
  bindProductCategory,
  addProductImage,
  createUserTransaction,
  createTransactionProduct,
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

describe('Update Merchant Profile', () => {
  const payload = {
    fields: {
      market_name: 'new name',
      market_address: 'new address',
      market_close_time: '12:00',
      market_lat: 123,
      market_lon: 123,
    },
  };

  test('Success', async () => {
    const { token } = await createMerchantUser();

    const { status, headers, body } = await updateMerchantProfile(server, payload, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';

    const { status, headers, body } = await updateMerchantProfile(server, payload, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key No Given', async () => {
    const { status, headers, body } = await updateMerchantProfile(server, payload);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Update Merchant Close Time', () => {
  const payload = { close_time: '10:00' };

  test('Success', async () => {
    const { token } = await createMerchantUser();

    const { status, headers, body } = await updateMerchantClosetime(server, payload, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, No `close_time` Provided', async () => {
    const { token } = await createMerchantUser();

    const { status, headers, body } = await updateMerchantClosetime(server, {}, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';

    const { status, headers, body } = await updateMerchantClosetime(server, payload, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key No Given', async () => {
    const { status, headers, body } = await updateMerchantClosetime(server, payload);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Merchant Profile', () => {
  test('Fail, Wrong API Key', async () => {
    const { token } = await createMerchantUser();

    const { status, headers, body } = await getMerchantProfile(server, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';

    const { status, headers, body } = await getMerchantProfile(server, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key No Given', async () => {
    const { status, headers, body } = await getMerchantProfile(server);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Post Merchant Product', () => {
  const payload = {
    fields: {
      product_name: 'name',
      description: 'description',
      normal_price: 123,
      selling_price: 123,
      qty: 1,
      discount: 10,
    },
    files: [{ fileDir, field: 'cover' }],
  };
  const { fields } = payload;

  test('Success, With Cover', async () => {
    const { token } = await createMerchantUser();

    const { status, headers, body } = await postMerchantProduct(server, payload, token);

    expect(status).toBe(201);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, Without Cover', async () => {
    const { token } = await createMerchantUser();

    const { status, headers, body } = await postMerchantProduct(server, { fields }, token);

    expect(status).toBe(201);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, No Data Provided', async () => {
    const { token } = await createMerchantUser();

    const { status, headers, body } = await postMerchantProduct(server, {}, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';

    const { status, headers, body } = await postMerchantProduct(server, { fields }, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key No Given', async () => {
    const { status, headers, body } = await postMerchantProduct(server, { fields });

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Merchant Products', () => {
  test('Success, Without Query', async () => {
    const { token } = await createMerchantUser();
    const query = '';

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?limit=1`', async () => {
    const { id, token } = await createMerchantUser();
    const query = '?limit=1';
    await Promise.all([createMerchantProduct(id), createMerchantProduct(id)]);

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
    expect(body.data.length).toBe(1);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=`', async () => {
    const { token } = await createMerchantUser();
    const query = '?orderDirection=DESC&orderBy=created_at&search=&page=';

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=product_name&search=&page=`', async () => {
    const { token } = await createMerchantUser();
    const query = '?orderDirection=DESC&orderBy=product_name&search=&page=';

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=market_name&search=&page=`', async () => {
    const { token } = await createMerchantUser();
    const query = '?orderDirection=DESC&orderBy=market_name&search=&page=';

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=market_address&search=&page=`', async () => {
    const { token } = await createMerchantUser();
    const query = '?orderDirection=DESC&orderBy=market_address&search=&page=';

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=`', async () => {
    const { token } = await createMerchantUser();
    const query = '?orderDirection=ASC&orderBy=created_at&search=&page=';

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=product_name&search=&page=`', async () => {
    const { token } = await createMerchantUser();
    const query = '?orderDirection=ASC&orderBy=product_name&search=&page=';

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=market_name&search=&page=`', async () => {
    const { token } = await createMerchantUser();
    const query = '?orderDirection=ASC&orderBy=market_name&search=&page=';

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=market_address&search=&page=`', async () => {
    const { token } = await createMerchantUser();
    const query = '?orderDirection=ASC&orderBy=market_address&search=&page=';

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=`', async () => {
    const { token } = await createMerchantUser();
    const query = '?orderDirection=DESCs&orderBy=created_at&search=&page=';

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=`', async () => {
    const { token } = await createMerchantUser();
    const query = '?orderDirection=DESC&orderBy=created_ats&search=&page=';

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const query = '';

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const query = '';

    const { status, headers, body } = await getMerchantProducts(server, query);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Update Merchant Product', () => {
  test('Success', async () => {
    const { id, token } = await createMerchantUser();
    const { productId } = await createMerchantProduct(id);
    const payload = {
      product_name: 'new name',
      description: 'new description',
      normal_price: 1234,
      selling_price: 1234,
      qty: 2,
      discount: 11,
    };

    const { status, headers, body } = await updateMerchantProduct(
      server,
      productId,
      payload,
      token,
    );

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Merchant Product Not Found', async () => {
    const { token } = await createMerchantUser();
    const productId = 0;

    const { status, headers, body } = await updateMerchantProduct(server, productId, {}, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const productId = 0;

    const { status, headers, body } = await updateMerchantProduct(server, productId, {}, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const productId = 0;

    const { status, headers, body } = await updateMerchantProduct(server, productId, {});

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Change Merchant Product Cover', () => {
  const payload = {
    files: [{ fileDir, field: 'cover' }],
  };

  test('Success', async () => {
    const { id, token } = await createMerchantUser();
    const { productId } = await createMerchantProduct(id);

    const { status, headers, body } = await updateMerchantProductCover(
      server,
      productId,
      payload,
      token,
    );

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, No `cover` Provided', async () => {
    const { token } = await createMerchantUser();
    const productId = 0;

    const { status, headers, body } = await updateMerchantProductCover(
      server,
      productId,
      {},
      token,
    );

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const productId = 0;

    const { status, headers, body } = await updateMerchantProductCover(
      server,
      productId,
      payload,
      token,
    );

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const productId = 0;

    const { status, headers, body } = await updateMerchantProductCover(server, productId, payload);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Update Merchant Product Status', () => {
  const payload = { status: 2 };

  test('Success', async () => {
    const { id, token } = await createMerchantUser();
    const { productId } = await createMerchantProduct(id);

    const { status, headers, body } = await updateMerchantProductStatus(
      server,
      productId,
      payload,
      token,
    );

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Merchant Product Not Found', async () => {
    const { token } = await createMerchantUser();
    const productId = 0;

    const { status, headers, body } = await updateMerchantProductStatus(
      server,
      productId,
      payload,
      token,
    );

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, No `status` Provided', async () => {
    const { token } = await createMerchantUser();
    const productId = 0;

    const { status, headers, body } = await updateMerchantProductStatus(
      server,
      productId,
      {},
      token,
    );

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const productId = 0;

    const { status, headers, body } = await updateMerchantProductStatus(
      server,
      productId,
      payload,
      token,
    );

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const productId = 0;

    const { status, headers, body } = await updateMerchantProductStatus(server, productId, payload);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Bind Merchant Product Category', () => {
  const payload = { category_id: 0 };

  test('Success', async () => {
    const { id, token } = await createMerchantUser();
    const { productId, categoryId } = await bindProductCategory(id);
    const payload = { category_id: categoryId };

    const { status, headers, body } = await bindMerchantProductCategory(
      server,
      productId,
      payload,
      token,
    );

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Category Not Found', async () => {
    const { id, token } = await createMerchantUser();
    const { productId } = await createMerchantProduct(id);

    const { status, headers, body } = await bindMerchantProductCategory(
      server,
      productId,
      payload,
      token,
    );

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Merchant Product Not Found', async () => {
    const [{ token }, { id: categoryId }] = await Promise.all([
      createMerchantUser(),
      addCategory(),
    ]);
    const productId = 0;
    const payload = { category_id: categoryId };

    const { status, headers, body } = await bindMerchantProductCategory(
      server,
      productId,
      payload,
      token,
    );

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, No `category_id` Provided', async () => {
    const { token } = await createMerchantUser();
    const productId = 0;

    const { status, headers, body } = await bindMerchantProductCategory(
      server,
      productId,
      {},
      token,
    );

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const productId = 0;

    const { status, headers, body } = await bindMerchantProductCategory(
      server,
      productId,
      payload,
      token,
    );

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const productId = 0;

    const { status, headers, body } = await bindMerchantProductCategory(server, productId, payload);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Post Merchant Product Image', () => {
  const payload = { files: [{ fileDir, field: 'image' }] };

  test('Success', async () => {
    const { id, token } = await createMerchantUser();
    const { productId } = await createMerchantProduct(id);

    const { status, headers, body } = await postMerchantProductImage(
      server,
      productId,
      payload,
      token,
    );

    expect(status).toBe(201);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, No `image` Provided', async () => {
    const { token } = await createMerchantUser();
    const productId = 0;

    const { status, headers, body } = await postMerchantProductImage(server, productId, {}, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const productId = 0;

    const { status, headers, body } = await postMerchantProductImage(
      server,
      productId,
      payload,
      token,
    );

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const productId = 0;

    const { status, headers, body } = await postMerchantProductImage(server, productId, payload);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Merchant Product Detail', () => {
  test('Success', async () => {
    const { id, token } = await createMerchantUser();
    const { productId } = await createMerchantProduct(id);

    const { status, headers, body } = await getMerchantProductDetail(server, productId, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Product Not Found', async () => {
    const { token } = await createMerchantUser();
    const productId = 0;

    const { status, headers, body } = await getMerchantProductDetail(server, productId, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const productId = 0;

    const { status, headers, body } = await getMerchantProductDetail(server, productId, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const productId = 0;

    const { status, headers, body } = await getMerchantProductDetail(server, productId);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Delete Merchant Product Category', () => {
  test('Success', async () => {
    const { id, token } = await createMerchantUser();
    const { productId, categoryId } = await bindProductCategory(id);
    const [{ id: productCategoryId }] = await createProductCategory(productId, categoryId);

    const { status, headers, body } = await deleteMerchantProductCategory(
      server,
      productCategoryId,
      token,
    );

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Merchant Product Category Not Found', async () => {
    const { token } = await createMerchantUser();
    const categoryId = 0;

    const { status, headers, body } = await deleteMerchantProductCategory(
      server,
      categoryId,
      token,
    );

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const categoryId = 0;

    const { status, headers, body } = await deleteMerchantProductCategory(
      server,
      categoryId,
      token,
    );

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const categoryId = 0;

    const { status, headers, body } = await deleteMerchantProductCategory(server, categoryId);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Delete Merchant Product Image', () => {
  test('Success', async () => {
    const { id, token } = await createMerchantUser();
    const { productImageId } = await addProductImage(id);

    const { status, headers, body } = await deleteMerchantProductImage(
      server,
      productImageId,
      token,
    );

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Merchant Product Image Not Found', async () => {
    const { token } = await createMerchantUser();
    const imageId = 0;

    const { status, headers, body } = await deleteMerchantProductImage(server, imageId, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const imageId = 0;

    const { status, headers, body } = await deleteMerchantProductImage(server, imageId, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const imageId = 0;

    const { status, headers, body } = await deleteMerchantProductImage(server, imageId);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Delete Merchant Product', () => {
  test('Success', async () => {
    const { id, token } = await createMerchantUser();
    const { productId } = await createMerchantProduct(id);

    const { status, headers, body } = await deleteMerchantProduct(server, productId, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Merchant Product Not Found', async () => {
    const { token } = await createMerchantUser();
    const productId = 0;

    const { status, headers, body } = await deleteMerchantProduct(server, productId, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const productId = 0;

    const { status, headers, body } = await deleteMerchantProduct(server, productId, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const productId = 0;

    const { status, headers, body } = await deleteMerchantProduct(server, productId);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Merchant Orders', () => {
  test('Success, Without Query', async () => {
    const { token } = await createMerchantUser();
    const query = '';

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?limit=1`', async () => {
    const { id, token } = await createMerchantUser();
    const query = '?limit=1';
    await Promise.all([createUserTransaction(id), createUserTransaction(id)]);

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
    expect(body.data.length).toBe(1);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=&status=0`', async () => {
    const { token } = await createMerchantUser();
    const query = '?orderDirection=DESC&orderBy=created_at&search=&page=&limit=&status=0';

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=full_name&search=&page=&limit=&status=0`', async () => {
    const { token } = await createMerchantUser();
    const query = '?orderDirection=DESC&orderBy=full_name&search=&page=&limit=&status=0';

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=phone_number&search=&page=&limit=&status=0`', async () => {
    const { token } = await createMerchantUser();
    const query = '?orderDirection=DESC&orderBy=phone_number&search=&page=&limit=&status=0';

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=address&search=&page=&limit=&status=0`', async () => {
    const { token } = await createMerchantUser();
    const query = '?orderDirection=DESC&orderBy=address&search=&page=&limit=&status=0';

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=&status=0`', async () => {
    const { token } = await createMerchantUser();
    const query = '?orderDirection=ASC&orderBy=created_at&search=&page=&limit=&status=0';

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=full_name&search=&page=&limit=&status=0`', async () => {
    const { token } = await createMerchantUser();
    const query = '?orderDirection=ASC&orderBy=full_name&search=&page=&limit=&status=0';

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=phone_number&search=&page=&limit=&status=0`', async () => {
    const { token } = await createMerchantUser();
    const query = '?orderDirection=ASC&orderBy=phone_number&search=&page=&limit=&status=0';

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=address&search=&page=&limit=&status=0`', async () => {
    const { token } = await createMerchantUser();
    const query = '?orderDirection=ASC&orderBy=address&search=&page=&limit=&status=0';

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=', async () => {
    const { token } = await createMerchantUser();
    const query = '?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=';

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`', async () => {
    const { token } = await createMerchantUser();
    const query = '?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=';

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const query = '';

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const query = '';

    const { status, headers, body } = await getMerchantOrders(server, query);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Merchant Order Detail', () => {
  test('Success', async () => {
    const { id, token } = await createMerchantUser();
    const { transactionId: orderId } = await createTransactionProduct(id);

    const { status, headers, body } = await getMerchantOrderDetail(server, orderId, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Merchant Order Not Found', async () => {
    const { token } = await createMerchantUser();
    const orderId = 0;

    const { status, headers, body } = await getMerchantOrderDetail(server, orderId, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const orderId = 0;

    const { status, headers, body } = await getMerchantOrderDetail(server, orderId, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const orderId = 0;

    const { status, headers, body } = await getMerchantOrderDetail(server, orderId);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Update Merchant Order Status', () => {
  const payload = { status: 1 };

  test('Success, Not Accept the Order', async () => {
    const { id, token } = await createMerchantUser();
    const { transactionId: orderId } = await createTransactionProduct(id);

    const { status, headers, body } = await updateMerchantOrderStatus(
      server,
      orderId,
      payload,
      token,
    );

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Order Not Found', async () => {
    const { token } = await createMerchantUser();
    const orderId = 0;

    const { status, headers, body } = await updateMerchantOrderStatus(
      server,
      orderId,
      payload,
      token,
    );

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, No `status` Provided', async () => {
    const { token } = await createMerchantUser();
    const orderId = 0;

    const { status, headers, body } = await updateMerchantOrderStatus(server, orderId, {}, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const orderId = 0;

    const { status, headers, body } = await updateMerchantOrderStatus(
      server,
      orderId,
      payload,
      token,
    );

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const orderId = 0;

    const { status, headers, body } = await updateMerchantOrderStatus(server, orderId, payload);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Merchant List', () => {
  test('Success, Without Query', async () => {
    const query = '';

    const { status, headers, body } = await getMerchantList(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?limit=1`', async () => {
    const query = '?limit=1';
    await Promise.all([createMerchantUser(), createMerchantUser()]);

    const { status, headers, body } = await getMerchantList(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
    expect(body.data.length).toBe(1);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=`', async () => {
    const query = '?orderDirection=DESC&orderBy=created_at&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=full_name&search=&page=`', async () => {
    const query = '?orderDirection=DESC&orderBy=full_name&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=phone_number&search=&page=`', async () => {
    const query = '?orderDirection=DESC&orderBy=phone_number&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=market_name&search=&page=`', async () => {
    const query = '?orderDirection=DESC&orderBy=market_name&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=market_address&search=&page=`', async () => {
    const query = '?orderDirection=DESC&orderBy=market_address&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=`', async () => {
    const query = '?orderDirection=ASC&orderBy=created_at&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=full_name&search=&page=`', async () => {
    const query = '?orderDirection=ASC&orderBy=full_name&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=phone_number&search=&page=`', async () => {
    const query = '?orderDirection=ASC&orderBy=phone_number&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=market_name&search=&page=`', async () => {
    const query = '?orderDirection=ASC&orderBy=market_name&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=market_address&search=&page=`', async () => {
    const query = '?orderDirection=ASC&orderBy=market_address&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=`', async () => {
    const query = '?orderDirection=DESCs&orderBy=created_at&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=`', async () => {
    const query = '?orderDirection=DESC&orderBy=created_ats&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Merchant Product List', () => {
  test('Success', async () => {
    const { id: merchantId } = await createMerchantUser();

    const { status, headers, body } = await getMerchantProductList(server, merchantId);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Merchant Not Found', async () => {
    const merchantId = 0;

    const { status, headers, body } = await getMerchantProductList(server, merchantId);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Random Merchants', () => {
  test('Success, Without Query', async () => {
    const query = '';

    const { status, headers, body } = await getRandomMerchant(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?limit=1`', async () => {
    const query = '?limit=1';
    await Promise.all([createMerchantUser(), createMerchantUser()]);

    const { status, headers, body } = await getRandomMerchant(server, query);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
    expect(body.data.length).toBe(1);
  });
});

describe('Get Merchant Transaction Histories', () => {
  test('Success, Without Query', async () => {
    const { token } = await createMerchantUser();
    const query = '';

    const { status, headers, body } = await getMerchantTransactionHistories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?date=2021-2-3`', async () => {
    const { token } = await createMerchantUser();
    const query = '?date=2021-2-3';

    const { status, headers, body } = await getMerchantTransactionHistories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const query = '';

    const { status, headers, body } = await getMerchantTransactionHistories(server, query, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const query = '';

    const { status, headers, body } = await getMerchantTransactionHistories(server, query);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Merchant Income Histories', () => {
  test('Success, Without Query', async () => {
    const { token } = await createMerchantUser();
    const query = '';

    const { status, headers, body } = await getMerchantIncomeHistories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?year=2021`', async () => {
    const { token } = await createMerchantUser();
    const query = '?year=2021';

    const { status, headers, body } = await getMerchantIncomeHistories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const query = '';

    const { status, headers, body } = await getMerchantIncomeHistories(server, query, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const query = '';

    const { status, headers, body } = await getMerchantIncomeHistories(server, query);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});
