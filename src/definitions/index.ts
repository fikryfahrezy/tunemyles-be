export default {
  components: {
    schemas: {
      RequestToken: {
        $id: '#RequestToken',
        type: 'object',
        properties: {
          token: { type: 'string' },
        },
        additionalProperties: false,
      },
      ApiKeyHeader: {
        $id: '#ApiKeyHeader',
        type: 'object',
        properties: {
          authorization: { type: 'string' },
        },
        required: ['authorization'],
      },
      RouteIdParam: {
        $id: '#RouteIdParam',
        required: ['id'],
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
      OrderDirectionQuery: {
        $id: '#OrderDirectionQuery',
        type: 'string',
        default: 'DESC',
        enum: ['ASC', 'DESC'],
      },
      OrderByQuery: {
        $id: '#OrderByQuery',
        type: 'string',
        default: 'created_at',
      },
      SearchQuery: {
        $id: '#SearchQuery',
        type: 'string',
        default: '',
      },
      PageQuery: {
        $id: '#PageQuery',
        type: 'string',
        default: '1',
      },
      LimitQuery: {
        $id: '#LimitQuery',
        limit: { type: 'string', default: '10' },
      },
      StatusQuery: {
        $id: '#StatusQuery',
        type: 'string',
        default: '0',
      },
      DateQuery: {
        $id: '#DateQuery',
        type: 'string',
      },
      YearQuery: {
        $id: '#YearQuery',
        type: 'string',
      },
      ApiResponse: {
        $id: '#ApiResponse',
        type: 'object',
        properties: {
          code: { type: 'number' },
          success: { type: 'boolean' },
          message: { type: 'string' },
        },
      },
      TokenResponse: {
        $id: '#TokenResponse',
        type: 'object',
        properties: { token: { type: 'string' } },
      },
      MerchantResponse: {
        $id: '#MerchantResponse',
        type: 'object',
        properties: {
          merchant_id: {
            type: 'integer',
          },
          full_name: {
            type: 'string',
          },
          phone_number: {
            type: 'string',
          },
          market_id: {
            type: 'integer',
          },
          market_name: {
            type: 'string',
          },
          market_address: {
            type: 'string',
          },
          market_lat: {
            type: 'integer',
          },
          market_long: {
            type: 'integer',
          },
          market_close_time: {
            type: 'string',
          },
          photo_id: {
            type: 'integer',
          },
          photo_label: {
            type: 'string',
          },
          photo_url: {
            type: 'string',
          },
          identity_id: {
            type: 'integer',
          },
          identity_label: {
            type: 'string',
          },
          identity_url: {
            type: 'string',
          },
          status: {
            type: 'integer',
          },
          created_at: {
            type: 'string',
          },
          updated_at: {
            type: 'string',
          },
        },
      },
      ProductResponse: {
        $id: '#ProductResponse',
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          product_util_id: {
            type: 'integer',
          },
          product_name: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          status: {
            type: 'integer',
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
          cover_label: {
            type: 'string',
          },
          cover_url: {
            type: 'string',
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
          market_address: {
            type: 'string',
          },
          market_close_time: {
            type: 'string',
          },
          market_status: {
            type: 'integer',
          },
          photo_label: {
            type: 'string',
          },
          photo_url: {
            type: 'string',
          },
          creaetd_at: {
            type: 'string',
            format: 'date-time',
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      OrderResponse: {
        $id: '#OrderResponse',
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          transaction_id: {
            type: 'integer',
          },
          product_id: {
            type: 'integer',
          },
          transaction_token: {
            type: 'string',
          },
          qty: {
            type: 'integer',
          },
          sub_total_price: {
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
          product_status: {
            type: 'integer',
          },
          cover_label: {
            type: 'string',
          },
          cover_url: {
            type: 'string',
          },
          buyer_id: {
            type: 'integer',
          },
          merchant_id: {
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
      TransactionResponse: {
        $id: '#TransactionResponse',
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          buyer_id: {
            type: 'integer',
          },
          transaction_token: {
            type: 'string',
          },
          total_price: {
            type: 'integer',
          },
          status: {
            type: 'integer',
          },
          full_name: {
            type: 'string',
          },
          phone_number: {
            type: 'string',
          },
          address: {
            type: 'string',
          },
          profile_label: {
            type: 'string',
            nullable: true,
          },
          profile_url: {
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
          photo_label: {
            type: 'string',
          },
          photo_url: {
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
};
