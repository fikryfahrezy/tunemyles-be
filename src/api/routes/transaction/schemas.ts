export const requestHeaders = {
  private: { $ref: '#ApiKeyHeader' },
};

export const requestParams = {
  id: { $ref: '#RouteIdParam' },
};

/**
 * The order of the keys is following the order of the GET
 * routes in Postman
 */
export const requestQuery = {
  getTransactions: {
    type: 'object',
    properties: {
      orderDirection: { $ref: '#OrderDirectionQuery' },
      orderBy: {
        allOf: [
          { $ref: '#OrderByQuery' },
          { enum: ['created_at', 'full_name', 'phone_number', 'address'] },
        ],
      },
      search: { $ref: '#SearchQuery' },
      page: { $ref: '#PageQuery' },
      limit: { $ref: '#LimitQuery' },
      status: {
        allOf: [{ $ref: '#StatusQuery' }, { enum: ['0', '1', '2', '3'] }],
      },
    },
  },
  getReviewedProducts: {
    type: 'object',
    properties: {
      orderDirection: { $ref: '#OrderDirectionQuery' },
      orderBy: {
        allOf: [{ $ref: '#OrderByQuery' }, { enum: ['created_at', 'rating', 'review'] }],
      },
      search: { $ref: '#SearchQuery' },
      page: { $ref: '#PageQuery' },
      limit: { $ref: '#LimitQuery' },
    },
  },
};

/**
 * The order of the keys is following the order of the POST / PATCH
 * routes in Postman
 */
export const requestBody = {
  reviewProduct: {
    required: ['rating', 'review'],
    type: 'object',
    properties: {
      rating: { type: 'integer' },
      review: { type: 'string' },
    },
    additionalProperties: false,
  },
};

/**
 * The order of the keys is following the order of the routes in Postman
 */
export const responses = {
  transactions: {
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
              $ref: '#TransactionResponse',
            },
          },
        },
      },
    ],
  },
  transactionDetail: {
    type: 'object',
    allOf: [
      {
        $ref: '#ApiResponse',
      },
      {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            allOf: [
              {
                $ref: '#TransactionResponse',
              },
              {
                type: 'object',
                properties: {
                  products: {
                    type: 'array',
                    items: {
                      $ref: '#OrderResponse',
                    },
                  },
                },
              },
            ],
          },
        },
      },
    ],
  },
  reviewedProducts: {
    allOf: [
      {
        $ref: '#ApiResponse',
      },
      {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
              },
              product_id: {
                type: 'integer',
              },
              product_name: {
                type: 'string',
              },
              selling_prince: {
                type: 'integer',
              },
              cover_label: {
                type: 'string',
                nullable: true,
              },
              cover_url: {
                type: 'string',
                nullable: true,
              },
              merchant_id: {
                type: 'integer',
              },
              market_id: {
                type: 'integer',
              },
              market_name: {
                type: 'string',
              },
              rating: {
                type: 'integer',
              },
              review: {
                type: 'string',
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
    ],
  },
};
