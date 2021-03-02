const requestHeader = {
  private: {
    required: ["key"],
    type: "object",
    properties: {
      key: { type: "number" },
    },
  },
};

const requestParams = {
  routeId: {
    type: "object",
    properties: {
      id: { type: "number" },
    },
  },
};

const requestBody = {
  postFile: {
    required: ["file"],
    type: "object",
    properties: {
      image: { $ref: "#MultiPartSchema" },
    },
    additionalProperties: false,
  },
};

const responses = {
  medias: {
    type: "object",
    properties: {
      ApiResponse: {
        $ref: "#ApiResponse",
      },
      data: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "number" },
            data: { type: "string" },
          },
        },
      },
    },
  },
};

export default { requestBody, requestParams, requestHeader, responses };
