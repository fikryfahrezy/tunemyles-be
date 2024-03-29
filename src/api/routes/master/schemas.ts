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
  getBanks: {
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
            enum: ['created_at', 'bank_name'],
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
  getCategories: {
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
            enum: ['created_at', 'category', 'description'],
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
  getMedias: {
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
            enum: ['created_at', 'label'],
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
  getWallets: {
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
            enum: ['created_at', 'wallet_name', 'wallet_description'],
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
};

/**
 * The order of the keys is following the order of the POST / PATCH
 * routes in Postman
 */
export const requestBody = {
  postBank: {
    required: ['bank_name'],
    type: 'object',
    properties: {
      logo: {
        type: 'array',
        items: {
          $ref: '#MultiPartSchema',
        },
      },
      bank_name: {
        type: 'string',
      },
    },
    additionalProperties: false,
  },
  postBankStep: {
    required: ['step'],
    type: 'object',
    properties: {
      step: {
        type: 'string',
      },
    },
    additionalProperties: false,
  },
  updateBank: {
    type: 'object',
    properties: {
      bank_name: {
        type: 'string',
      },
      visibility: {
        type: 'integer',
      },
    },
    additionalProperties: false,
  },
  updateBankAccount: {
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
  updateBankLogo: {
    required: ['logo'],
    type: 'object',
    properties: {
      logo: {
        type: 'array',
        items: {
          $ref: '#MultiPartSchema',
        },
      },
    },
    additionalProperties: false,
  },
  postCategory: {
    required: ['category', 'description', 'slug'],
    type: 'object',
    properties: {
      icon: {
        type: 'array',
        items: {
          $ref: '#MultiPartSchema',
        },
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
    },
    additionalProperties: false,
  },
  updateCategory: {
    type: 'object',
    properties: {
      category: {
        type: 'string',
      },
      slug: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      visibility: {
        type: 'integer',
      },
    },
    additionalProperties: false,
  },
  changeCategoryIcon: {
    required: ['icon'],
    type: 'object',
    properties: {
      icon: {
        type: 'array',
        items: {
          $ref: '#MultiPartSchema',
        },
      },
    },
    additionalProperties: false,
  },
  postMedia: {
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
  postWallet: {
    required: ['wallet_description', 'wallet_name'],
    type: 'object',
    properties: {
      logo: {
        type: 'array',
        items: {
          $ref: '#MultiPartSchema',
        },
      },
      wallet_name: {
        type: 'string',
      },
      wallet_description: {
        type: 'string',
      },
    },
  },
  updateWallet: {
    type: 'object',
    properties: {
      wallet_name: {
        type: 'string',
      },
      wallet_description: {
        type: 'string',
      },
      visibility: {
        type: 'integer',
      },
    },
    additionalProperties: false,
  },
  updateWalletLogo: {
    required: ['logo'],
    type: 'object',
    properties: {
      logo: {
        type: 'array',
        items: {
          $ref: '#MultiPartSchema',
        },
      },
    },
  },
  postFaq: {
    required: ['answer', 'question'],
    type: 'object',
    properties: {
      question: {
        type: 'string',
      },
      answer: {
        type: 'string',
      },
    },
    additionalProperties: false,
  },
  updateFaq: {
    type: 'object',
    properties: {
      question: {
        type: 'string',
      },
      answer: {
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
  banks: {
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
                logo_label: {
                  type: 'string',
                  nullable: true,
                },
                logo_url: {
                  type: 'string',
                  nullable: true,
                },
                created_at: {
                  type: 'string',
                },
                updated_at: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    ],
  },
  bankDetail: {
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
              logo_label: {
                type: 'string',
                nullable: true,
              },
              logo_url: {
                type: 'string',
                nullable: true,
              },
              created_at: {
                type: 'string',
              },
              updated_at: {
                type: 'string',
              },
              steps: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                    },
                    step: {
                      type: 'string',
                    },
                  },
                },
              },
              accounts: {
                type: 'array',
                properties: {
                  id: {
                    type: 'integer',
                  },
                  acccount_name: {
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
    ],
  },
  categories: {
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
                category: {
                  type: 'string',
                },
                description: {
                  type: 'string',
                },
                slug: {
                  type: 'string',
                },
                icon_label: {
                  type: 'string',
                  nullable: true,
                },
                icon_url: {
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
  medias: {
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
                media: {
                  type: 'string',
                },
                url: {
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
                logo_label: {
                  type: 'string',
                  nullabe: true,
                },
                logo_url: {
                  type: 'string',
                  nullabe: true,
                },
                created_at: {
                  type: 'string',
                },
                updated_at: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    ],
  },
  faqs: {
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
                question: {
                  type: 'string',
                },
                answer: {
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
          },
        },
      },
    ],
  },
};
