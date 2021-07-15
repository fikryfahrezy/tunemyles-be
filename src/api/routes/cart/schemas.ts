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
      qty: {
        type: 'integer',
      },
      merchant_id: {
        type: 'integer',
      },
      product_id: {
        type: 'integer',
      },
    },
    additionalProperties: false,
  },
  updateProductQty: {
    required: ['qty'],
    type: 'object',
    properties: {
      qty: {
        type: 'integer',
      },
    },
    additionalProperties: false,
  },
};

/**
 * The order of the keys is following the order of the routes in Postman
 */
export const responses = {
  cartItems: {
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
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                },
                buyer_id: {
                  type: 'integer',
                },
                merchant_id: {
                  type: 'integer',
                },
                product_id: {
                  type: 'integer',
                },
                qty: {
                  type: 'integer',
                },
                status: {
                  type: 'integer',
                },
                product_name: {
                  type: 'string',
                },
                description: {
                  type: 'string',
                },
                cover_label: {
                  type: 'string',
                  nullable: true,
                },
                cover_url: {
                  type: 'string',
                  nullable: true,
                },
                normal_price: {
                  type: 'integer',
                },
                price_default: {
                  type: 'integer',
                },
                discount: {
                  type: 'integer',
                },
                available_qty: {
                  type: 'integer',
                },
                created_at: {
                  type: 'string',
                  format: 'date-time',
                },
                updated_at: {
                  type: 'string',
                  format: 'date-time',
                },
              },
            },
          },
        },
      },
    ],
  },
};
