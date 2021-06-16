export const requestHeaders = {
  private: { $ref: '#ApiKeyHeader' },
};

export const requestParams = {
  id: { $ref: '#RouteIdParam' },
  deleteProductCategory: {
    required: ['productId', 'categoryId'],
    type: 'object',
    properties: {
      productId: { type: 'string' },
      categoryId: { type: 'string' },
    },
  },
};

/**
 * The order of the keys is following the order of the GET
 * routes in Postman
 */
export const requestQuery = {
  getProducts: {
    type: 'object',
    properties: {
      orderDirection: { $ref: '#OrderDirectionQuery' },
      orderBy: {
        allOf: [
          { $ref: '#OrderByQuery' },
          { enum: ['created_at', 'product_name', 'market_name', 'market_address'] },
        ],
      },
      search: { $ref: '#SearchQuery' },
      page: { $ref: '#PageQuery' },
      limit: { $ref: '#LimitQuery' },
    },
  },
  getOrders: {
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
        allOf: [{ $ref: '#StatusQuery' }, { enum: ['0', '1', '2'] }],
      },
    },
  },
  getMerchantList: {
    type: 'object',
    properties: {
      orderDirection: { $ref: '#OrderDirectionQuery' },
      orderBy: {
        allOf: [
          { $ref: '#OrderByQuery' },
          { enum: ['created_at', 'full_name', 'phone_number', 'market_name', 'market_address'] },
        ],
      },
      search: { $ref: '#SearchQuery' },
      page: { $ref: '#PageQuery' },
      limit: { $ref: '#LimitQuery' },
    },
  },
  getRandomMerchants: {
    type: 'object',
    properties: { limit: { $ref: '#LimitQuery' } },
  },
  getMerchantTransactionHistories: {
    type: 'object',
    properties: { date: { $ref: '#DateQuery' } },
  },
  getMerchantIncomeHistories: {
    type: 'object',
    properties: { year: { $ref: '#YearQuery' } },
  },
};

/**
 * The order of the keys is following the order of the POST / PATCH
 * routes in Postman
 */
export const requestBody = {
  updateMerchantProfile: {
    type: 'object',
    properties: {
      market_photo: { type: 'array', items: { $ref: '#MultiPartSchema' } },
      identity_photo: { type: 'array', items: { $ref: '#MultiPartSchema' } },
      no_identity: { type: 'string' },
      market_name: { type: 'string' },
      market_address: { type: 'string' },
      market_lat: { type: 'number' },
      market_lon: { type: 'number' },
      market_close_time: { type: 'string' },
    },
    additionalProperties: false,
  },
  updateMerchantClosetime: {
    required: ['close_time'],
    type: 'object',
    properties: { close_time: { type: 'string' } },
    additionalProperties: false,
  },
  postProduct: {
    required: ['description', 'discount', 'price_default', 'price_selling', 'product_name', 'qty'],
    properties: {
      product_name: { type: 'string' },
      description: { type: 'string' },
      cover: { type: 'array', items: { $ref: '#MultiPartSchema' } },
      price_default: { type: 'integer' },
      price_selling: { type: 'integer' },
      qty: { type: 'integer' },
      discount: { type: 'integer' },
      status: { type: 'integer', default: 1 },
    },
    additionalProperties: false,
  },
  updateProduct: {
    type: 'object',
    properties: {
      product_name: { type: 'string' },
      description: { type: 'string' },
      price_default: { type: 'integer' },
      price_selling: { type: 'integer' },
      qty: { type: 'integer' },
      discount: { type: 'integer' },
      status: { type: 'integer' },
    },
    additionalProperties: false,
  },
  updateProductCover: {
    required: ['cover'],
    properties: {
      cover: { type: 'array', items: { $ref: '#MultiPartSchema' } },
    },
    additionalProperties: false,
  },
  updateProductStatus: {
    required: ['status'],
    type: 'object',
    properties: { status: { type: 'integer' } },
    additionalProperties: false,
  },
  bindProductCategory: {
    required: ['category_id'],
    type: 'object',
    properties: { category_id: { type: 'integer' } },
    additionalProperties: false,
  },
  postProductImage: {
    type: 'object',
    required: ['image'],
    properties: {
      image: { type: 'array', items: { $ref: '#MultiPartSchema' } },
    },
    additionalProperties: false,
  },
  updateOrderStatus: {
    required: ['status'],
    type: 'object',
    properties: { status: { type: 'integer' } },
    additionalProperties: false,
  },
};

/**
 * The order of the keys is following the order of the routes in Postman
 */
export const responses = {
  merchant: {
    type: 'object',
    allOf: [
      { $ref: '#ApiResponse' },
      {
        type: 'object',
        properties: {
          data: { $ref: '#GetMerchant' },
        },
      },
    ],
  },
  postedProduct: {
    type: 'object',
    allOf: [
      { $ref: '#ApiResponse' },
      {
        type: 'object',
        properties: {
          data: { $ref: '#GetProductId' },
        },
      },
    ],
  },
  merchantProducts: {
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
  merchantSingleProduct: {
    type: 'object',
    allOf: [
      { $ref: '#ApiResponse' },
      {
        type: 'object',
        properties: {
          data: { $ref: '#GetSingleProduct' },
        },
      },
    ],
  },
  merchantOrders: {
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
  merchantOrderDetail: {
    type: 'object',
    allOf: [
      { $ref: '#ApiResponse' },
      {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              $ref: '#GetProductOrder',
            },
          },
        },
      },
    ],
  },
  merchantList: {
    type: 'object',
    allOf: [
      { $ref: '#ApiResponse' },
      {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: '#GetMerchant' },
          },
        },
      },
    ],
  },
  merchantTransactions: {
    type: 'object',
    allOf: [
      { $ref: '#ApiResponse' },
      {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              $ref: '#GetUserTransaction',
            },
          },
        },
      },
    ],
  },
  merchantIncomes: {
    type: 'object',
    allOf: [
      { $ref: '#ApiResponse' },
      {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              $ref: '#GetMerchantIncomes',
            },
          },
        },
      },
    ],
  },
};
