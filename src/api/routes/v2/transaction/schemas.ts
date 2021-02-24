const requests = {
  "review-transaction": {
    required: ["rating", "review"],
    type: "object",
    properties: {
      rating: { type: "integer" },
      review: { type: "string" },
    },
    additionalProperties: false,
  },
};

const responses = {
  transactions: {
    type: "object",
    properties: {
      ApiResponse: {
        $ref: "#ApiResponse",
      },
      data: {
        type: "array",
        items: { $ref: "#GetOrder" },
      },
    },
  },
  "transaction-detail": {
    type: "object",
    properties: {
      ApiResponse: {
        $ref: "#ApiResponse",
      },
      data: {
        type: "object",
        allOf: [
          { $ref: "#GetOrder" },
          {
            type: "object",
            properties: {
              products: {
                type: "array",
                items: {
                  $ref: "#GetProductOrder",
                },
              },
            },
          },
        ],
      },
    },
  },
};

export default { requests, responses };
