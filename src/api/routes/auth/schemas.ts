export const requestHeader = {
  private: { $ref: '#ApiKeyHeader' },
};

export const requestParams = {
  verifyToken: { $ref: '#RequestToken' },
};

export const requestQuery = {
  resetPassword: { $ref: '#RequestToken' },
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
      full_name: { type: 'string' },
      username: { type: 'string' },
      password: { type: 'string' },
      phone_number: { type: 'string' },
      address: { type: 'string' },
    },
    additionalProperties: false,
  },
  updateProfile: {
    type: 'object',
    properties: {
      full_name: { type: 'string' },
      address: { type: 'string' },
      phone_number: { type: 'string' },
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
  resetData: {
    required: ['new_password'],
    type: 'object',
    properties: { new_password: { type: 'string' } },
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
    properties: {
      ApiResponse: {
        $ref: '#ApiResponse',
      },
      data: { $ref: '#GetToken' },
    },
  },
};
