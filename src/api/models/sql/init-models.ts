import { Sequelize } from 'sequelize';
import { Bank } from './Bank';
import type { BankAttributes, BankCreationAttributes } from './Bank';
import { Category } from './Category';
import type { CategoryAttributes, CategoryCreationAttributes } from './Category';
import { Faq } from './Faq';
import type { FaqAttributes, FaqCreationAttributes } from './Faq';
import { Media } from './Media';
import type { MediaAttributes, MediaCreationAttributes } from './Media';
import { Product } from './Product';
import type { ProductAttributes, ProductCreationAttributes } from './Product';
import { User } from './User';
import type { UserAttributes, UserCreationAttributes } from './User';
import { Wallet } from './Wallet';
import type { WalletAttributes, WalletCreationAttributes } from './Wallet';
import { BankUtility } from './BankUtility';
import type { BankUtilityAttributes, BankUtilityCreationAttributes } from './BankUtility';
import { BankAccount } from './BankAccount';
import type { BankAccountAttributes, BankAccountCreationAttributes } from './BankAccount';
import { ProductUtility } from './ProductUtility';
import type { ProductUtilityAttributes, ProductUtilityCreationAttributes } from './ProductUtility';
import { ProductCategory } from './ProductCategory';
import type {
  ProductCategoryAttributes,
  ProductCategoryCreationAttributes,
} from './ProductCategory';
import { ProductPhoto } from './ProductPhoto';
import type { ProductPhotoAttributes, ProductPhotoCreationAttributes } from './ProductPhoto';
import { UserUtility } from './UserUtility';
import type { UserUtilityAttributes, UserUtilityCreationAttributes } from './UserUtility';
import { BankUser } from './BankUser';
import type { BankUserAttributes, BankUserCreationAttributes } from './BankUser';
import { UserCart } from './UserCart';
import type { UserCartAttributes, UserCartCreationAttributes } from './UserCart';
import { UserChat } from './UserChat';
import type { UserChatAttributes, UserChatCreationAttributes } from './UserChat';
import { UserChatDetail } from './UserChatDetail';
import type { UserChatDetailAttributes, UserChatDetailCreationAttributes } from './UserChatDetail';
import { Merchant } from './Merchant';
import type { MerchantAttributes, MerchantCreationAttributes } from './Merchant';
import { MerchantLocation } from './MerchantLocation';
import type {
  MerchantLocationAttributes,
  MerchantLocationCreationAttributes,
} from './MerchantLocation';
import { UserLostPassword } from './UserLostPassword';
import type {
  UserLostPasswordAttributes,
  UserLostPasswordCreationAttributes,
} from './UserLostPassword';
import { UserTransaction } from './UserTransaction';
import type {
  UserTransactionAttributes,
  UserTransactionCreationAttributes,
} from './UserTransaction';
import { ProductReview } from './ProductReview';
import type { ProductReviewAttributes, ProductReviewCreationAttributes } from './ProductReview';
import { TransactionProduct } from './TransactionProduct';
import type {
  TransactionProductAttributes,
  TransactionProductCreationAttributes,
} from './TransactionProduct';
import { UserWallet } from './UserWallet';
import type { UserWalletAttributes, UserWalletCreationAttributes } from './UserWallet';
import { UserTopUp } from './UserTopUp';
import type { UserTopUpAttributes, UserTopUpCreationAttributes } from './UserTopUp';
import { UserWithdraw } from './UserWithdraw';
import type { UserWithdrawAttributes, UserWithdrawCreationAttributes } from './UserWithdraw';

