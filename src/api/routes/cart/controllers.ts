import type { Request, RequestHandler } from '../../types/fasitify';
import type CustModelType from '../../types/model';
import type {
  ApiKeyHeader,
  IdRequestParams,
  AddToCartBody,
  UpdateCartItemQtyBody,
  CheckoutBody,
} from '../../types/schema';
import {
  addToCart,
  getCartItemData,
  changeCartItemQty,
  removeCartItem,
  cartCheckout,
} from './service';

export const addItemToCart: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: AddToCartBody }>
> = async function addItemToCart(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');

  if (!userToken) {
    res.unauthorized();

    return;
  }

  await addToCart(userToken.userId, req.body);

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};

export const getCartItems: RequestHandler<
  Request<{ Headers: ApiKeyHeader }>
> = async function getCartItems(_, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');

  if (!userToken) {
    res.unauthorized();

    return;
  }

  const resData = await getCartItemData(userToken.userId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
    data: resData,
  });
};

export const updateCartItemQty: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams; Body: UpdateCartItemQtyBody }>
> = async function updateCartItemQty(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');
  const cartItemId = parseInt(req.params.id, 10) || -1;

  if (cartItemId <= 0) {
    res.notFound();

    return;
  }

  if (!userToken) {
    res.unauthorized();

    return;
  }

  await changeCartItemQty(cartItemId, userToken.userId, req.body);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const deleteCartItem: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Params: IdRequestParams }>
> = async function deleteCartItem(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');
  const cartItemId = parseInt(req.params.id, 10) || -1;

  if (cartItemId <= 0) {
    res.notFound();

    return;
  }

  if (!userToken) {
    res.unauthorized();

    return;
  }

  await removeCartItem(cartItemId, userToken.userId);

  res.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 200,
    success: true,
    message: 'success',
  });
};

export const checkout: RequestHandler<
  Request<{ Headers: ApiKeyHeader; Body: CheckoutBody }>
> = async function checkout(req, res): Promise<void> {
  const userToken = this.requestContext.get<CustModelType['UserToken']>('usertoken');

  if (!userToken) {
    res.unauthorized();

    return;
  }

  await cartCheckout(userToken.userId, req.body);

  res.status(201).header('Content-Type', 'application/json; charset=utf-8').send({
    code: 201,
    success: true,
    message: 'success',
  });
};
