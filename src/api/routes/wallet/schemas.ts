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
  topUpHistories: {
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
            enum: ['created_at', 'balance_request', 'balance_transfer'],
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
  withdrawHistories: {
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
            enum: ['created_at', 'balance_request'],
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
  topUp: {
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
            enum: ['created_at', 'balance_request', 'balance_transfer'],
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
  withdraw: {
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
            enum: ['created_at', 'balance_request'],
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
};

/**
 * The order of the keys is following the order of the POST / PATCH
 * routes in Postman
 */
export const requestBody = {
  topUp: {
    required: ['bank_id', 'balance_request', 'balance_transfer'],
    type: 'object',
    properties: {
      bank_id: {
        type: 'integer',
      },
      balance_request: {
        type: 'integer',
      },
      balance_transfer: {
        type: 'integer',
      },
    },
    additionalProperties: false,
  },
  withdraw: {
    required: ['user_bank_id', 'balance_request'],
    type: 'object',
    properties: {
      user_bank_id: {
        type: 'integer',
      },
      balance_request: {
        type: 'integer',
      },
    },
    additionalProperties: false,
  },
  topUpProof: {
    required: ['image'],
    type: 'object',
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
  updateTopUpStatus: {
    required: ['status'],
    type: 'object',
    properties: {
      status: {
        type: 'integer',
        minimum: 0,
        maximum: 1,
      },
    },
    additionalProperties: false,
  },
  updateWithdrawStatus: {
    required: ['status'],
    type: 'object',
    properties: {
      status: {
        type: 'integer',
        minimum: 0,
        maximum: 1,
      },
    },
    additionalProperties: false,
  },
};

export const responses = {
  wallets: {
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
                wallet_name: {
                  type: 'string',
                },
                wallet_description: {
                  type: 'string',
                },
                balance: {
                  type: 'integer',
                },
              },
            },
          },
        },
      },
    ],
  },
  topUpHistories: {
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
                balance_request: {
                  type: 'integer',
                },
                balance_transfer: {
                  type: 'integer',
                },
                status: {
                  type: 'integer',
                },
                bank_name: {
                  type: 'string',
                },
                proof_label: {
                  type: 'string',
                  nullable: true,
                },
                proof_url: {
                  type: 'string',
                  nullable: true,
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
  withdrawHistories: {
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
                balance_request: {
                  type: 'integer',
                },
                status: {
                  type: 'integer',
                },
                bank_name: {
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
      },
    ],
  },
  topUpDetail: {
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
              id: {
                type: 'integer',
              },
              balance_request: {
                type: 'integer',
              },
              balance_transfer: {
                type: 'integer',
              },
              status: {
                type: 'integer',
              },
              user_name: {
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
  withdrawDetail: {
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
              id: {
                type: 'integer',
              },
              balance_request: {
                type: 'integer',
              },
              status: {
                type: 'integer',
              },
              bank_name: {
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
