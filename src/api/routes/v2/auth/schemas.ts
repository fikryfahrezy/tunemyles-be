const requests = {
  login: {
    required: ["password", "username"],
    type: "object",
    properties: {
      username: { type: "string" },
      password: { type: "string" },
    },
    additionalProperties: false,
  },
  register: {
    required: ["address", "full_name", "password", "phone_number", "username"],
    type: "object",
    properties: {
      full_name: { type: "string" },
      username: { type: "string" },
      password: { type: "string" },
      phone_number: { type: "string" },
      address: { type: "string" },
    },
    additionalProperties: false,
  },
  "forgot-password": {
    required: ["phone_number"],
    type: "object",
    properties: { phone_number: { type: "string" } },
    additionalProperties: false,
  },
  "reset-data": {
    required: ["new_password"],
    type: "object",
    properties: { new_password: { type: "string" } },
    additionalProperties: false,
  },
};

const responses = {
  me: {
    type: "object",
    properties: {
      ApiResponse: {
        $ref: "#ApiResponse",
      },
      data: {
        type: "object",
        allOf: [
          { $ref: "#GetProfile" },
          {
            type: "object",
            properties: {
              wallets: {
                type: "array",
                items: {
                  type: "object",
                  allOf: [
                    {
                      $ref: "#GetProfileUtility",
                    },
                    {
                      type: "object",
                      properties: {
                        Wallet: {
                          type: "object",
                          allOf: [
                            {
                              $ref: "#GetWallet",
                            },
                            {
                              type: "object",
                              properties: {
                                Logo: {
                                  $ref: "#GetMedia",
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
        ],
      },
    },
  },
  "verify-token": {
    type: "object",
    properties: {
      ApiResponse: {
        $ref: "#ApiResponse",
      },
      data: { $ref: "#GetToken" },
    },
  },
};

export default { requests, responses };
