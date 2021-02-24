const requests = {
  "update-wallet": {
    type: "object",
    properties: {
      wallet_name: { type: "string" },
      wallet_description: { type: "string" },
      is_visible: { type: "integer" },
    },
    additionalProperties: false,
  },
  "update-bank": {
    type: "object",
    properties: {
      bank_name: { type: "string" },
      is_visible: { type: "integer" },
    },
    additionalProperties: false,
  },
  "update-bank-detail": {
    required: ["account_name", "account_number"],
    type: "object",
    properties: {
      account_number: { type: "string" },
      account_name: { type: "string" },
    },
    additionalProperties: false,
  },
  "post-bank-step": {
    required: ["step"],
    type: "object",
    properties: { step: { type: "string" } },
    additionalProperties: false,
  },
  "update-category": {
    type: "object",
    properties: {
      category: { type: "string" },
      slug: { type: "string" },
      description: { type: "string" },
      is_visible: { type: "integer" },
    },
    additionalProperties: false,
  },
  "post-faq": {
    required: ["answer", "question"],
    type: "object",
    properties: {
      question: { type: "string" },
      answer: { type: "string" },
    },
    additionalProperties: false,
  },
  "update-faq": {
    type: "object",
    properties: {
      question: { type: "string" },
      answer: { type: "string" },
    },
    additionalProperties: false,
  },
  "post-bank-user": {
    required: ["account_name", "account_number", "id_m_banks"],
    type: "object",
    properties: {
      id_m_banks: { type: "integer" },
      account_number: { type: "string" },
      account_name: { type: "string" },
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
        items: { $ref: "#GetMedia" },
      },
    },
  },
  wallets: {
    type: "object",
    properties: {
      ApiResponse: {
        $ref: "#ApiResponse",
      },
      data: { $ref: "#GetUserWallet" },
    },
  },
  categories: {
    type: "object",
    properties: {
      ApiResponse: {
        $ref: "#ApiResponse",
      },
      data: {
        type: "array",
        items: { $ref: "#GetCategory" },
      },
    },
  },
  faqs: {
    type: "object",
    properties: {
      ApiResponse: {
        $ref: "#ApiResponse",
      },
      data: {
        type: "array",
        items: { $ref: "#GetFaq" },
      },
    },
  },
  "banks-user": {
    type: "object",
    properties: {
      ApiResponse: {
        $ref: "#ApiResponse",
      },
      data: {
        type: "array",
        items: {
          type: "object",
          allOf: [
            { $ref: "#GetBank" },
            {
              type: "object",
              properties: {
                Logo: {
                  $ref: "#GetMedia",
                },
                Account: {
                  type: "array",
                  items: {
                    $ref: "#GetBankUser",
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
  "bank-detail": {
    type: "object",
    properties: {
      ApiResponse: {
        $ref: "#ApiResponse",
      },
      data: {
        type: "array",
        items: {
          type: "object",
          allOf: [
            { $ref: "#GetBank" },
            {
              type: "object",
              properties: {
                Logo: {
                  $ref: "#GetMedia",
                },
                Accounts: {
                  type: "array",
                  items: {
                    $ref: "#GetBankUser",
                  },
                },
                Utilities: {
                  type: "array",
                  items: {
                    $ref: "#GetBankUtility",
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
};

export default { requests, responses };