export type ModelType = {
  Bank: Bank;
  Category: Category;
  Faq: Faq;
  Media: Media;
  Product: Product;
  User: User;
  Wallet: Wallet;
  BankUtility: BankUtility;
  BankAccount: BankAccount;
  ProductUtility: ProductUtility;
  ProductCategory: ProductCategory;
  ProductPhoto: ProductPhoto;
  UserUtility: UserUtility;
  BankUser: BankUser;
  UserCart: UserCart;
  UserChat: UserChat;
  UserChatDetail: UserChatDetail;
  Merchant: Merchant;
  MerchantLocation: MerchantLocation;
  UserLostPassword: UserLostPassword;
  UserTransaction: UserTransaction;
  ProductReview: ProductReview;
  TransactionProduct: TransactionProduct;
  UserWallet: UserWallet;
  UserTopUp: UserTopUp;
  UserWithdraw: UserWithdraw;
};

export type {
  BankAttributes,
  BankCreationAttributes,
  CategoryAttributes,
  CategoryCreationAttributes,
  FaqAttributes,
  FaqCreationAttributes,
  MediaAttributes,
  MediaCreationAttributes,
  ProductAttributes,
  ProductCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
  WalletAttributes,
  WalletCreationAttributes,
  BankUtilityAttributes,
  BankUtilityCreationAttributes,
  BankAccountAttributes,
  BankAccountCreationAttributes,
  ProductUtilityAttributes,
  ProductUtilityCreationAttributes,
  ProductCategoryAttributes,
  ProductCategoryCreationAttributes,
  ProductPhotoAttributes,
  ProductPhotoCreationAttributes,
  UserUtilityAttributes,
  UserUtilityCreationAttributes,
  BankUserAttributes,
  BankUserCreationAttributes,
  UserCartAttributes,
  UserCartCreationAttributes,
  UserChatAttributes,
  UserChatCreationAttributes,
  UserChatDetailAttributes,
  UserChatDetailCreationAttributes,
  MerchantAttributes,
  MerchantCreationAttributes,
  MerchantLocationAttributes,
  MerchantLocationCreationAttributes,
  UserLostPasswordAttributes,
  UserLostPasswordCreationAttributes,
  UserTransactionAttributes,
  UserTransactionCreationAttributes,
  ProductReviewAttributes,
  ProductReviewCreationAttributes,
  TransactionProductAttributes,
  TransactionProductCreationAttributes,
  UserWalletAttributes,
  UserWalletCreationAttributes,
  UserTopUpAttributes,
  UserTopUpCreationAttributes,
  UserWithdrawAttributes,
  UserWithdrawCreationAttributes,
};

type Model = {
  Bank: typeof Bank;
  Category: typeof Category;
  Faq: typeof Faq;
  Media: typeof Media;
  Product: typeof Product;
  User: typeof User;
  Wallet: typeof Wallet;
  BankUtility: typeof BankUtility;
  BankAccount: typeof BankAccount;
  ProductUtility: typeof ProductUtility;
  ProductCategory: typeof ProductCategory;
  ProductPhoto: typeof ProductPhoto;
  UserUtility: typeof UserUtility;
  BankUser: typeof BankUser;
  UserCart: typeof UserCart;
  UserChat: typeof UserChat;
  UserChatDetail: typeof UserChatDetail;
  Merchant: typeof Merchant;
  MerchantLocation: typeof MerchantLocation;
  UserLostPassword: typeof UserLostPassword;
  UserTransaction: typeof UserTransaction;
  ProductReview: typeof ProductReview;
  TransactionProduct: typeof TransactionProduct;
  UserWallet: typeof UserWallet;
  UserTopUp: typeof UserTopUp;
  UserWithdraw: typeof UserWithdraw;
};

