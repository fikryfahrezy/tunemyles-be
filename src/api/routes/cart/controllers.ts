import type { Request, RequestHandler } from '../../types/fasitify';
import type {
  ApiKeyHeader,
  IdRequestParams,
  AddToCartBody,
  CheckoutBody,
  UpdateCartItemQtyBody,
} from '../../types/schema';

export const addItemToCart: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: AddToCartBody }>
> = async function addItemToCart(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};

export const getCartItems: RequestHandler<
  Request<{ Headers: ApiKeyHeader }>
> = async function getCartItems(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const updateCartItemQty: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateCartItemQtyBody }>
> = async function updateCartItemQty(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const deleteCartItem: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function deleteCartItem(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const checkout: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: CheckoutBody }>
> = async function checkout(_, res): Promise<void> {
  await Promise.resolve('hi');

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};
