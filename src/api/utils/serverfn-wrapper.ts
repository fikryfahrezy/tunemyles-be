import type { PreHandlerFn, RequestHandler } from '../types/fasitify';
import sequelize from '../../databases/sequelize';
import { errorHandler } from './error-handler';

export const controllerWrapper = function controllerWrapper<T>(
  fn: RequestHandler<T>,
): RequestHandler<T> {
  return async function controllerWrapperFn(this, req, res) {
    try {
      const boundFn = fn.bind(this);
      if (req.method === 'GET') {
        await boundFn(req, res);
      } else {
        await sequelize.transaction(async () => {
          await boundFn(req, res);
        });
      }
    } catch (err) {
      errorHandler(err, res);
    }
  };
};

export const handlerWrapper = function handlerWrapper<T>(
  fn: PreHandlerFn<T>,
): PreHandlerFn<T> {
  return async function handlerWrapperFn(req, res) {
    try {
      await fn(req, res);
    } catch (err) {
      errorHandler(err, res);
    }
  };
};
