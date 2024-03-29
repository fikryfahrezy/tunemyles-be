export const requestHeaders = {
  private: {
    $ref: '#ApiKeyHeader',
  },
};

export const requestParams = {
  id: {
    $ref: '#RouteIdParam',
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
      orderDirection: {
        $ref: '#OrderDirectionQuery',
      },
      orderBy: {
        allOf: [
          {
            $ref: '#OrderByQuery',
          },
          {
            enum: ['created_at', 'product_name', 'market_name', 'market_address'],
          },
        ],
      },
      search: {
        $ref: '#SearchQuery',
      },
      page: {
        $ref: '#PageQuery',
      },
      limit: {
        $ref: '#LimitQuery',
      },
    },
  },
  getOrders: {
    type: 'object',
    properties: {
      orderDirection: {
        $ref: '#OrderDirectionQuery',
      },
      orderBy: {
        allOf: [
          {
            $ref: '#OrderByQuery',
          },
          {
            enum: ['created_at', 'full_name', 'phone_number', 'address'],
          },
        ],
      },
      search: {
        $ref: '#SearchQuery',
      },
      page: {
        $ref: '#PageQuery',
      },
      limit: {
        $ref: '#LimitQuery',
      },
      status: {
        allOf: [
          {
            $ref: '#StatusQuery',
          },
          {
            enum: ['0', '1', '2'],
          },
        ],
      },
    },
  },
  getMerchantList: {
    type: 'object',
    properties: {
      orderDirection: {
        $ref: '#OrderDirectionQuery',
      },
      orderBy: {
        allOf: [
          {
            $ref: '#OrderByQuery',
          },
          {
            enum: ['created_at', 'full_name', 'phone_number', 'market_name', 'market_address'],
          },
        ],
      },
      search: {
        $ref: '#SearchQuery',
      },
      page: {
        $ref: '#PageQuery',
      },
      limit: {
        $ref: '#LimitQuery',
      },
    },
  },
  getRandomMerchants: {
    type: 'object',
    properties: {
      limit: {
        $ref: '#LimitQuery',
      },
    },
  },
  getMerchantTransactionHistories: {
    type: 'object',
    properties: {
      date: {
        $ref: '#DateQuery',
      },
    },
  },
  getMerchantIncomeHistories: {
    type: 'object',
    properties: {
      year: {
        $ref: '#YearQuery',
      },
    },
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
      market_photo: {
        type: 'array',
        items: {
          $ref: '#MultiPartSchema',
        },
      },
      identity_photo: {
        type: 'array',
        items: {
          $ref: '#MultiPartSchema',
        },
      },
      no_identity: {
        type: 'string',
      },
      market_name: {
        type: 'string',
      },
      market_address: {
        type: 'string',
      },
      market_lat: {
        type: 'number',
      },
      market_lon: {
        type: 'number',
      },
      market_close_time: {
        type: 'string',
      },
    },
    additionalProperties: false,
  },
  updateMerchantClosetime: {
    required: ['close_time'],
    type: 'object',
    properties: {
      close_time: {
        type: 'string',
      },
    },
    additionalProperties: false,
  },
  postProduct: {
    required: ['product_name', 'description', 'normal_price', 'selling_price', 'qty', 'discount'],
    properties: {
      cover: {
        type: 'array',
        items: {
          $ref: '#MultiPartSchema',
        },
      },
      product_name: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      normal_price: {
        type: 'integer',
      },
      selling_price: {
        type: 'integer',
      },
      qty: {
        type: 'integer',
      },
      discount: {
        type: 'integer',
      },
      status: {
        type: 'integer',
        default: 1,
      },
    },
    additionalProperties: false,
  },
  updateProduct: {
    type: 'object',
    properties: {
      product_name: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      normal_price: {
        type: 'integer',
      },
      selling_price: {
        type: 'integer',
      },
      qty: {
        type: 'integer',
      },
      discount: {
        type: 'integer',
      },
      status: {
        type: 'integer',
      },
    },
    additionalProperties: false,
  },
  changeProductCover: {
    required: ['cover'],
    properties: {
      cover: {
        type: 'array',
        items: {
          $ref: '#MultiPartSchema',
        },
      },
    },
    additionalProperties: false,
  },
  updateProductStatus: {
    required: ['status'],
    type: 'object',
    properties: {
      status: {
        type: 'integer',
      },
    },
    additionalProperties: false,
  },
  bindProductCategory: {
    required: ['category_id'],
    type: 'object',
    properties: {
      category_id: {
        type: 'integer',
      },
    },
    additionalProperties: false,
  },
  postProductImage: {
    type: 'object',
    required: ['image'],
    properties: {
      image: {
        type: 'array',
        items: {
          $ref: '#MultiPartSchema',
        },
      },
    },
    additionalProperties: false,
  },
  updateOrderStatus: {
    required: ['status'],
    type: 'object',
    properties: {
      status: {
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
  merchant: {
    type: 'object',
    allOf: [
      {
        $ref: '#ApiResponse',
      },
      {
        $ref: '#MerchantResponse',
      },
    ],
  },
  postedProduct: {
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
            properties: {
              product_id: {
                type: 'integer',
              },
            },
          },
        },
      },
    ],
  },
  merchantProducts: {
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
              $ref: '#ProductResponse',
            },
          },
        },
      },
    ],
  },
  changedMerchantProductCover: {
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
            properties: {
              cover_label: {
                type: 'string',
              },
              cover_url: {
                type: 'string',
              },
            },
          },
        },
      },
    ],
  },
  updatedProductStatus: {
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
            properties: {
              status: {
                type: 'integer',
              },
            },
          },
        },
      },
    ],
  },
  bindedProductCategory: {
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
            properties: {
              category_id: {
                type: 'integer',
              },
              category: {
                type: 'string',
              },
              slug: {
                type: 'string',
              },
              description: {
                type: 'string',
              },
              product_util_id: {
                type: 'integer',
              },
            },
          },
        },
      },
    ],
  },
  postedProductImage: {
    type: 'object',
    properties: {
      product_image_id: {
        type: 'integer',
      },
      product_util_id: {
        type: 'integer',
      },
      image_id: {
        type: 'integer',
      },
      image_label: {
        type: 'string',
      },
      image_url: {
        type: 'string',
      },
      created_at: {
        type: 'string',
      },
      updated_at: {
        type: 'string',
      },
    },
  },
  merchantSingleProduct: {
    type: 'object',
    allOf: [
      {
        $ref: '#ApiResponse',
      },
      {
        type: 'object',
        properties: {
          data: {
            allOf: [
              {
                $ref: '#ProductResponse',
              },
              {
                type: 'object',
                properties: {
                  images: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        product_image_id: {
                          type: 'integer',
                        },
                        image_label: {
                          type: 'string',
                        },
                        image_url: {
                          type: 'string',
                        },
                      },
                    },
                  },
                  categories: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        product_category_id: {
                          type: 'number',
                        },
                        category: {
                          type: 'string',
                        },
                        slug: {
                          type: 'string',
                        },
                        description: {
                          type: 'string',
                        },
                        icon_label: {
                          type: 'string',
                        },
                        icon_url: {
                          type: 'string',
                        },
                      },
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
  merchantOrders: {
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
  merchantOrderDetail: {
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
              $ref: '#OrderResponse',
            },
          },
        },
      },
    ],
  },
  updatedOrderStatus: {
    type: 'object',
    allOf: [
      {
        $ref: '#ApiResponse',
      },
      {
        type: 'object',
        properties: {
          data: {
            $ref: '#OrderResponse',
          },
        },
      },
    ],
  },
  merchantList: {
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
              $ref: '#MerchantResponse',
            },
          },
        },
      },
    ],
  },
  merchantProducList: {
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
              $ref: '#ProductResponse',
            },
          },
        },
      },
    ],
  },
  merchantTransactions: {
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
                transaction_token: {
                  type: 'string',
                },
                total_price: {
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
  merchantIncomes: {
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
                total_price: {
                  type: 'integer',
                },
                month: {
                  type: 'integer',
                },
              },
            },
          },
        },
      },
    ],
  },
};
