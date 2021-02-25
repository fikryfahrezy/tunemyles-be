const requestParams = {
  verifyToken: { $ref: "#RequestToken" },
};

const requestQuery = {
  resetPassword: { $ref: "#RequestToken" },
};

const requestsBody = {
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
  updateProfile: {
    type: "object",
    properties: {
      avatar: { $ref: "#MultiPartSchema" },
      full_name: { type: "string" },
      address: { type: "string" },
      phone_number: { type: "string" },
    },
  },
  forgotPassword: {
    required: ["phone_number"],
    type: "object",
    properties: { phone_number: { type: "string" } },
    additionalProperties: false,
  },
  resetData: {
    required: ["new_password"],
    type: "object",
    properties: { new_password: { type: "string" } },
    additionalProperties: false,
  },
};

const responses = {
  authenticated: {
    type: "object",
    properties: {
      ApiResponse: {
        $ref: "#ApiResponse",
      },
      data: {
        type: "object",
        allOf: [
          {
            type: "object",
            properties: { type: { type: "integer" } },
          },
          { $ref: "#GetToken" },
        ],
      },
    },
  },
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
  verifyToken: {
    type: "object",
    properties: {
      ApiResponse: {
        $ref: "#ApiResponse",
      },
      data: { $ref: "#GetToken" },
    },
  },
};

export default { requestParams, requestQuery, requestsBody, responses };
