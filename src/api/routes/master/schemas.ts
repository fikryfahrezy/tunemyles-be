export const requestHeaders = {
  private: { $ref: '#ApiKeyHeader' },
};

export const requestParams = {
  id: { $ref: '#RouteIdParam' },
};

export const requestQuery = {
  getBanks: {
    type: 'object',
    properties: {
      page: { $ref: '#PageQuery' },
      search: { $ref: '#SearchQuery' },
      orderBy: {
        allOf: [{ $ref: '#OrderByQuery' }, { enum: ['created_at', 'bank_name'] }],
      },
      orderDirection: { $ref: '#OrderDirectionQuery' },
    },
  },
  getCategories: {
    type: 'object',
    properties: {
      page: { $ref: '#PageQuery' },
      search: { $ref: '#SearchQuery' },
      orderBy: {
        allOf: [{ $ref: '#OrderByQuery' }, { enum: ['category', 'description'] }],
      },
      orderDirection: { $ref: '#OrderDirectionQuery' },
    },
  },
  getMedias: {
    type: 'object',
    properties: {
      page: { $ref: '#PageQuery' },
      search: { $ref: '#SearchQuery' },
      orderBy: {
        allOf: [{ $ref: '#OrderByQuery' }, { enum: ['created_at', 'label'] }],
      },
      orderDirection: { $ref: '#OrderDirectionQuery' },
    },
  },
  getWallets: {
    type: 'object',
    properties: {
      page: { $ref: '#PageQuery' },
      search: { $ref: '#SearchQuery' },
      orderBy: {
        allOf: [
          { $ref: '#OrderByQuery' },
          {
            enum: ['created_at', 'wallet_name', 'wallet_description'],
          },
        ],
      },
      orderDirection: { $ref: '#OrderDirectionQuery' },
    },
  },
};

export const requestBody = {
  postBank: {
    required: ['bank_name'],
    type: 'object',
    properties: {
      logo: { $ref: '#MultiPartSchema' },
      bank_name: { type: 'string' },
    },
    additionalProperties: false,
  },
  updateBank: {
    type: 'object',
    properties: {
      bank_name: { type: 'string' },
      is_visible: { type: 'integer' },
    },
    additionalProperties: false,
  },
  updateBankLogo: {
    required: ['logo'],
    type: 'object',
    properties: {
      logo: { $ref: '#MultiPartSchema' },
    },
    additionalProperties: false,
  },
  updateBankdetail: {
    required: ['account_name', 'account_number'],
    type: 'object',
    properties: {
      account_number: { type: 'string' },
      account_name: { type: 'string' },
    },
    additionalProperties: false,
  },
  postBankStep: {
    required: ['step'],
    type: 'object',
    properties: { step: { type: 'string' } },
    additionalProperties: false,
  },
  postCategory: {
    required: ['category', 'description', 'slug'],
    type: 'object',
    properties: {
      logo: { $ref: '#MultiPartSchema' },
      category: { type: 'string' },
      slug: { type: 'string' },
      description: { type: 'string' },
    },
    additionalProperties: false,
  },
  updateCategory: {
    type: 'object',
    properties: {
      category: { type: 'string' },
      slug: { type: 'string' },
      description: { type: 'string' },
      is_visible: { type: 'integer' },
    },
    additionalProperties: false,
  },
  updateCategoryIcon: {
    required: ['icon'],
    type: 'object',
    properties: {
      icon: { $ref: '#MultiPartSchema' },
    },
    additionalProperties: false,
  },
  postMedia: {
    required: ['image'],
    type: 'object',
    properties: {
      image: { $ref: '#MultiPartSchema' },
    },
    additionalProperties: false,
  },
  postWallet: {
    required: ['wallet_description', 'wallet_name'],
    type: 'object',
    properties: {
      logo: { $ref: '#MultiPartSchema' },
      wallet_name: { type: 'string' },
      wallet_description: { type: 'string' },
    },
  },
  updateWallet: {
    type: 'object',
    properties: {
      wallet_name: { type: 'string' },
      wallet_description: { type: 'string' },
      is_visible: { type: 'integer' },
    },
    additionalProperties: false,
  },
  updateWalletLogo: {
    required: ['logo'],
    type: 'object',
    properties: {
      logo: { $ref: '#MultiPartSchema' },
    },
  },
  postFaq: {
    required: ['answer', 'question'],
    type: 'object',
    properties: {
      question: { type: 'string' },
      answer: { type: 'string' },
    },
    additionalProperties: false,
  },
  updateFaq: {
    type: 'object',
    properties: {
      question: { type: 'string' },
      answer: { type: 'string' },
    },
    additionalProperties: false,
  },
};

export const responses = {
  banks: {
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
                    Accounts: {
                      type: 'array',
                      items: {
                        $ref: '#GetBankUser',
                      },
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
  categories: {
    type: 'object',
    allOf: [
      { $ref: '#ApiResponse' },
      {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: '#GetCategory' },
          },
        },
      },
    ],
  },
  medias: {
    type: 'object',
    allOf: [
      { $ref: '#ApiResponse' },
      {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: '#GetMedia' },
          },
        },
      },
    ],
  },
  wallets: {
    type: 'object',
    allOf: [
      { $ref: '#ApiResponse' },
      {
        type: 'object',
        properties: {
          data: { $ref: '#GetUserWallet' },
        },
      },
    ],
  },
  faqs: {
    type: 'object',
    allOf: [
      { $ref: '#ApiResponse' },
      {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: '#GetFaq' },
          },
        },
      },
    ],
  },
};
