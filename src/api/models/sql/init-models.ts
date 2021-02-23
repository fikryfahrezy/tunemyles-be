import type { Sequelize, Model } from "sequelize";
import { m_banks } from "./m_banks";
import type { m_banksAttributes, m_banksCreationAttributes } from "./m_banks";
import { m_categories } from "./m_categories";
import type {
  m_categoriesAttributes,
  m_categoriesCreationAttributes,
} from "./m_categories";
import { m_faq } from "./m_faq";
import type { m_faqAttributes, m_faqCreationAttributes } from "./m_faq";
import { m_medias } from "./m_medias";
import type {
  m_mediasAttributes,
  m_mediasCreationAttributes,
} from "./m_medias";
import { m_products } from "./m_products";
import type {
  m_productsAttributes,
  m_productsCreationAttributes,
} from "./m_products";
import { m_users } from "./m_users";
import type { m_usersAttributes, m_usersCreationAttributes } from "./m_users";
import { m_wallets } from "./m_wallets";
import type {
  m_walletsAttributes,
  m_walletsCreationAttributes,
} from "./m_wallets";
import { u_bank } from "./u_bank";
import type { u_bankAttributes, u_bankCreationAttributes } from "./u_bank";
import { u_bank_account } from "./u_bank_account";
import type {
  u_bank_accountAttributes,
  u_bank_accountCreationAttributes,
} from "./u_bank_account";
import { u_product } from "./u_product";
import type {
  u_productAttributes,
  u_productCreationAttributes,
} from "./u_product";
import { u_product_categories } from "./u_product_categories";
import type {
  u_product_categoriesAttributes,
  u_product_categoriesCreationAttributes,
} from "./u_product_categories";
import { u_product_photos } from "./u_product_photos";
import type {
  u_product_photosAttributes,
  u_product_photosCreationAttributes,
} from "./u_product_photos";
import { u_user } from "./u_user";
import type { u_userAttributes, u_userCreationAttributes } from "./u_user";
import { u_user_bank_account } from "./u_user_bank_account";
import type {
  u_user_bank_accountAttributes,
  u_user_bank_accountCreationAttributes,
} from "./u_user_bank_account";
import { u_user_cart } from "./u_user_cart";
import type {
  u_user_cartAttributes,
  u_user_cartCreationAttributes,
} from "./u_user_cart";
import { u_user_chat } from "./u_user_chat";
import type {
  u_user_chatAttributes,
  u_user_chatCreationAttributes,
} from "./u_user_chat";
import { u_user_chat_detail } from "./u_user_chat_detail";
import type {
  u_user_chat_detailAttributes,
  u_user_chat_detailCreationAttributes,
} from "./u_user_chat_detail";
import { u_user_is_merchant } from "./u_user_is_merchant";
import type {
  u_user_is_merchantAttributes,
  u_user_is_merchantCreationAttributes,
} from "./u_user_is_merchant";
import { u_user_is_merchant_location } from "./u_user_is_merchant_location";
import type {
  u_user_is_merchant_locationAttributes,
  u_user_is_merchant_locationCreationAttributes,
} from "./u_user_is_merchant_location";
import { u_user_lost_password } from "./u_user_lost_password";
import type {
  u_user_lost_passwordAttributes,
  u_user_lost_passwordCreationAttributes,
} from "./u_user_lost_password";
import { u_user_transaction } from "./u_user_transaction";
import type {
  u_user_transactionAttributes,
  u_user_transactionCreationAttributes,
} from "./u_user_transaction";
import { u_user_transaction_product_reviews } from "./u_user_transaction_product_reviews";
import type {
  u_user_transaction_product_reviewsAttributes,
  u_user_transaction_product_reviewsCreationAttributes,
} from "./u_user_transaction_product_reviews";
import { u_user_transaction_products } from "./u_user_transaction_products";
import type {
  u_user_transaction_productsAttributes,
  u_user_transaction_productsCreationAttributes,
} from "./u_user_transaction_products";
import { u_user_wallet } from "./u_user_wallet";
import type {
  u_user_walletAttributes,
  u_user_walletCreationAttributes,
} from "./u_user_wallet";
import { u_user_wallet_top_up } from "./u_user_wallet_top_up";
import type {
  u_user_wallet_top_upAttributes,
  u_user_wallet_top_upCreationAttributes,
} from "./u_user_wallet_top_up";
import { u_user_wallet_withdraw } from "./u_user_wallet_withdraw";
import type {
  u_user_wallet_withdrawAttributes,
  u_user_wallet_withdrawCreationAttributes,
} from "./u_user_wallet_withdraw";

