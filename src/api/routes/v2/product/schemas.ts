const responses = {
  products: {
    type: "object",
    properties: {
      ApiResponse: {
        $ref: "#ApiResponse",
      },
      data: {
        type: "array",
        items: { $ref: "#GetProduct" },
      },
    },
  },
};

export default { responses };
