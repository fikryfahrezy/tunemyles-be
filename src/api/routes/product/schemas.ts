export const requestParams = {
  id: { $ref: '#RouteIdParam' },
};

/**
 * The order of the keys is following the order of the GET
 * routes in Postman
 */
export const requestQuery = {
  getProduct: {
    type: 'object',
    properties: {
      page: { $ref: '#PageQuery' },
      search: { $ref: '#SearchQuery' },
      orderBy: {
        allOf: [
          { $ref: '#OrderByQuery' },
          {
            enum: ['created_at', 'product_name', 'market_name', 'market_address'],
          },
        ],
      },
      orderDirection: { $ref: '#OrderDirectionQuery' },
    },
  },
};

/**
 * The order of the keys is following the order of the routes in Postman
 */
export const responses = {
  products: {
    type: 'object',
    allOf: [
      { $ref: '#ApiResponse' },
      {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: '#GetProduct' },
          },
        },
      },
    ],
  },
};
