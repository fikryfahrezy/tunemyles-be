const requestParams = {
  id: { $ref: '#RouteIdParam' },
};

const requestQuery = {
  getTransaction: {
    type: 'object',
    properties: {
      page: { $ref: '#PageQuery' },
      search: { $ref: '#SearchQuery' },
      orderBy: {
        allOf: [
          { $ref: '#OrderByQuery' },
          {
            enum: ['created_at', 'full_name', 'phone_number', 'address'],
          },
        ],
      },
      orderDirection: { $ref: '#OrderDirectionQuery' },
      status: {
        allOf: [{ $ref: '#StatusQuery' }, { enum: ['0', '1', '2', '3'] }],
      },
    },
  },
};

const requestBody = {
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

const responses = {
  transactions: {
    type: 'object',
    allOf: [
      { $ref: '#ApiResponse' },
      {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: '#GetOrder' },
          },
        },
      },
    ],
  },
  transactionDetail: {
    type: 'object',
    allOf: [
      { $ref: '#ApiResponse' },
      {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            allOf: [
              { $ref: '#GetOrder' },
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

export default {
  requestBody,
  requestQuery,
  requestParams,
  responses,
};
