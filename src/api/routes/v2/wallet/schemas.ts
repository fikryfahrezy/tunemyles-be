const requestParams = {
    id: { $ref: "#RouteIdParam" },
};

const requestQuery = {
    topUp: {
        type: "object",
        properties: {
            page: { $ref: "#PageQuery" },
            search: { $ref: "#SearchQuery" },
            orderBy: {
                allOf: [
                    { $ref: "#OrderByQuery" },
                    {
                        enum: [
                            "created_at",
                            "balance_request",
                            "balance_transfer",
                        ],
                    },
                ],
            },
            orderDirection: { $ref: "#OrderDirectionQuery" },
            status: {
                allOf: [{ $ref: "#StatusQuery" }, { enum: ["0", "1", "2"] }],
            },
        },
    },
    withdraw: {
        type: "object",
        properties: {
            page: { $ref: "#PageQuery" },
            search: { $ref: "#SearchQuery" },
            orderBy: {
                allOf: [
                    { $ref: "#OrderByQuery" },
                    { enum: ["created_at", "balance_request"] },
                ],
            },
            orderDirection: { $ref: "#OrderDirectionQuery" },
            status: {
                allOf: [{ $ref: "#StatusQuery" }, { enum: ["0", "1", "2"] }],
            },
        },
    },
};

const requestBody = {
    topUp: {
        required: ["balance_request", "balance_transfer", "id_m_banks"],
        type: "object",
        properties: {
            id_m_banks: { type: "integer" },
            balance_request: { type: "integer" },
            balance_transfer: { type: "integer" },
        },
        additionalProperties: false,
    },
    topUpImage: {
        required: ["image"],
        type: "object",
        properties: {
            image: { $ref: "#MultiPartSchema" },
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
    updateTopUpStatus: {
        type: "object",
        properties: { status: { type: "integer" } },
        additionalProperties: false,
    },
    updateWithdrawStatus: {
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
    topUpHistories: {
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
    withdrawHistories: {
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
    topUpDetail: {
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
                                                        full_name: {
                                                            type: "string",
                                                        },
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
    withdrawDetail: {
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
                                                                    type:
                                                                        "array",
                                                                    items: {
                                                                        $ref:
                                                                            "#GetBankUtility",
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
    userTopUp: {
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
    userWithdraw: {
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

export default { requestBody, requestParams, requestQuery, responses };
