import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Bank, BankId } from './Bank';
import type { Category, CategoryId } from './Category';
import type { Product, ProductId } from './Product';
import type { User, UserId } from './User';
import type { Wallet, WalletId } from './Wallet';
import type { ProductPhoto, ProductPhotoId } from './ProductPhoto';
import type { Merchant, MerchantId } from './Merchant';
import type { UserTopUp, UserTopUpId } from './UserTopUp';

export interface MediaAttributes {
  id: number;
  uri: string;
  label: string;
  is_visible?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type MediaPk = 'id';
export type MediaId = Media[MediaPk];
export type MediaCreationAttributes = Optional<MediaAttributes, MediaPk>;

export class Media
  extends Model<MediaAttributes, MediaCreationAttributes>
  implements MediaAttributes {
  id!: number;

  uri!: string;

  label!: string;

  is_visible?: number;

  created_at?: Date;

  updated_at?: Date;

  // m_medias hasMany m_banks via id_logo
  banks!: Bank[];

  getBanks!: Sequelize.HasManyGetAssociationsMixin<Bank>;

  setBanks!: Sequelize.HasManySetAssociationsMixin<Bank, BankId>;

  addBank!: Sequelize.HasManyAddAssociationMixin<Bank, BankId>;

  addBanks!: Sequelize.HasManyAddAssociationsMixin<Bank, BankId>;

  createBank!: Sequelize.HasManyCreateAssociationMixin<Bank>;

  removeBank!: Sequelize.HasManyRemoveAssociationMixin<Bank, BankId>;

  removeBanks!: Sequelize.HasManyRemoveAssociationsMixin<Bank, BankId>;

  hasBank!: Sequelize.HasManyHasAssociationMixin<Bank, BankId>;

  hasBanks!: Sequelize.HasManyHasAssociationsMixin<Bank, BankId>;

  countBanks!: Sequelize.HasManyCountAssociationsMixin;

  // m_medias hasMany m_categories via id_icon
  categories!: Category[];

  getCategories!: Sequelize.HasManyGetAssociationsMixin<Category>;

  setCategories!: Sequelize.HasManySetAssociationsMixin<Category, CategoryId>;

  addCategory!: Sequelize.HasManyAddAssociationMixin<Category, CategoryId>;

  addCategories!: Sequelize.HasManyAddAssociationsMixin<Category, CategoryId>;

  createCategory!: Sequelize.HasManyCreateAssociationMixin<Category>;

  removeCategory!: Sequelize.HasManyRemoveAssociationMixin<
  Category,
  CategoryId
  >;

  removeCategories!: Sequelize.HasManyRemoveAssociationsMixin<
  Category,
  CategoryId
  >;

  hasCategory!: Sequelize.HasManyHasAssociationMixin<Category, CategoryId>;

  hasCategories!: Sequelize.HasManyHasAssociationsMixin<Category, CategoryId>;

  countCategories!: Sequelize.HasManyCountAssociationsMixin;

  // m_medias hasMany m_products via id_cover
  products!: Product[];

  getProducts!: Sequelize.HasManyGetAssociationsMixin<Product>;

  setProducts!: Sequelize.HasManySetAssociationsMixin<Product, ProductId>;

  addProduct!: Sequelize.HasManyAddAssociationMixin<Product, ProductId>;

  addProducts!: Sequelize.HasManyAddAssociationsMixin<Product, ProductId>;

  createProduct!: Sequelize.HasManyCreateAssociationMixin<Product>;

  removeProduct!: Sequelize.HasManyRemoveAssociationMixin<Product, ProductId>;

  removeProducts!: Sequelize.HasManyRemoveAssociationsMixin<Product, ProductId>;

  hasProduct!: Sequelize.HasManyHasAssociationMixin<Product, ProductId>;

  hasProducts!: Sequelize.HasManyHasAssociationsMixin<Product, ProductId>;

  countProducts!: Sequelize.HasManyCountAssociationsMixin;

  // m_medias hasMany m_users via id_photo
  users!: User[];

  getUsers!: Sequelize.HasManyGetAssociationsMixin<User>;

  setUsers!: Sequelize.HasManySetAssociationsMixin<User, UserId>;

  addUser!: Sequelize.HasManyAddAssociationMixin<User, UserId>;

  addUsers!: Sequelize.HasManyAddAssociationsMixin<User, UserId>;

  createUsers!: Sequelize.HasManyCreateAssociationMixin<User>;

  removeUser!: Sequelize.HasManyRemoveAssociationMixin<User, UserId>;

  removeUsers!: Sequelize.HasManyRemoveAssociationsMixin<User, UserId>;

  hasUser!: Sequelize.HasManyHasAssociationMixin<User, UserId>;

  hasUsers!: Sequelize.HasManyHasAssociationsMixin<User, UserId>;

  countUsers!: Sequelize.HasManyCountAssociationsMixin;

  // m_medias hasMany m_wallets via id_logo
  wallets!: Wallet[];

  getWallets!: Sequelize.HasManyGetAssociationsMixin<Wallet>;

  setWallets!: Sequelize.HasManySetAssociationsMixin<Wallet, WalletId>;

  addWallet!: Sequelize.HasManyAddAssociationMixin<Wallet, WalletId>;

  addWallets!: Sequelize.HasManyAddAssociationsMixin<Wallet, WalletId>;

  createWallet!: Sequelize.HasManyCreateAssociationMixin<Wallet>;

  removeWallet!: Sequelize.HasManyRemoveAssociationMixin<Wallet, WalletId>;

  removeWallets!: Sequelize.HasManyRemoveAssociationsMixin<Wallet, WalletId>;

  hasWallet!: Sequelize.HasManyHasAssociationMixin<Wallet, WalletId>;

  hasWallets!: Sequelize.HasManyHasAssociationsMixin<Wallet, WalletId>;

  countWallets!: Sequelize.HasManyCountAssociationsMixin;

  // m_medias hasMany u_product_photos via id_m_medias
  productPhotos!: ProductPhoto[];

  getProductPhotos!: Sequelize.HasManyGetAssociationsMixin<ProductPhoto>;

  setProductPhotos!: Sequelize.HasManySetAssociationsMixin<
  ProductPhoto,
  ProductPhotoId
  >;

  addProductPhoto!: Sequelize.HasManyAddAssociationMixin<
  ProductPhoto,
  ProductPhotoId
  >;

  addProductPhotos!: Sequelize.HasManyAddAssociationsMixin<
  ProductPhoto,
  ProductPhotoId
  >;

  createProductPhoto!: Sequelize.HasManyCreateAssociationMixin<ProductPhoto>;

  removeProductPhoto!: Sequelize.HasManyRemoveAssociationMixin<
  ProductPhoto,
  ProductPhotoId
  >;

  removeProductPhotos!: Sequelize.HasManyRemoveAssociationsMixin<
  ProductPhoto,
  ProductPhotoId
  >;

  hasProductPhoto!: Sequelize.HasManyHasAssociationMixin<
  ProductPhoto,
  ProductPhotoId
  >;

  hasProductPhotos!: Sequelize.HasManyHasAssociationsMixin<
  ProductPhoto,
  ProductPhotoId
  >;

  countProductPhotos!: Sequelize.HasManyCountAssociationsMixin;

  // m_medias hasMany u_user_is_merchant via id_identity_photo
  merchants!: Merchant[];

  getMerchants!: Sequelize.HasManyGetAssociationsMixin<Merchant>;

  setMerchants!: Sequelize.HasManySetAssociationsMixin<Merchant, MerchantId>;

  addMerchant!: Sequelize.HasManyAddAssociationMixin<Merchant, MerchantId>;

  addMerchants!: Sequelize.HasManyAddAssociationsMixin<Merchant, MerchantId>;

  createMerchant!: Sequelize.HasManyCreateAssociationMixin<Merchant>;

  removeMerchant!: Sequelize.HasManyRemoveAssociationMixin<
  Merchant,
  MerchantId
  >;

  removeMerchants!: Sequelize.HasManyRemoveAssociationsMixin<
  Merchant,
  MerchantId
  >;

  hasMerchant!: Sequelize.HasManyHasAssociationMixin<Merchant, MerchantId>;

  hasMerchants!: Sequelize.HasManyHasAssociationsMixin<Merchant, MerchantId>;

  countMerchants!: Sequelize.HasManyCountAssociationsMixin;

  // m_medias hasMany u_user_is_merchant via id_market_photo
  merchantPhotos!: Merchant[];

  getMerchantPhotos!: Sequelize.HasManyGetAssociationsMixin<Merchant>;

  setMerchantPhotos!: Sequelize.HasManySetAssociationsMixin<
  Merchant,
  MerchantId
  >;

  addMerchantPhoto!: Sequelize.HasManyAddAssociationMixin<Merchant, MerchantId>;

  addMerchantPhotos!: Sequelize.HasManyAddAssociationsMixin<
  Merchant,
  MerchantId
  >;

  createMerchantPhoto!: Sequelize.HasManyCreateAssociationMixin<Merchant>;

  removeMerchantPhoto!: Sequelize.HasManyRemoveAssociationMixin<
  Merchant,
  MerchantId
  >;

  removeMerchantPhotos!: Sequelize.HasManyRemoveAssociationsMixin<
  Merchant,
  MerchantId
  >;

  hasMerchantPhoto!: Sequelize.HasManyHasAssociationMixin<Merchant, MerchantId>;

  hasMerchantPhotos!: Sequelize.HasManyHasAssociationsMixin<
  Merchant,
  MerchantId
  >;

  countMerchantPhotos!: Sequelize.HasManyCountAssociationsMixin;

  // m_medias hasMany u_user_wallet_top_up via proof_id
  userTopUps!: UserTopUp[];

  getUserTopUps!: Sequelize.HasManyGetAssociationsMixin<UserTopUp>;

  setUserTopUps!: Sequelize.HasManySetAssociationsMixin<UserTopUp, UserTopUpId>;

  addUserTopUp!: Sequelize.HasManyAddAssociationMixin<UserTopUp, UserTopUpId>;

  addUserTopUps!: Sequelize.HasManyAddAssociationsMixin<UserTopUp, UserTopUpId>;

  createUserTopUp!: Sequelize.HasManyCreateAssociationMixin<UserTopUp>;

  removeUserTopUp!: Sequelize.HasManyRemoveAssociationMixin<
  UserTopUp,
  UserTopUpId
  >;

  removeUserTopUps!: Sequelize.HasManyRemoveAssociationsMixin<
  UserTopUp,
  UserTopUpId
  >;

  hasUserTopUp!: Sequelize.HasManyHasAssociationMixin<UserTopUp, UserTopUpId>;

  hasUserTopUps!: Sequelize.HasManyHasAssociationsMixin<UserTopUp, UserTopUpId>;

  countUserTopUps!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Media {
    Media.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        uri: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        label: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        is_visible: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 1,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'm_medias',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
        ],
        underscored: true,
      },
    );
    return Media;
  }
}
