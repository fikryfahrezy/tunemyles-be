import type { FastifyRequest, FastifyReply } from 'fastify';
import type { GetQuery } from '../types/schema';
import type CustModelType from '../types/model';

const dbQuerying: (
  modelName:
    | 'PRODUCT'
    | 'USER_TRANSACTION'
    | 'MERCHANT'
    | 'BANK'
    | 'CATEGORY'
    | 'MEDIA'
    | 'WALLET'
    | 'TOP_UP'
    | 'WITHDRAW',
) => (
  req: FastifyRequest<{ Querystring: GetQuery }>,
  res: FastifyReply,
) => void = function dbQuerying(modelName) {
  return function queryHandler(req) {
    const availableOrder = ['ASC', 'DESC'];
    let availableFields: string[] = [];

    switch (modelName) {
      case 'PRODUCT':
        availableFields = ['product_name', 'market_name', 'market_address'];
        break;
      case 'USER_TRANSACTION':
        availableFields = ['full_name', 'phone_number', 'address'];
        break;
      case 'MERCHANT':
        availableFields = ['full_name', 'phone_number', 'market_name', 'market_address'];
        break;
      case 'BANK':
        availableFields = ['bank_name'];
        break;
      case 'CATEGORY':
        availableFields = ['category', 'description'];
        break;
      case 'MEDIA':
        availableFields = ['label'];
        break;
      case 'WALLET':
        availableFields = ['wallet_name', 'wallet_description'];
        break;
      case 'TOP_UP':
        availableFields = ['balance_request', 'balance_transfer'];
        break;
      case 'WITHDRAW':
        availableFields = ['balance_request'];
        break;
      default:
        availableFields = [];
    }

    const { page, orderBy, orderDirection, limit } = req.query;
    const pagination: { offset: number; limit: number } = {
      offset: 0,
      limit: 10,
    };
    const order: { field: string; direction: string } = {
      field: 'created_at',
      direction: 'DESC',
    };
    const dataLimit = limit ? parseInt(limit, 10) : 10;

    /**
     * PAGINATION FORMULA
     * - RESULT = START = (PAGE - 1) * LIMIT && END = (PAGE * LIMIT) - 1 || END = PAGE * LIMIT
     */
    pagination.offset = page && Number(page) > 0 ? (parseInt(page, 10) - 1) * dataLimit : 0;
    pagination.limit = dataLimit;

    if (orderBy && availableFields.includes(orderBy)) order.field = orderBy;

    if (orderDirection && availableOrder.includes(orderDirection)) order.direction = orderDirection;

    req.requestContext.set<CustModelType['SearchQuery']>('query', {
      ...pagination,
      order,
      availableFields,
    });
  };
};

export default dbQuerying;
