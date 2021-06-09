export const requestHeaders = {
  private: { $ref: '#ApiKeyHeader' },
};

/**
 * The order of the keys is following the order of the POST / PATCH
 * routes in Postman
 */
export const requestBody = {
  register: {
    required: ['address', 'full_name', 'password', 'phone_number', 'username'],
    type: 'object',
    properties: {
      username: {
        type: 'string',
        minLength: 8,
        maxLength: 20,
      },
      full_name: {
        type: 'string',
        minLength: 2,
        maxLength: 255,
      },
      phone_number: {
        type: 'string',
        minLength: 5,
        maxLength: 14,
      },
      address: {
        type: 'string',
        minLength: 5,
        maxLength: 1000,
      },
      password: {
        type: 'string',
        minLength: 8,
        maxLength: 255,
      },
    },
    additionalProperties: false,
  },
  activateMerchant: {
    required: [
      'no_identity',
      'identity_photo',
      'market_photo',
      'market_name',
      'market_address',
      'market_lat',
      'market_lon',
      'market_close_time',
    ],
    type: 'object',
    properties: {
      no_identity: { type: 'string' },
      identity_photo: { type: 'array', items: { $ref: '#MultiPartSchema' } },
      market_photo: { type: 'array', items: { $ref: '#MultiPartSchema' } },
      market_name: { type: 'string' },
      market_address: { type: 'string' },
      market_lat: { type: 'number' },
      market_lon: { type: 'number' },
      market_close_time: { type: 'string' },
    },
    additionalProperties: false,
  },
  login: {
    required: ['password', 'username'],
    type: 'object',
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
    },
    additionalProperties: false,
  },
  updateProfile: {
    type: 'object',
    properties: {
      full_name: {
        type: 'string',
        minLength: 2,
        maxLength: 255,
      },
      phone_number: {
        type: 'string',
        minLength: 5,
        maxLength: 14,
      },
      address: {
        type: 'string',
        minLength: 5,
        maxLength: 1000,
      },
      password: {
        type: 'string',
        minLength: 8,
        maxLength: 255,
      },
      avatar: { type: 'array', items: { $ref: '#MultiPartSchema' } },
    },
    additionalProperties: false,
  },
  forgotPassword: {
    required: ['phone_number'],
    type: 'object',
    properties: { phone_number: { type: 'string' } },
    additionalProperties: false,
  },
  resetPassword: {
    required: ['token', 'new_password'],
    type: 'object',
    properties: {
      token: { type: 'string' },
      new_password: {
        type: 'string',
        minLength: 8,
        maxLength: 255,
      },
    },
    additionalProperties: false,
  },
};

/**
 * The order of the keys is following the order of the routes in Postman
 */
export const responses = {
  authenticated: {
    type: 'object',
    allOf: [
      { $ref: '#ApiResponse' },
      {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            allOf: [
              {
                type: 'object',
                properties: { type: { type: 'integer' } },
              },
              { $ref: '#GetToken' },
            ],
          },
        },
      },
    ],
  },
  me: {
    type: 'object',
    allOf: [
      { $ref: '#ApiResponse' },
      {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            allOf: [
              { $ref: '#GetProfile' },
              {
                type: 'object',
                properties: {
                  wallets: {
                    type: 'array',
                    items: { $ref: '#GetAccountWallet' },
                  },
                },
              },
            ],
          },
        },
      },
    ],
  },
  verifyToken: {
    type: 'object',
    allOf: [
      { $ref: '#ApiResponse' },
      {
        type: 'object',
        properties: {
          data: { $ref: '#GetToken' },
        },
      },
    ],
  },
};
