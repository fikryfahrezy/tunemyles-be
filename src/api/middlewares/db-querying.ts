import { preHandlerHookHandler } from 'fastify';

type SequelQuerying = (modelname: string) => preHandlerHookHandler;
const sequelizeQuerying: SequelQuerying = function sequelizeQuerying() {
  return function sequelizeQueryingFn() {
    //   const { page, orderBy, orderDirection, limit } = ctx.request.query;
    //   const pagination = {};
    //   const order = {
    //     field: "created_at",
    //     direction: "DESC",
    //   };
    //   const dataLimit = limit ? parseInt(limit) : 10;
    //   const availableOrder = ["ASC", "DESC"];
    //   let availableFields;
    //   if (modelName === "m_products")
    //     availableFields = ["product_name", "market_name", "market_address"];
    //   else if (modelName === "u_user_transaction")
    //     availableFields = ["full_name", "phone_number", "address"];
    //   else if (modelName === "u_user_is_merchant")
    //     availableFields = [
    //       "full_name",
    //       "phone_number",
    //       "market_name",
    //       "market_address",
    //     ];
    //   else if (modelName === "m_banks") availableFields = ["bank_name"];
    //   else if (modelName === "m_categories")
    //     availableFields = ["category", "description"];
    //   else if (modelName === "m_medias") availableFields = ["label"];
    //   else if (modelName === "m_wallets")
    //     availableFields = ["wallet_name", "wallet_description"];
    //   else if (modelName === "u_user_wallet_top_up")
    //     availableFields = ["balance_request", "balance_transfer"];
    //   else if (modelName === "u_user_wallet_withdraw")
    //     availableFields = ["balance_request"];
    //   /**
    //    * PAGINATION FORMULA
    //    * - RESULT = START = (PAGE - 1) * LIMIT && END = (PAGE * LIMIT) - 1 || END = PAGE * LIMIT
    //    */
    //   const start = page > 0 ? (parseInt(page) - 1) * dataLimit : 0;
    //   pagination.offset = start;
    //   pagination.limit = dataLimit;
    //   if (orderBy && availableFields.includes(orderBy)) {
    //     order.field = orderBy;
    //   }
    //   if (orderDirection && availableOrder.includes(orderDirection)) {
    //     order.direction = orderDirection;
    //   }
    //   ctx.state.query = {
    //     ...pagination,
    //     order: [[order.field, order.direction]],
    //     availableFields,
    //   };
    //   await next();
  };
};

export default sequelizeQuerying;