export {
  m_banks,
  m_categories,
  m_faq,
  m_medias,
  m_products,
  m_users,
  m_wallets,
  u_bank,
  u_bank_account,
  u_product,
  u_product_categories,
  u_product_photos,
  u_user,
  u_user_bank_account,
  u_user_cart,
  u_user_chat,
  u_user_chat_detail,
  u_user_is_merchant,
  u_user_is_merchant_location,
  u_user_lost_password,
  u_user_transaction,
  u_user_transaction_product_reviews,
  u_user_transaction_products,
  u_user_wallet,
  u_user_wallet_top_up,
  u_user_wallet_withdraw,
};

export type {
  m_banksAttributes,
  m_banksCreationAttributes,
  m_categoriesAttributes,
  m_categoriesCreationAttributes,
  m_faqAttributes,
  m_faqCreationAttributes,
  m_mediasAttributes,
  m_mediasCreationAttributes,
  m_productsAttributes,
  m_productsCreationAttributes,
  m_usersAttributes,
  m_usersCreationAttributes,
  m_walletsAttributes,
  m_walletsCreationAttributes,
  u_bankAttributes,
  u_bankCreationAttributes,
  u_bank_accountAttributes,
  u_bank_accountCreationAttributes,
  u_productAttributes,
  u_productCreationAttributes,
  u_product_categoriesAttributes,
  u_product_categoriesCreationAttributes,
  u_product_photosAttributes,
  u_product_photosCreationAttributes,
  u_userAttributes,
  u_userCreationAttributes,
  u_user_bank_accountAttributes,
  u_user_bank_accountCreationAttributes,
  u_user_cartAttributes,
  u_user_cartCreationAttributes,
  u_user_chatAttributes,
  u_user_chatCreationAttributes,
  u_user_chat_detailAttributes,
  u_user_chat_detailCreationAttributes,
  u_user_is_merchantAttributes,
  u_user_is_merchantCreationAttributes,
  u_user_is_merchant_locationAttributes,
  u_user_is_merchant_locationCreationAttributes,
  u_user_lost_passwordAttributes,
  u_user_lost_passwordCreationAttributes,
  u_user_transactionAttributes,
  u_user_transactionCreationAttributes,
  u_user_transaction_product_reviewsAttributes,
  u_user_transaction_product_reviewsCreationAttributes,
  u_user_transaction_productsAttributes,
  u_user_transaction_productsCreationAttributes,
  u_user_walletAttributes,
  u_user_walletCreationAttributes,
  u_user_wallet_top_upAttributes,
  u_user_wallet_top_upCreationAttributes,
  u_user_wallet_withdrawAttributes,
  u_user_wallet_withdrawCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  m_banks.initModel(sequelize);
  m_categories.initModel(sequelize);
  m_faq.initModel(sequelize);
  m_medias.initModel(sequelize);
  m_products.initModel(sequelize);
  m_users.initModel(sequelize);
  m_wallets.initModel(sequelize);
  u_bank.initModel(sequelize);
  u_bank_account.initModel(sequelize);
  u_product.initModel(sequelize);
  u_product_categories.initModel(sequelize);
  u_product_photos.initModel(sequelize);
  u_user.initModel(sequelize);
  u_user_bank_account.initModel(sequelize);
  u_user_cart.initModel(sequelize);
  u_user_chat.initModel(sequelize);
  u_user_chat_detail.initModel(sequelize);
  u_user_is_merchant.initModel(sequelize);
  u_user_is_merchant_location.initModel(sequelize);
  u_user_lost_password.initModel(sequelize);
  u_user_transaction.initModel(sequelize);
  u_user_transaction_product_reviews.initModel(sequelize);
  u_user_transaction_products.initModel(sequelize);
  u_user_wallet.initModel(sequelize);
  u_user_wallet_top_up.initModel(sequelize);
  u_user_wallet_withdraw.initModel(sequelize);

  u_bank.belongsTo(m_banks, {
    as: "id_m_banks_m_bank",
    foreignKey: "id_m_banks",
  });
  m_banks.hasMany(u_bank, { as: "u_banks", foreignKey: "id_m_banks" });
  u_bank_account.belongsTo(m_banks, {
    as: "id_m_banks_m_bank",
    foreignKey: "id_m_banks",
  });
  m_banks.hasMany(u_bank_account, {
    as: "u_bank_accounts",
    foreignKey: "id_m_banks",
  });
  u_user_bank_account.belongsTo(m_banks, {
    as: "id_m_banks_m_bank",
    foreignKey: "id_m_banks",
  });
  m_banks.hasMany(u_user_bank_account, {
    as: "u_user_bank_accounts",
    foreignKey: "id_m_banks",
  });
  u_user_wallet_top_up.belongsTo(m_banks, {
    as: "id_m_banks_m_bank",
    foreignKey: "id_m_banks",
  });
  m_banks.hasMany(u_user_wallet_top_up, {
    as: "u_user_wallet_top_ups",
    foreignKey: "id_m_banks",
  });
  u_product_categories.belongsTo(m_categories, {
    as: "id_m_categories_m_category",
    foreignKey: "id_m_categories",
  });
  m_categories.hasMany(u_product_categories, {
    as: "u_product_categories",
    foreignKey: "id_m_categories",
  });
  m_banks.belongsTo(m_medias, { as: "id_logo_m_media", foreignKey: "id_logo" });
  m_medias.hasMany(m_banks, { as: "m_banks", foreignKey: "id_logo" });
  m_categories.belongsTo(m_medias, {
    as: "id_icon_m_media",
    foreignKey: "id_icon",
  });
  m_medias.hasMany(m_categories, { as: "m_categories", foreignKey: "id_icon" });
  m_products.belongsTo(m_medias, {
    as: "id_cover_m_media",
    foreignKey: "id_cover",
  });
  m_medias.hasMany(m_products, { as: "m_products", foreignKey: "id_cover" });
  m_users.belongsTo(m_medias, {
    as: "id_photo_m_media",
    foreignKey: "id_photo",
  });
  m_medias.hasMany(m_users, { as: "m_users", foreignKey: "id_photo" });
  m_wallets.belongsTo(m_medias, {
    as: "id_logo_m_media",
    foreignKey: "id_logo",
  });
  m_medias.hasMany(m_wallets, { as: "m_wallets", foreignKey: "id_logo" });
  u_product_photos.belongsTo(m_medias, {
    as: "id_m_medias_m_media",
    foreignKey: "id_m_medias",
  });
  m_medias.hasMany(u_product_photos, {
    as: "u_product_photos",
    foreignKey: "id_m_medias",
  });
  u_user_is_merchant.belongsTo(m_medias, {
    as: "id_identity_photo_m_media",
    foreignKey: "id_identity_photo",
  });
  m_medias.hasMany(u_user_is_merchant, {
    as: "u_user_is_merchants",
    foreignKey: "id_identity_photo",
  });
  u_user_is_merchant.belongsTo(m_medias, {
    as: "id_market_photo_m_media",
    foreignKey: "id_market_photo",
  });
  m_medias.hasMany(u_user_is_merchant, {
    as: "id_market_photo_u_user_is_merchants",
    foreignKey: "id_market_photo",
  });
  u_user_wallet_top_up.belongsTo(m_medias, {
    as: "proof",
    foreignKey: "proof_id",
  });
  m_medias.hasMany(u_user_wallet_top_up, {
    as: "u_user_wallet_top_ups",
    foreignKey: "proof_id",
  });
  u_product.belongsTo(m_products, {
    as: "id_m_products_m_product",
    foreignKey: "id_m_products",
  });
  m_products.hasMany(u_product, {
    as: "u_products",
    foreignKey: "id_m_products",
  });
  u_user_cart.belongsTo(m_products, {
    as: "id_m_products_m_product",
    foreignKey: "id_m_products",
  });
  m_products.hasMany(u_user_cart, {
    as: "u_user_carts",
    foreignKey: "id_m_products",
  });
  u_user_transaction_products.belongsTo(m_products, {
    as: "id_m_products_m_product",
    foreignKey: "id_m_products",
  });
  m_products.hasMany(u_user_transaction_products, {
    as: "u_user_transaction_products",
    foreignKey: "id_m_products",
  });
  m_products.belongsTo(m_users, {
    as: "id_m_users_m_user",
    foreignKey: "id_m_users",
  });
  m_users.hasMany(m_products, { as: "m_products", foreignKey: "id_m_users" });
  u_user.belongsTo(m_users, {
    as: "id_m_users_m_user",
    foreignKey: "id_m_users",
  });
  m_users.hasMany(u_user, { as: "u_users", foreignKey: "id_m_users" });
  u_user_bank_account.belongsTo(m_users, {
    as: "id_m_users_m_user",
    foreignKey: "id_m_users",
  });
  m_users.hasMany(u_user_bank_account, {
    as: "u_user_bank_accounts",
    foreignKey: "id_m_users",
  });
  u_user_cart.belongsTo(m_users, {
    as: "id_m_users_m_user",
    foreignKey: "id_m_users",
  });
  m_users.hasMany(u_user_cart, {
    as: "u_user_carts",
    foreignKey: "id_m_users",
  });
  u_user_cart.belongsTo(m_users, {
    as: "id_merchant_m_user",
    foreignKey: "id_merchant",
  });
  m_users.hasMany(u_user_cart, {
    as: "id_merchant_u_user_carts",
    foreignKey: "id_merchant",
  });
  u_user_chat.belongsTo(m_users, { as: "id_cs_m_user", foreignKey: "id_cs" });
  m_users.hasMany(u_user_chat, { as: "u_user_chats", foreignKey: "id_cs" });
  u_user_chat.belongsTo(m_users, {
    as: "id_m_users_m_user",
    foreignKey: "id_m_users",
  });
  m_users.hasMany(u_user_chat, {
    as: "id_m_users_u_user_chats",
    foreignKey: "id_m_users",
  });
  u_user_chat_detail.belongsTo(m_users, {
    as: "id_m_users_m_user",
    foreignKey: "id_m_users",
  });
  m_users.hasMany(u_user_chat_detail, {
    as: "u_user_chat_details",
    foreignKey: "id_m_users",
  });
  u_user_transaction.belongsTo(m_users, {
    as: "id_m_users_m_user",
    foreignKey: "id_m_users",
  });
  m_users.hasMany(u_user_transaction, {
    as: "u_user_transactions",
    foreignKey: "id_m_users",
  });
  u_user_transaction.belongsTo(m_users, {
    as: "id_merchant_m_user",
    foreignKey: "id_merchant",
  });
  m_users.hasMany(u_user_transaction, {
    as: "id_merchant_u_user_transactions",
    foreignKey: "id_merchant",
  });
  u_user_wallet.belongsTo(m_wallets, {
    as: "id_m_wallets_m_wallet",
    foreignKey: "id_m_wallets",
  });
  m_wallets.hasMany(u_user_wallet, {
    as: "u_user_wallets",
    foreignKey: "id_m_wallets",
  });
  u_product_categories.belongsTo(u_product, {
    as: "id_u_product_u_product",
    foreignKey: "id_u_product",
  });
  u_product.hasMany(u_product_categories, {
    as: "u_product_categories",
    foreignKey: "id_u_product",
  });
  u_product_photos.belongsTo(u_product, {
    as: "id_u_product_u_product",
    foreignKey: "id_u_product",
  });
  u_product.hasMany(u_product_photos, {
    as: "u_product_photos",
    foreignKey: "id_u_product",
  });
  u_user_is_merchant.belongsTo(u_user, {
    as: "id_u_user_u_user",
    foreignKey: "id_u_user",
  });
  u_user.hasMany(u_user_is_merchant, {
    as: "u_user_is_merchants",
    foreignKey: "id_u_user",
  });
  u_user_lost_password.belongsTo(u_user, {
    as: "id_u_user_u_user",
    foreignKey: "id_u_user",
  });
  u_user.hasMany(u_user_lost_password, {
    as: "u_user_lost_passwords",
    foreignKey: "id_u_user",
  });
  u_user_wallet.belongsTo(u_user, {
    as: "id_u_user_u_user",
    foreignKey: "id_u_user",
  });
  u_user.hasMany(u_user_wallet, {
    as: "u_user_wallets",
    foreignKey: "id_u_user",
  });
  u_user_wallet_withdraw.belongsTo(u_user_bank_account, {
    as: "id_u_user_bank_account_u_user_bank_account",
    foreignKey: "id_u_user_bank_account",
  });
  u_user_bank_account.hasMany(u_user_wallet_withdraw, {
    as: "u_user_wallet_withdraws",
    foreignKey: "id_u_user_bank_account",
  });
  u_user_chat_detail.belongsTo(u_user_chat, {
    as: "id_u_user_chat_u_user_chat",
    foreignKey: "id_u_user_chat",
  });
  u_user_chat.hasMany(u_user_chat_detail, {
    as: "u_user_chat_details",
    foreignKey: "id_u_user_chat",
  });
  u_user_transaction_products.belongsTo(u_user_transaction, {
    as: "id_u_user_transaction_u_user_transaction",
    foreignKey: "id_u_user_transaction",
  });
  u_user_transaction.hasMany(u_user_transaction_products, {
    as: "u_user_transaction_products",
    foreignKey: "id_u_user_transaction",
  });
  u_user_transaction_product_reviews.belongsTo(u_user_transaction_products, {
    as: "id_u_user_transaction_products_u_user_transaction_product",
    foreignKey: "id_u_user_transaction_products",
  });
  u_user_transaction_products.hasMany(u_user_transaction_product_reviews, {
    as: "u_user_transaction_product_reviews",
    foreignKey: "id_u_user_transaction_products",
  });
  u_user_wallet_top_up.belongsTo(u_user_wallet, {
    as: "id_u_user_wallet_u_user_wallet",
    foreignKey: "id_u_user_wallet",
  });
  u_user_wallet.hasMany(u_user_wallet_top_up, {
    as: "u_user_wallet_top_ups",
    foreignKey: "id_u_user_wallet",
  });
  u_user_wallet_withdraw.belongsTo(u_user_wallet, {
    as: "id_u_user_wallet_u_user_wallet",
    foreignKey: "id_u_user_wallet",
  });
  u_user_wallet.hasMany(u_user_wallet_withdraw, {
    as: "u_user_wallet_withdraws",
    foreignKey: "id_u_user_wallet",
  });

  return {
    m_banks: m_banks,
    m_categories: m_categories,
    m_faq: m_faq,
    m_medias: m_medias,
    m_products: m_products,
    m_users: m_users,
    m_wallets: m_wallets,
    u_bank: u_bank,
    u_bank_account: u_bank_account,
    u_product: u_product,
    u_product_categories: u_product_categories,
    u_product_photos: u_product_photos,
    u_user: u_user,
    u_user_bank_account: u_user_bank_account,
    u_user_cart: u_user_cart,
    u_user_chat: u_user_chat,
    u_user_chat_detail: u_user_chat_detail,
    u_user_is_merchant: u_user_is_merchant,
    u_user_is_merchant_location: u_user_is_merchant_location,
    u_user_lost_password: u_user_lost_password,
    u_user_transaction: u_user_transaction,
    u_user_transaction_product_reviews: u_user_transaction_product_reviews,
    u_user_transaction_products: u_user_transaction_products,
    u_user_wallet: u_user_wallet,
    u_user_wallet_top_up: u_user_wallet_top_up,
    u_user_wallet_withdraw: u_user_wallet_withdraw,
  };
}
