export const requestHeaders = {
  private: { $ref: '#ApiKeyHeader' },
};

export const requestParams = {
  id: { $ref: '#RouteIdParam' },
};

/**
 * The order of the keys is following the order of the POST / PATCH
 * routes in Postman
 */
export const requestBody = {
  addToCart: {
    required: ['qty', 'merchant_id', 'product_id'],
    type: 'object',
    properties: {
      qty: { type: 'integer' },
      merchant_id: { type: 'integer' },
      product_id: { type: 'integer' },
    },
    additionalProperties: false,
  },
  updateProductQty: {
    required: ['qty'],
    type: 'object',
    properties: { qty: { type: 'integer' } },
    additionalProperties: false,
  },
  checkout: {
    required: ['price_total'],
    type: 'object',
    properties: { price_total: { type: 'integer' } },
    additionalProperties: false,
  },
};

/**
 * The order of the keys is following the order of the routes in Postman
 */
export const responses = {
  type: 'object',
  allOf: [
    {
      $ref: '#ApiResponse',
    },
    {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            $ref: '#GetCart',
          },
        },
      },
    },
  ],
};
