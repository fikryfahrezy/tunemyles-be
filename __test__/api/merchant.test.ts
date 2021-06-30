import type { Server } from 'http';
import type { FastifyInstance } from 'fastify';
import app from '../../src/config/app';
import sequelize from '../../src/databases/sequelize';
import {
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
  getMerchantIncomHistories,
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
  test('Success', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await updateMerchantProfile(server, {}, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';

    const { status, headers, body } = await updateMerchantProfile(server, {}, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key No Given', async () => {
    const { status, headers, body } = await updateMerchantProfile(server, {});

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Update Merchant Close Time', () => {
  test('Success', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await updateMerchantClosetime(server, {}, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, No `close_time` Provided', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await updateMerchantClosetime(server, {}, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';

    const { status, headers, body } = await updateMerchantClosetime(server, {}, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key No Given', async () => {
    const { status, headers, body } = await updateMerchantClosetime(server, {});

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Merchant Profile', () => {
  test('Fail, Wrong API Key', async () => {
    const token = 'this.is.token';

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
  test('Success', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await postMerchantProduct(server, {}, token);

    expect(status).toBe(201);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, No Data Provided', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await postMerchantProduct(server, {}, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Merchant Products', () => {
  test('Success, Without Query', async () => {
    const token = 'this.is.token';
    const query = '';

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?limit=1`', async () => {
    const token = 'this.is.token';
    const query = '?limit=1';

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
    // expect(body.data.length).toBe(1);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=created_at&search=&page=';

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=product_name&search=&page=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=product_name&search=&page=';

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=market_name&search=&page=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=market_name&search=&page=';

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=market_address&search=&page=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=market_address&search=&page=';

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=created_at&search=&page=';

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=product_name&search=&page=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=product_name&search=&page=';

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=market_name&search=&page=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=market_name&search=&page=';

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=market_address&search=&page=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=market_address&search=&page=';

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, with Query `?orderDirection=ASC&orderBy=market_name&search=&page=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=market_name&search=&page=';

    const { status, headers, body } = await getMerchantProducts(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=`', async () => {
    const token = 'this.is.token';
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

describe('Post Merchant Product Image', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const productId = 0;

    const { status, headers, body } = await postMerchantProductImage(server, productId, {}, token);

    expect(status).toBe(201);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, No `image` Provided', async () => {
    const token = 'this.is.token';
    const productId = 0;

    const { status, headers, body } = await postMerchantProductImage(server, productId, {}, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Merchant Product Detail', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const productId = 0;

    const { status, headers, body } = await getMerchantProductDetail(server, productId, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Merchant Product Not Found', async () => {
    const token = 'this.is.token';
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

describe('Update Merchant Product', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const productId = 0;

    const { status, headers, body } = await updateMerchantProduct(server, productId, {}, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Merchant Produc Not Found', async () => {
    const token = 'this.is.token';
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
  test('Success', async () => {
    const token = 'this.is.token';
    const productId = 0;

    const { status, headers, body } = await updateMerchantProductCover(
      server,
      productId,
      {},
      token,
    );

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, No `cover` Provided', async () => {
    const token = 'this.is.token';
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
});

describe('Update Merchant Product Status', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const productId = 0;

    const { status, headers, body } = await updateMerchantProductStatus(
      server,
      productId,
      {},
      token,
    );

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Merchant Product Not Found', async () => {
    const token = 'this.is.token';
    const productId = 0;

    const { status, headers, body } = await updateMerchantProductStatus(
      server,
      productId,
      {},
      token,
    );

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, No `status` Provided', async () => {
    const token = 'this.is.token';
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
      {},
      token,
    );

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const productId = 0;

    const { status, headers, body } = await updateMerchantProductStatus(server, productId, {});

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Bind Merchant Product Category', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const productId = 0;

    const { status, headers, body } = await bindMerchantProductCategory(
      server,
      productId,
      {},
      token,
    );

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Category Not Found', async () => {
    const token = 'this.is.token';
    const productId = 0;

    const { status, headers, body } = await bindMerchantProductCategory(
      server,
      productId,
      {},
      token,
    );

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Merchant Product Category Not Found', async () => {
    const token = 'this.is.token';
    const productId = 0;

    const { status, headers, body } = await bindMerchantProductCategory(
      server,
      productId,
      {},
      token,
    );

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, No `category_id` Provided', async () => {
    const token = 'this.is.token';
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
      {},
      token,
    );

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const productId = 0;

    const { status, headers, body } = await bindMerchantProductCategory(server, productId, {});

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Delete Merchant Product Category', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const productId = 0;
    const categoryId = 0;

    const { status, headers, body } = await deleteMerchantProductCategory(
      server,
      productId,
      categoryId,
      token,
    );

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Merchant Product Category Not Found', async () => {
    const token = 'this.is.token';
    const productId = 0;
    const categoryId = 0;

    const { status, headers, body } = await deleteMerchantProductCategory(
      server,
      productId,
      categoryId,
      token,
    );

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Merchant Product Not Found', async () => {
    const token = 'this.is.token';
    const productId = 0;
    const categoryId = 0;

    const { status, headers, body } = await deleteMerchantProductCategory(
      server,
      productId,
      categoryId,
      token,
    );

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const productId = 0;
    const categoryId = 0;

    const { status, headers, body } = await deleteMerchantProductCategory(
      server,
      productId,
      categoryId,
      token,
    );

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const productId = 0;
    const categoryId = 0;

    const { status, headers, body } = await deleteMerchantProductCategory(
      server,
      productId,
      categoryId,
    );

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Delete Merchant Product Image', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const imageId = 0;

    const { status, headers, body } = await deleteMerchantProductImage(server, imageId, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Merchant Product Image Not Found', async () => {
    const token = 'this.is.token';
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
    const token = 'this.is.token';
    const productId = 0;

    const { status, headers, body } = await deleteMerchantProduct(server, productId, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Merchant Product Not Found', async () => {
    const token = 'this.is.token';
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
    const token = 'this.is.token';
    const query = '';

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?limit=1`', async () => {
    const token = 'this.is.token';
    const query = '?limit=1';

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
    // expect(body.data.length).toBe(1);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=created_at&search=&page=&limit=&status=0';

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=full_name&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=full_name&search=&page=&limit=&status=0';

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=phone_number&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=phone_number&search=&page=&limit=&status=0';

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=address&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=address&search=&page=&limit=&status=0';

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=created_at&search=&page=&limit=&status=0';

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=full_name&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=full_name&search=&page=&limit=&status=0';

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=phone_number&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=phone_number&search=&page=&limit=&status=0';

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=address&search=&page=&limit=&status=0`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=address&search=&page=&limit=&status=0';

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=';

    const { status, headers, body } = await getMerchantOrders(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`', async () => {
    const token = 'this.is.token';
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
    const token = 'this.is.token';
    const orderId = 0;

    const { status, headers, body } = await getMerchantOrderDetail(server, orderId, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Merchant Order Not Found', async () => {
    const token = 'this.is.token';
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
  test('Success', async () => {
    const token = 'this.is.token';
    const orderId = 0;

    const { status, headers, body } = await updateMerchantOrderStatus(server, orderId, {}, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Order Not Found', async () => {
    const token = 'this.is.token';
    const orderId = 0;

    const { status, headers, body } = await updateMerchantOrderStatus(server, orderId, {}, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, No `status` Provided', async () => {
    const token = 'this.is.token';
    const orderId = 0;

    const { status, headers, body } = await updateMerchantOrderStatus(server, orderId, {}, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const orderId = 0;

    const { status, headers, body } = await updateMerchantOrderStatus(server, orderId, {}, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const orderId = 0;

    const { status, headers, body } = await updateMerchantOrderStatus(server, orderId, {});

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Merchant List', () => {
  test('Success, Without Query', async () => {
    const token = 'this.is.token';
    const query = '';

    const { status, headers, body } = await getMerchantList(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?limit=1`', async () => {
    const token = 'this.is.token';
    const query = '?limit=1';

    const { status, headers, body } = await getMerchantList(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
    // expect(body.data.length).toBe(1);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=created_at&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=full_name&search=&page=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=full_name&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=phone_number&search=&page=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=phone_number&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=market_name&search=&page=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=market_name&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=DESC&orderBy=market_address&search=&page=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=market_address&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=created_at&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=full_name&search=&page=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=full_name&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=phone_number&search=&page=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=phone_number&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=market_name&search=&page=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=market_name&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?orderDirection=ASC&orderBy=market_address&search=&page=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=market_address&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, with Query `?orderDirection=ASC&orderBy=market_name&search=&page=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=ASC&orderBy=market_name&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=`', async () => {
    const token = 'this.is.token';
    const query = '?orderDirection=DESC&orderBy=created_ats&search=&page=';

    const { status, headers, body } = await getMerchantList(server, query, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const query = '';

    const { status, headers, body } = await getMerchantList(server, query, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const query = '';

    const { status, headers, body } = await getMerchantList(server, query);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Merchant Product List', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const merchantId = 0;

    const { status, headers, body } = await getMerchantProductList(server, merchantId, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Merchant Not Found', async () => {
    const token = 'this.is.token';
    const merchantId = 0;

    const { status, headers, body } = await getMerchantProductList(server, merchantId, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const merchantId = 0;

    const { status, headers, body } = await getMerchantProductList(server, merchantId, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const merchantId = 0;

    const { status, headers, body } = await getMerchantProductList(server, merchantId);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Random Merchants', () => {
  test('Success, Without Query', async () => {
    const token = 'this.is.token';
    const query = '';

    const { status, headers, body } = await getRandomMerchant(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?limit=1`', async () => {
    const token = 'this.is.token';
    const query = '?limit=1';

    const { status, headers, body } = await getRandomMerchant(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const query = '';

    const { status, headers, body } = await getRandomMerchant(server, query, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const query = '';

    const { status, headers, body } = await getRandomMerchant(server, query);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Merchant Transaction Histories', () => {
  test('Success, Without Query', async () => {
    const token = 'this.is.token';
    const query = '';

    const { status, headers, body } = await getMerchantTransactionHistories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?date=2021-2-3`', async () => {
    const token = 'this.is.token';
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
    const token = 'this.is.token';
    const query = '';

    const { status, headers, body } = await getMerchantIncomHistories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Success, with Query `?year=2021`', async () => {
    const token = 'this.is.token';
    const query = '?year=2021';

    const { status, headers, body } = await getMerchantIncomHistories(server, query, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const query = '';

    const { status, headers, body } = await getMerchantIncomHistories(server, query, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const query = '';

    const { status, headers, body } = await getMerchantIncomHistories(server, query);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});
