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
  postBankUser: {
    required: ['account_name', 'account_number', 'bank_id'],
    type: 'object',
    properties: {
      bank_id: { type: 'integer' },
      account_number: { type: 'string' },
      account_name: { type: 'string' },
    },
    additionalProperties: false,
  },
  updateBankUser: {
    required: ['bank_id'],
    type: 'object',
    properties: {
      id_m_banks: { type: 'integer' },
      account_number: { type: 'string' },
      account_name: { type: 'string' },
    },
    additionalProperties: false,
  },
};

/**
 * The order of the keys is following the order of the routes in Postman
 */
export const responses = {
  bank: {
    type: 'object',
    allOf: [
      { $ref: '#ApiResponse' },
      {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              type: 'object',
              allOf: [
                { $ref: '#GetBank' },
                {
                  type: 'object',
                  properties: {
                    Logo: {
                      $ref: '#GetMedia',
                    },
                    Account: {
                      type: 'array',
                      items: {
                        $ref: '#GetBankUser',
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      },
    ],
  },
  bankDetail: {
    type: 'object',
    allOf: [
      { $ref: '#ApiResponse' },
      {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              type: 'object',
              allOf: [
                { $ref: '#GetBank' },
                {
                  type: 'object',
                  properties: {
                    Logo: {
                      $ref: '#GetMedia',
                    },
                    Utilities: {
                      type: 'array',
                      items: {
                        $ref: '#GetBankUtility',
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      },
    ],
  },
  bankUser: {
    type: 'object',
    allOf: [
      { $ref: '#ApiResponse' },
      {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              type: 'object',
              allOf: [
                { $ref: 'GetBankUser' },
                {
                  type: 'object',
                  properties: {
                    Bank: {
                      type: 'object',
                      allOf: [
                        { $ref: '#GetBank' },
                        {
                          type: 'object',
                          properties: {
                            Logo: {
                              $ref: '#GetMedia',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        },
      },
    ],
  },
};
