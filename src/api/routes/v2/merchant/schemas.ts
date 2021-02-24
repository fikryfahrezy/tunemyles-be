const requests = {
  "update-product": {
    type: "object",
    properties: {
      product_name: { type: "string" },
      description: { type: "string" },
      price_default: { type: "integer" },
      price_selling: { type: "integer" },
      qty: { type: "integer" },
      discount: { type: "integer" },
      is_visible: { type: "integer" },
    },
    additionalProperties: false,
  },
  "update-product-status": {
    type: "object",
    properties: { is_visible: { type: "integer" } },
    additionalProperties: false,
  },
  "bind-product-category": {
    required: ["id_category"],
    type: "object",
    properties: { id_category: { type: "integer" } },
    additionalProperties: false,
  },
  "update-product-order-status": {
    type: "object",
    properties: { is_visible: { type: "integer" } },
    additionalProperties: false,
  },
  "update-merchant-operation": {
    type: "object",
    properties: { market_close_time: { type: "string" } },
    additionalProperties: false,
  },
};

const responses = {
  merchants: {
    type: "object",
    properties: {
      ApiResponse: {
        $ref: "#ApiResponse",
      },
      data: { $ref: "#GetMerchant" },
    },
  },
  "merchant-product": {
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
  "merchant-single-product": {
    type: "object",
    properties: {
      ApiResponse: {
        $ref: "#ApiResponse",
      },
      data: { $ref: "#GetSingleProduct" },
    },
  },
  "merchant-order": {
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
  "merchant-order-detail": {
    type: "object",
    properties: {
      ApiResponse: {
        $ref: "#ApiResponse",
      },
      data: {
        type: "array",
        items: {
          $ref: "#GetProductOrder",
        },
      },
    },
  },
  "merchant-list": {
    type: "object",
    properties: {
      ApiResponse: {
        $ref: "#ApiResponse",
      },
      data: {
        type: "array",
        items: { $ref: "#GetMerchant" },
      },
    },
  },
  "merchant-transactions": {
    type: "object",
    properties: {
      ApiResponse: {
        $ref: "#ApiResponse",
      },
      data: {
        type: "array",
        items: {
          $ref: "#GetUserTransaction",
        },
      },
    },
  },
  "merchant-incomes": {
    type: "object",
    properties: {
      ApiResponse: {
        $ref: "#ApiResponse",
      },
      data: {
        type: "array",
        items: {
          $ref: "#GetMerchantIncomes",
        },
      },
    },
  },
};

export default { requests, responses };
