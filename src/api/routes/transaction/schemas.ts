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
  getReviewedTransactions: {
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
  reviewTransaction: {
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
              $ref: '#GetOrder',
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
                $ref: '#GetOrder',
              },
              {
                type: 'object',
                properties: {
                  products: {
                    type: 'array',
                    items: {
                      $ref: '#GetProductOrder',
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
};
