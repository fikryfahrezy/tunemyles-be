import type { PreHandlerFn, RequestHandler } from '../types/fasitify';
import sequelize from '../../databases/sequelize';
import { errorHandler } from './error-handler';

export const controllerWrapper = function controllerWrapper<T>(
  fn: RequestHandler<T>,
): RequestHandler<T> {
  return async function controllerWrapperFn(this, req, res) {
    const boundFn = fn.bind(this);
    if (req.method === 'GET') {
      return Promise.resolve(boundFn(req, res)).catch((err) => {
        errorHandler(err, res);
      });
    }

    return await sequelize.transaction(async () => (
      /**
       * This comment just to help eslint not to get confused
       * with max-len rule and formatting
       */
      Promise.resolve(boundFn(req, res)).catch((err) => {
        errorHandler(err, res);
      })));
  };
};

export const handlerWrapper = function handlerWrapper<T>(
  fn: PreHandlerFn<T>,
): PreHandlerFn<T> {
  return async function handlerWrapperFn(req, res) {
    return Promise.resolve(fn(req, res)).catch((err) => {
      errorHandler(err, res);
    });
  };
};
