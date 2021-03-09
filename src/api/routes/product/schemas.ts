const requestParams = {
    id: { $ref: "#RouteIdParam" },
};

const requestQuery = {
    getProduct: {
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
                            "product_name",
                            "market_name",
                            "market_address",
                        ],
                    },
                ],
            },
            orderDirection: { $ref: "#OrderDirectionQuery" },
        },
    },
};

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

export default { requestQuery, requestParams, responses };
