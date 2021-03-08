import {
    FastifyRequest,
    FastifyReply,
    RouteHandlerMethod,
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
} from "fastify";
export interface ApiKeyHeader {
    authorization: string;
}
export interface AddBankStepBody {
    step: string;
}

export interface AddBankUserBody {
    id_m_banks: number;
    account_number: string;
    account_name: string;
}

export interface AddFaqBody {
    question: string;
    answer: string;
}

export interface AddToCartBody {
    qty: number;
    id_merchant: number;
    id_m_products: number;
}
export interface BindProductCategoryBody {
    id_category: number;
}

export interface CheckoutBody {
    price_total: number;
}

export interface ForgotPasswordBody {
    phone_number: string;
}

export interface LoginBody {
    username: string;
    password: string;
}

export interface RegisterBody {
    full_name: string;
    username: string;
    password: string;
    phone_number: string;
    address: string;
}

export interface ResetPasswordBody {
    new_password: string;
}

export interface ReviewTransactionBody {
    rating: number;
    review: string;
}

export interface TopUpBody {
    id_m_banks: number;
    balance_request: number;
    balance_transfer: number;
}

export interface UpdateBankBody {
    bank_name?: string;
    is_visible?: number;
}

export interface UpdateBankDetailBody {
    account_number: string;
    account_name: string;
}

export interface UpdateBankUserBody {
    id_m_banks?: number;
    account_number?: string;
    account_name?: string;
}

export interface UpdateCategoryBody {
    category?: string;
    slug?: string;
    description?: string;
    is_visible?: number;
}

export interface UpdateFaqBody {
    question?: string;
    answer?: string;
}

export interface UpdateMerchantOperation {
    market_close_time?: string;
}

export interface UpdateProductBody {
    product_name?: string;
    description?: string;
    price_default?: number;
    price_selling?: number;
    qty?: number;
    discount?: number;
    is_visible?: number;
}

export interface UpdateProductOrderStatusBody {
    status?: number;
}

export interface UpdateProductQtyBody {
    qty: number;
}

export interface UpdateProductStatusBody {
    is_visible?: number;
}

export interface UpdateTopUpStatusBody {
    status?: number;
}

export interface UpdateWalletBody {
    wallet_name?: string;
    wallet_description?: string;
    is_visible?: number;
}

export interface UpdateWithdrawStatusBody {
    status?: number;
}

export interface WithdrawBody {
    id_u_user_bank_account: number;
    balance_request: number;
}

export type UserUtility = {
    id: number;
    id_m_user: number;
    api_token: string;
    type: number;
    type_before_banned: number;
    created_at: string;
    updated_at: string;
};

export type ModelQuery = {
    offset: number;
    limit: number;
    order: [[string, string]];
    availableFields: string[];
};

export type AddedFileBody = {
    data: Iterable<unknown> | AsyncIterable<unknown>;
    encoding: string;
    filename: string;
    limit: boolean;
    mimetype: string;
};

export type FastifyFn = (
    req: FastifyRequest,
    reply: FastifyReply
) => Promise<void>;

export type RequestHandler<Request> = RouteHandlerMethod<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    Request
>;