const initModels = function initModels(sequelize: Sequelize): Model {
  Bank.initModel(sequelize);
  Category.initModel(sequelize);
  Faq.initModel(sequelize);
  Media.initModel(sequelize);
  Product.initModel(sequelize);
  User.initModel(sequelize);
  Wallet.initModel(sequelize);
  BankUtility.initModel(sequelize);
  BankAccount.initModel(sequelize);
  ProductUtility.initModel(sequelize);
  ProductCategory.initModel(sequelize);
  ProductPhoto.initModel(sequelize);
  UserUtility.initModel(sequelize);
  BankUser.initModel(sequelize);
  UserCart.initModel(sequelize);
  UserChat.initModel(sequelize);
  UserChatDetail.initModel(sequelize);
  Merchant.initModel(sequelize);
  MerchantLocation.initModel(sequelize);
  UserLostPassword.initModel(sequelize);
  UserTransaction.initModel(sequelize);
  ProductReview.initModel(sequelize);
  TransactionProduct.initModel(sequelize);
  UserWallet.initModel(sequelize);
  UserTopUp.initModel(sequelize);
  UserWithdraw.initModel(sequelize);

  BankUtility.belongsTo(Bank, {
    as: 'id_m_banks_m_bank',
    foreignKey: 'id_m_banks',
  });
  Bank.hasMany(BankUtility, { as: 'u_banks', foreignKey: 'id_m_banks' });
  BankAccount.belongsTo(Bank, {
    as: 'id_m_banks_m_bank',
    foreignKey: 'id_m_banks',
  });
  Bank.hasMany(BankAccount, {
    as: 'u_bank_accounts',
    foreignKey: 'id_m_banks',
  });
  BankUser.belongsTo(Bank, {
    as: 'id_m_banks_m_bank',
    foreignKey: 'id_m_banks',
  });
  Bank.hasMany(BankUser, {
    as: 'u_user_bank_accounts',
    foreignKey: 'id_m_banks',
  });
  UserTopUp.belongsTo(Bank, {
    as: 'id_m_banks_m_bank',
    foreignKey: 'id_m_banks',
  });
  Bank.hasMany(UserTopUp, {
    as: 'u_user_wallet_top_ups',
    foreignKey: 'id_m_banks',
  });
  ProductCategory.belongsTo(Category, {
    as: 'id_m_categories_m_category',
    foreignKey: 'id_m_categories',
  });
  Category.hasMany(ProductCategory, {
    as: 'u_product_categories',
    foreignKey: 'id_m_categories',
  });
  Bank.belongsTo(Media, {
    as: 'id_logo_m_media',
    foreignKey: 'id_logo',
  });
  Media.hasMany(Bank, { as: 'm_banks', foreignKey: 'id_logo' });
  Category.belongsTo(Media, {
    as: 'id_icon_m_media',
    foreignKey: 'id_icon',
  });
  Media.hasMany(Category, {
    as: 'm_categories',
    foreignKey: 'id_icon',
  });
  Product.belongsTo(Media, {
    as: 'id_cover_m_media',
    foreignKey: 'id_cover',
  });
  Media.hasMany(Product, { as: 'm_products', foreignKey: 'id_cover' });
  User.belongsTo(Media, {
    as: 'id_photo_m_media',
    foreignKey: 'id_photo',
  });
  Media.hasMany(User, { as: 'm_users', foreignKey: 'id_photo' });
  Wallet.belongsTo(Media, {
    as: 'id_logo_m_media',
    foreignKey: 'id_logo',
  });
  Media.hasMany(Wallet, { as: 'm_wallets', foreignKey: 'id_logo' });
  ProductPhoto.belongsTo(Media, {
    as: 'id_m_medias_m_media',
    foreignKey: 'id_m_medias',
  });
  Media.hasMany(ProductPhoto, {
    as: 'u_product_photos',
    foreignKey: 'id_m_medias',
  });
  Merchant.belongsTo(Media, {
    as: 'id_identity_photo_m_media',
    foreignKey: 'id_identity_photo',
  });
  Media.hasMany(Merchant, {
    as: 'u_user_is_merchants',
    foreignKey: 'id_identity_photo',
  });
  Merchant.belongsTo(Media, {
    as: 'id_market_photo_m_media',
    foreignKey: 'id_market_photo',
  });
  Media.hasMany(Merchant, {
    as: 'id_market_photo_u_user_is_merchants',
    foreignKey: 'id_market_photo',
  });
  UserTopUp.belongsTo(Media, {
    as: 'proof',
    foreignKey: 'proof_id',
  });
  Media.hasMany(UserTopUp, {
    as: 'u_user_wallet_top_ups',
    foreignKey: 'proof_id',
  });
  ProductUtility.belongsTo(Product, {
    as: 'id_m_products_m_product',
    foreignKey: 'id_m_products',
  });
  Product.hasMany(ProductUtility, {
    as: 'u_products',
    foreignKey: 'id_m_products',
  });
  UserCart.belongsTo(Product, {
    as: 'id_m_products_m_product',
    foreignKey: 'id_m_products',
  });
  Product.hasMany(UserCart, {
    as: 'u_user_carts',
    foreignKey: 'id_m_products',
  });
  TransactionProduct.belongsTo(Product, {
    as: 'id_m_products_m_product',
    foreignKey: 'id_m_products',
  });
  Product.hasMany(TransactionProduct, {
    as: 'u_user_transaction_products',
    foreignKey: 'id_m_products',
  });
  Product.belongsTo(User, {
    as: 'id_m_users_m_user',
    foreignKey: 'id_m_users',
  });
  User.hasMany(Product, { as: 'm_products', foreignKey: 'id_m_users' });
  UserUtility.belongsTo(User, {
    as: 'id_m_users_m_user',
    foreignKey: 'id_m_users',
  });
  User.hasMany(UserUtility, { as: 'u_users', foreignKey: 'id_m_users' });
  BankUser.belongsTo(User, {
    as: 'id_m_users_m_user',
    foreignKey: 'id_m_users',
  });
  User.hasMany(BankUser, {
    as: 'u_user_bank_accounts',
    foreignKey: 'id_m_users',
  });
  UserCart.belongsTo(User, {
    as: 'id_m_users_m_user',
    foreignKey: 'id_m_users',
  });
  User.hasMany(UserCart, {
    as: 'u_user_carts',
    foreignKey: 'id_m_users',
  });
  UserCart.belongsTo(User, {
    as: 'id_merchant_m_user',
    foreignKey: 'id_merchant',
  });
  User.hasMany(UserCart, {
    as: 'id_merchant_u_user_carts',
    foreignKey: 'id_merchant',
  });
  UserChat.belongsTo(User, { as: 'id_cs_m_user', foreignKey: 'id_cs' });
  User.hasMany(UserChat, { as: 'u_user_chats', foreignKey: 'id_cs' });
  UserChat.belongsTo(User, {
    as: 'id_m_users_m_user',
    foreignKey: 'id_m_users',
  });
  User.hasMany(UserChat, {
    as: 'id_m_users_u_user_chats',
    foreignKey: 'id_m_users',
  });
  UserChatDetail.belongsTo(User, {
    as: 'id_m_users_m_user',
    foreignKey: 'id_m_users',
  });
  User.hasMany(UserChatDetail, {
    as: 'u_user_chat_details',
    foreignKey: 'id_m_users',
  });
  UserTransaction.belongsTo(User, {
    as: 'id_m_users_m_user',
    foreignKey: 'id_m_users',
  });
  User.hasMany(UserTransaction, {
    as: 'u_user_transactions',
    foreignKey: 'id_m_users',
  });
  UserTransaction.belongsTo(User, {
    as: 'id_merchant_m_user',
    foreignKey: 'id_merchant',
  });
  User.hasMany(UserTransaction, {
    as: 'id_merchant_u_user_transactions',
    foreignKey: 'id_merchant',
  });
  UserWallet.belongsTo(Wallet, {
    as: 'id_m_wallets_m_wallet',
    foreignKey: 'id_m_wallets',
  });
  Wallet.hasMany(UserWallet, {
    as: 'u_user_wallets',
    foreignKey: 'id_m_wallets',
  });
  ProductCategory.belongsTo(ProductUtility, {
    as: 'id_u_product_u_product',
    foreignKey: 'id_u_product',
  });
  ProductUtility.hasMany(ProductCategory, {
    as: 'u_product_categories',
    foreignKey: 'id_u_product',
  });
  ProductPhoto.belongsTo(ProductUtility, {
    as: 'id_u_product_u_product',
    foreignKey: 'id_u_product',
  });
  ProductUtility.hasMany(ProductPhoto, {
    as: 'u_product_photos',
    foreignKey: 'id_u_product',
  });
  Merchant.belongsTo(UserUtility, {
    as: 'id_u_user_u_user',
    foreignKey: 'id_u_user',
  });
  UserUtility.hasMany(Merchant, {
    as: 'u_user_is_merchants',
    foreignKey: 'id_u_user',
  });
  UserLostPassword.belongsTo(UserUtility, {
    as: 'id_u_user_u_user',
    foreignKey: 'id_u_user',
  });
  UserUtility.hasMany(UserLostPassword, {
    as: 'u_user_lost_passwords',
    foreignKey: 'id_u_user',
  });
  UserWallet.belongsTo(UserUtility, {
    as: 'id_u_user_u_user',
    foreignKey: 'id_u_user',
  });
  UserUtility.hasMany(UserWallet, {
    as: 'u_user_wallets',
    foreignKey: 'id_u_user',
  });
  UserWithdraw.belongsTo(BankUser, {
    as: 'id_u_user_bank_account_u_user_bank_account',
    foreignKey: 'id_u_user_bank_account',
  });
  BankUser.hasMany(UserWithdraw, {
    as: 'u_user_wallet_withdraws',
    foreignKey: 'id_u_user_bank_account',
  });
  UserChatDetail.belongsTo(UserChat, {
    as: 'id_u_user_chat_u_user_chat',
    foreignKey: 'id_u_user_chat',
  });
  UserChat.hasMany(UserChatDetail, {
    as: 'u_user_chat_details',
    foreignKey: 'id_u_user_chat',
  });
  TransactionProduct.belongsTo(UserTransaction, {
    as: 'id_u_user_transaction_u_user_transaction',
    foreignKey: 'id_u_user_transaction',
  });
  UserTransaction.hasMany(TransactionProduct, {
    as: 'u_user_transaction_products',
    foreignKey: 'id_u_user_transaction',
  });
  ProductReview.belongsTo(TransactionProduct, {
    as: 'id_u_user_transaction_products_u_user_transaction_product',
    foreignKey: 'id_u_user_transaction_products',
  });
  TransactionProduct.hasMany(ProductReview, {
    as: 'u_user_transaction_product_reviews',
    foreignKey: 'id_u_user_transaction_products',
  });
  UserTopUp.belongsTo(UserWallet, {
    as: 'id_u_user_wallet_u_user_wallet',
    foreignKey: 'id_u_user_wallet',
  });
  UserWallet.hasMany(UserTopUp, {
    as: 'u_user_wallet_top_ups',
    foreignKey: 'id_u_user_wallet',
  });
  UserWithdraw.belongsTo(UserWallet, {
    as: 'id_u_user_wallet_u_user_wallet',
    foreignKey: 'id_u_user_wallet',
  });
  UserWallet.hasMany(UserWithdraw, {
    as: 'u_user_wallet_withdraws',
    foreignKey: 'id_u_user_wallet',
  });

  return {
    Bank,
    Category,
    Faq,
    Media,
    Product,
    User,
    Wallet,
    BankUtility,
    BankAccount,
    ProductUtility,
    ProductCategory,
    ProductPhoto,
    UserUtility,
    BankUser,
    UserCart,
    UserChat,
    UserChatDetail,
    Merchant,
    MerchantLocation,
    UserLostPassword,
    UserTransaction,
    ProductReview,
    TransactionProduct,
    UserWallet,
    UserTopUp,
    UserWithdraw,
  };
};

export default initModels;
