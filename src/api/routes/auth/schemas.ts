export const requestHeader = {
  private: { $ref: '#ApiKeyHeader' },
};

export const requestBody = {
  login: {
    required: ['password', 'username'],
    type: 'object',
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
    },
    additionalProperties: false,
  },
  register: {
    required: ['address', 'full_name', 'password', 'phone_number', 'username'],
    type: 'object',
    properties: {
      full_name: {
        type: 'string',
        minLength: 2,
        maxLength: 255,
      },
      username: {
        type: 'string',
        minLength: 8,
        maxLength: 20,
      },
      password: { type: 'string' },
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
      address: {
        type: 'string',
        minLength: 5,
        maxLength: 1000,
      },
      phone_number: {
        type: 'string',
        minLength: 5,
        maxLength: 14,
      },
      password: {
        type: 'string',
        minLength: 1,
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
    properties: { token: { type: 'string' }, new_password: { type: 'string' } },
    additionalProperties: false,
  },
};

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
