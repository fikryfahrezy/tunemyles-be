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
 * The order of the keys is following the order of the POST / PATCH
 * routes in Postman
 */
export const requestBody = {
  postBankUser: {
    required: ['account_name', 'account_number', 'bank_id'],
    type: 'object',
    properties: {
      bank_id: {
        type: 'integer',
      },
      account_number: {
        type: 'string',
      },
      account_name: {
        type: 'string',
      },
    },
    additionalProperties: false,
  },
  updateBankUser: {
    type: 'object',
    properties: {
      account_number: {
        type: 'string',
      },
      account_name: {
        type: 'string',
      },
    },
    additionalProperties: false,
  },
};

/**
 * The order of the keys is following the order of the routes in Postman
 */
export const responses = {
  getBanksResponse: {
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
                bank_name: {
                  type: 'string',
                },
                visibility: {
                  type: 'integer',
                },
                logo_label: {
                  type: 'string',
                },
                logo_url: {
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
                accounts: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      account_name: {
                        type: 'string',
                      },
                      account_number: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    ],
  },
  getBankDetailResponse: {
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
              bank_name: {
                type: 'string',
              },
              visibility: {
                type: 'integer',
              },
              logo_label: {
                type: 'string',
              },
              logo_url: {
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
              steps: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    step: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    ],
  },
  getBankUsersResponse: {
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
                account_number: {
                  type: 'string',
                },
                account_name: {
                  type: 'string',
                },
                visibility: {
                  type: 'integer',
                },
                bank_name: {
                  type: 'string',
                },
                logo_label: {
                  type: 'string',
                },
                logo_url: {
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
};
