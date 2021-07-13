import type { Server } from 'http';
import type { FastifyInstance } from 'fastify';
import app from '../../src/config/app';
import {
  sequelize,
  addItemToCart,
  getCartItems,
  updateCartItemQty,
  deleteCartItem,
  checkout,
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

describe('Add Item to Cart', () => {
  test('Success', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await addItemToCart(server, {}, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, No Data Provided', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await addItemToCart(server, {}, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';

    const { status, headers, body } = await addItemToCart(server, {}, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const { status, headers, body } = await addItemToCart(server, {});

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Get Cart Items', () => {
  test('Success', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await getCartItems(server, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';

    const { status, headers, body } = await getCartItems(server, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const { status, headers, body } = await getCartItems(server);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Update Cart Item Qty', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const cartItemId = 0;

    const { status, headers, body } = await updateCartItemQty(server, cartItemId, {}, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Cart Item Not Found', async () => {
    const token = 'this.is.token';
    const cartItemId = 0;

    const { status, headers, body } = await updateCartItemQty(server, cartItemId, {}, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, No `qty` Provided', async () => {
    const token = 'this.is.token';
    const cartItemId = 0;

    const { status, headers, body } = await updateCartItemQty(server, cartItemId, {}, token);

    expect(status).toBe(422);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const cartItemId = 0;

    const { status, headers, body } = await updateCartItemQty(server, cartItemId, {}, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const cartItemId = 0;

    const { status, headers, body } = await updateCartItemQty(server, cartItemId, {});

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Delete Cart Item', () => {
  test('Success', async () => {
    const token = 'this.is.token';
    const cartItemId = 0;

    const { status, headers, body } = await deleteCartItem(server, cartItemId, token);

    expect(status).toBe(200);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Cart Item Not Found', async () => {
    const token = 'this.is.token';
    const cartItemId = 0;

    const { status, headers, body } = await deleteCartItem(server, cartItemId, token);

    expect(status).toBe(404);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';
    const cartItemId = 0;

    const { status, headers, body } = await deleteCartItem(server, cartItemId, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const cartItemId = 0;

    const { status, headers, body } = await deleteCartItem(server, cartItemId);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});

describe('Checkout', () => {
  test('Fail, Cart Item Not Found', async () => {
    const token = 'this.is.token';

    const { status, headers, body } = await checkout(server, {}, token);

    expect(status).toBe(201);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(true);
  });

  test('Fail, Wrong API Key', async () => {
    const token = 'this-is-wrong-token';

    const { status, headers, body } = await checkout(server, {}, token);

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });

  test('Fail, API Key Not Given', async () => {
    const { status, headers, body } = await checkout(server, {});

    expect(status).toBe(403);
    expect(headers['content-type']).toBe('application/json; charset=utf-8');
    expect(body.success).toBe(false);
  });
});
