export const requestHeader = {
  private: { $ref: '#ApiKeyHeader' },
};

export const requestParams = {
  routeId: {
    required: ['id'],
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  },
};

export const requestBody = {
  postBody: {
    required: ['name'],
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    additionalProperties: false,
    errorMessage: {
      required: {
        name: 'name is required',
      },
      type: 'data sould be an object',
      properties: {
        name: 'name should be string',
      },
    },
  },
  postFile: {
    required: ['file'],
    type: 'object',
    properties: {
      file: { type: 'array', items: { $ref: '#MultiPartSchema' } },
    },
    additionalProperties: false,
  },
};

export const responses = {
  datas: {
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
              properties: {
                id: { type: 'number' },
                data: { type: 'string' },
              },
            },
          },
        },
      },
    ],
  },
  data: {
    type: 'object',
    allOf: [
      { $ref: '#ApiResponse' },
      {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              data: { type: 'string' },
            },
          },
        },
      },
    ],
  },
};
