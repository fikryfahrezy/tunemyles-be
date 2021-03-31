const requestParams = {
  id: { $ref: '#RouteIdParam' },
  productId: { $ref: '#RouteIdParam' },
  categoryId: { $ref: '#RouteIdParam' },
};

const requestQuery = {
  getProduct: {
    type: 'object',
    properties: {
      page: { $ref: '#PageQuery' },
      search: { $ref: '#SearchQuery' },
      orderBy: {
        allOf: [
          { $ref: '#OrderByQuery' },
          {
            enum: [
              'created_at',
              'product_name',
              'market_name',
              'market_address',
            ],
          },
        ],
      },
      orderDirection: { $ref: '#OrderDirectionQuery' },
    },
  },
  getOrder: {
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
    },
  },
  merchantList: {
    type: 'object',
    properties: {
      page: { $ref: '#PageQuery' },
      search: { $ref: '#SearchQuery' },
      orderBy: {
        allOf: [
          { $ref: '#OrderByQuery' },
          {
            enum: [
              'created_at',
              'full_name',
              'phone_number',
              'market_name',
              'market_address',
            ],
          },
        ],
      },
      orderDirection: { $ref: '#OrderDirectionQuery' },
    },
  },
  merchantRandom: {
    type: 'object',
    properties: { limit: { $ref: '#LimitQuery' } },
  },
  merchantTransactions: {
    type: 'object',
    properties: { date: { $ref: '#DateQuery' } },
  },
  merchantIncomes: {
    type: 'object',
    properties: { $ref: '#YearQuery' },
  },
};

const requestBody = {
  updateMerchant: {
    type: 'object',
    properties: {
      market_photo: { $ref: '#MultiPartSchema' },
      no_identity: { type: 'string' },
      market_name: { type: 'string' },
      market_address: { type: 'integer', format: 'int32' },
      market_lat: { type: 'number' },
      market_lon: { type: 'number' },
    },
    additionalProperties: false,
  },
  activateMerchant: {
    type: 'object',
    properties: {
      no_identity: { type: 'string' },
      identity_photo: { $ref: '#MultiPartSchema' },
      market_photo: { $ref: '#MultiPartSchema' },
      market_name: { type: 'string' },
      market_address: { type: 'string' },
      market_lat: { type: 'number' },
      market_lon: { type: 'number' },
      market_close_time: { type: 'string' },
    },
    additionalProperties: false,
  },
  postProduct: {
    required: [
      'description',
      'discount',
      'price_default',
      'price_selling',
      'product_name',
      'qty',
    ],
    properties: {
      product_name: { type: 'string' },
      description: { type: 'string' },
      cover: { $ref: '#MultiPartSchema' },
      price_default: { type: 'integer', format: 'int32' },
      price_selling: { type: 'integer', format: 'int32' },
      qty: { type: 'integer', format: 'int32' },
      discount: { type: 'integer', format: 'int32' },
      is_visible: {
        type: 'integer',
        format: 'int32',
        default: 1,
      },
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
      is_visible: { type: 'integer' },
    },
    additionalProperties: false,
  },
  updateProductCover: {
    required: ['cover'],
    properties: {
      cover: { $ref: '#MultiPartSchema' },
    },
  },
  updateProductStatus: {
    type: 'object',
    properties: { is_visible: { type: 'integer' } },
    additionalProperties: false,
  },
  bindProductCategory: {
    required: ['id_category'],
    type: 'object',
    properties: { id_category: { type: 'integer' } },
    additionalProperties: false,
  },
  addProductImage: {
    type: 'object',
    required: ['image'],
    properties: {
      image: { $ref: '#MultiPartSchema' },
    },
  },
  updateProductOrderStatus: {
    type: 'object',
    properties: { is_visible: { type: 'integer' } },
    additionalProperties: false,
  },
  updateMerchantOperation: {
    type: 'object',
    properties: { market_close_time: { type: 'string' } },
    additionalProperties: false,
  },
};

const responses = {
  merchants: {
    type: 'object',
    properties: {
      ApiResponse: {
        $ref: '#ApiResponse',
      },
      data: { $ref: '#GetMerchant' },
    },
  },
  merchantProduct: {
    type: 'object',
    properties: {
      ApiResponse: {
        $ref: '#ApiResponse',
      },
      data: {
        type: 'array',
        items: { $ref: '#GetProduct' },
      },
    },
  },
  postedProduct: {
    type: 'object',
    properties: {
      ApiResponse: {
        $ref: '#/components/schemas/ApiResponse',
      },
      data: { $ref: '#GetProductId' },
    },
  },
  merchantSingleProduct: {
    type: 'object',
    properties: {
      ApiResponse: {
        $ref: '#ApiResponse',
      },
      data: { $ref: '#GetSingleProduct' },
    },
  },
  merchantOrder: {
    type: 'object',
    properties: {
      ApiResponse: {
        $ref: '#ApiResponse',
      },
      data: {
        type: 'array',
        items: { $ref: '#GetOrder' },
      },
    },
  },
  merchantOrderDetail: {
    type: 'object',
    properties: {
      ApiResponse: {
        $ref: '#ApiResponse',
      },
      data: {
        type: 'array',
        items: {
          $ref: '#GetProductOrder',
        },
      },
    },
  },
  merchantList: {
    type: 'object',
    properties: {
      ApiResponse: {
        $ref: '#ApiResponse',
      },
      data: {
        type: 'array',
        items: { $ref: '#GetMerchant' },
      },
    },
  },
  merchantTransactions: {
    type: 'object',
    properties: {
      ApiResponse: {
        $ref: '#ApiResponse',
      },
      data: {
        type: 'array',
        items: {
          $ref: '#GetUserTransaction',
        },
      },
    },
  },
  merchantIncomes: {
    type: 'object',
    properties: {
      ApiResponse: {
        $ref: '#ApiResponse',
      },
      data: {
        type: 'array',
        items: {
          $ref: '#GetMerchantIncomes',
        },
      },
    },
  },
};

export default {
  requestQuery,
  requestParams,
  requestBody,
  responses,
};
