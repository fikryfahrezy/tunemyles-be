const requests = {
  "top-up": {
    required: ["balance_request", "balance_transfer", "id_m_banks"],
    type: "object",
    properties: {
      id_m_banks: { type: "integer" },
      balance_request: { type: "integer" },
      balance_transfer: { type: "integer" },
    },
    additionalProperties: false,
  },
  withdraw: {
    required: ["balance_request", "id_u_user_bank_account"],
    type: "object",
    properties: {
      id_u_user_bank_account: { type: "integer" },
      balance_request: { type: "integer" },
    },
    additionalProperties: false,
  },
  "update-top-up-status": {
    type: "object",
    properties: { status: { type: "integer" } },
    additionalProperties: false,
  },
  "update-withdraw-status": {
    type: "object",
    properties: { status: { type: "integer" } },
    additionalProperties: false,
  },
};

const responses = {
  wallets: {
    type: "object",
    properties: {
      ApiResponse: {
        $ref: "#ApiResponse",
      },
      data: { $ref: "#GetUserWallet" },
    },
  },
  "top-up-histories": {
    type: "object",
    properties: {
      ApiResponse: {
        $ref: "#ApiResponse",
      },
      data: {
        type: "array",
        items: { $ref: "#GetTopUp" },
      },
    },
  },
  "withdraw-histories": {
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
            { $ref: "#GetWithdraw" },
            {
              type: "object",
              properties: {
                UserBank: {
                  type: "object",
                  allOf: [
                    {
                      $ref: "#GetBankUser",
                    },
                    {
                      type: "object",
                      properties: {
                        Bank: {
                          $ref: "#GetBank",
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    },
  },
  "withdraw-detail": {
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
            { $ref: "#GetTopUp" },
            {
              type: "object",
              properties: {
                Bank: {
                  type: "object",
                  allOf: [
                    { $ref: "#GetBank" },
                    {
                      type: "object",
                      properties: {
                        Utilities: {
                          type: "array",
                          items: {
                            $ref: "#GetBankUtility",
                          },
                        },
                        Accounts: {
                          type: "array",
                          items: {
                            $ref: "#GetBankUser",
                          },
                        },
                      },
                    },
                  ],
                },
                Media: {
                  $ref: "#GetMedia",
                },
                UserWallet: {
                  type: "object",
                  properties: {
                    id_u_user: { type: "integer" },
                    u_user: {
                      type: "object",
                      properties: {
                        id_m_users: { type: "integer" },
                        m_user: {
                          type: "object",
                          properties: {
                            full_name: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
  "withdraw-detail-test": {
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
            { $ref: "#GetTopUp" },
            {
              type: "object",
              properties: {
                UserBank: {
                  type: "object",
                  allOf: [
                    {
                      $ref: "#GetBankUser",
                    },
                    {
                      type: "object",
                      properties: {
                        Bank: {
                          type: "object",
                          allOf: [
                            {
                              $ref: "#GetBank",
                            },
                            {
                              type: "object",
                              properties: {
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
                  ],
                },
              },
            },
          ],
        },
      },
    },
  },
  "user-top-up": {
    type: "object",
    properties: {
      ApiResponse: {
        $ref: "#ApiResponse",
      },
      data: {
        type: "array",
        items: { $ref: "#GetTopUp" },
      },
    },
  },
  "user-withdraw": {
    type: "object",
    properties: {
      ApiResponse: {
        $ref: "#ApiResponse",
      },
      data: {
        type: "array",
        items: { $ref: "#GetWithdraw" },
      },
    },
  },
};

export default { requests, responses };
