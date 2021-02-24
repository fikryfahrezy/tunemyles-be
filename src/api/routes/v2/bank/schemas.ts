const requests = {
  "update-bank-user": {
    type: "object",
    properties: {
      id_m_banks: { type: "integer" },
      account_number: { type: "string" },
      account_name: { type: "string" },
    },
    additionalProperties: false,
  },
};

export default { requests };
