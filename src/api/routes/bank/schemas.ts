const requestParams = {
  id: { $ref: '#RouteIdParam' },
};

const requestBody = {
  postBankUser: {
    required: ['account_name', 'account_number', 'id_m_banks'],
    type: 'object',
    properties: {
      id_m_banks: { type: 'integer' },
      account_number: { type: 'string' },
      account_name: { type: 'string' },
    },
    additionalProperties: false,
  },
  updateBankUser: {
    type: 'object',
    properties: {
      id_m_banks: { type: 'integer' },
      account_number: { type: 'string' },
      account_name: { type: 'string' },
    },
    additionalProperties: false,
  },
};

const responses = {
  bank: {
    type: 'object',
    properties: {
      ApiResponse: {
        $ref: '#ApiResponse',
      },
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
  bankDetail: {
    type: 'object',
    properties: {
      ApiResponse: {
        $ref: '#ApiResponse',
      },
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
  bankUser: {
    type: 'object',
    properties: {
      ApiResponse: {
        $ref: '#ApiResponse',
      },
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
};

export default { requestBody, requestParams, responses };
