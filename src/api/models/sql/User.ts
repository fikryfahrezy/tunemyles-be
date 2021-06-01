import bcrypt from 'bcrypt';
import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Media, MediaId } from './Media';
import type { Product, ProductId } from './Product';
import type { UserUtility, UserUtilityPk } from './UserUtility';
import type { BankUser, BankUserId } from './BankUser';
import type { UserCart, UserCartId } from './UserCart';
import type { UserChat, UserChatId } from './UserChat';
import type { UserChatDetail, UserChatDetailId } from './UserChatDetail';
import type { UserTransaction, UserTransactionId } from './UserTransaction';

export interface UserAttributes {
  id: number;
  full_name: string;
  username: string;
  password: string;
  phone_number: string;
  address: string;
  id_photo?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type UserPk = 'id';
export type UserId = User[UserPk];
export type UserCreationAttributes = Optional<UserAttributes, UserPk>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id!: number;

  full_name!: string;

  username!: string;

  password!: string;

  phone_number!: string;

  address!: string;

  id_photo?: number;

  created_at?: Date;

  updated_at?: Date;

  // m_users belongsTo m_medias via id_photo
  media!: Media;

  getMedia!: Sequelize.BelongsToGetAssociationMixin<Media>;

  setMedia!: Sequelize.BelongsToSetAssociationMixin<Media, MediaId>;

  createMedia!: Sequelize.BelongsToCreateAssociationMixin<Media>;

  // m_users hasMany m_products via id_m_users
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

  // m_users hasMany u_user via id_m_users
  userUtilities!: UserUtility[];

  getUserUtilities!: Sequelize.HasManyGetAssociationsMixin<UserUtility>;

  setUserUtilities!: Sequelize.HasManySetAssociationsMixin<UserUtility, UserUtilityPk>;

  addUserUtility!: Sequelize.HasManyAddAssociationMixin<UserUtility, UserUtilityPk>;

  addUserUtilities!: Sequelize.HasManyAddAssociationsMixin<UserUtility, UserUtilityPk>;

  createUserUtilities!: Sequelize.HasManyCreateAssociationMixin<UserUtility>;

  removeUserUtility!: Sequelize.HasManyRemoveAssociationMixin<UserUtility, UserUtilityPk>;

  removeUserUtilities!: Sequelize.HasManyRemoveAssociationsMixin<UserUtility, UserUtilityPk>;

  hasUserUtility!: Sequelize.HasManyHasAssociationMixin<UserUtility, UserUtilityPk>;

  hasUserUtilities!: Sequelize.HasManyHasAssociationsMixin<UserUtility, UserUtilityPk>;

  countUserUtilities!: Sequelize.HasManyCountAssociationsMixin;

  // m_users hasMany u_user_bank_account via id_m_users
  bankUsers!: BankUser[];

  getBankUsers!: Sequelize.HasManyGetAssociationsMixin<BankUser>;

  setBankUsers!: Sequelize.HasManySetAssociationsMixin<BankUser, BankUserId>;

  addBankUser!: Sequelize.HasManyAddAssociationMixin<BankUser, BankUserId>;

  addBankUsers!: Sequelize.HasManyAddAssociationsMixin<BankUser, BankUserId>;

  createBankUser!: Sequelize.HasManyCreateAssociationMixin<BankUser>;

  removeBankUser!: Sequelize.HasManyRemoveAssociationMixin<BankUser, BankUserId>;

  removeBankUsers!: Sequelize.HasManyRemoveAssociationsMixin<BankUser, BankUserId>;

  hasBankUser!: Sequelize.HasManyHasAssociationMixin<BankUser, BankUserId>;

  hasBankUsers!: Sequelize.HasManyHasAssociationsMixin<BankUser, BankUserId>;

  countBankUsers!: Sequelize.HasManyCountAssociationsMixin;

  // m_users hasMany u_user_cart via id_m_users
  userCarts!: UserCart[];

  getUserCarts!: Sequelize.HasManyGetAssociationsMixin<UserCart>;

  setUserCarts!: Sequelize.HasManySetAssociationsMixin<UserCart, UserCartId>;

  addUserCart!: Sequelize.HasManyAddAssociationMixin<UserCart, UserCartId>;

  addUserCarts!: Sequelize.HasManyAddAssociationsMixin<UserCart, UserCartId>;

  createUserCart!: Sequelize.HasManyCreateAssociationMixin<UserCart>;

  removeUserCart!: Sequelize.HasManyRemoveAssociationMixin<UserCart, UserCartId>;

  removeUserCarts!: Sequelize.HasManyRemoveAssociationsMixin<UserCart, UserCartId>;

  hasUserCart!: Sequelize.HasManyHasAssociationMixin<UserCart, UserCartId>;

  hasUserCarts!: Sequelize.HasManyHasAssociationsMixin<UserCart, UserCartId>;

  countUserCarts!: Sequelize.HasManyCountAssociationsMixin;

  // m_users hasMany u_user_cart via id_merchant
  merchatCharts!: UserCart[];

  getMerchatCharts!: Sequelize.HasManyGetAssociationsMixin<UserCart>;

  setMerchatCharts!: Sequelize.HasManySetAssociationsMixin<UserCart, UserCartId>;

  addMerchatChart!: Sequelize.HasManyAddAssociationMixin<UserCart, UserCartId>;

  addMerchatCharts!: Sequelize.HasManyAddAssociationsMixin<UserCart, UserCartId>;

  createMerchatChart!: Sequelize.HasManyCreateAssociationMixin<UserCart>;

  removeMerchatChart!: Sequelize.HasManyRemoveAssociationMixin<UserCart, UserCartId>;

  removeMerchatCharts!: Sequelize.HasManyRemoveAssociationsMixin<UserCart, UserCartId>;

  hasMerchatChart!: Sequelize.HasManyHasAssociationMixin<UserCart, UserCartId>;

  hasMerchatCharts!: Sequelize.HasManyHasAssociationsMixin<UserCart, UserCartId>;

  countMerchatCharts!: Sequelize.HasManyCountAssociationsMixin;

  // m_users hasMany u_user_chat via id_cs
  csChats!: UserChat[];

  getCsChats!: Sequelize.HasManyGetAssociationsMixin<UserChat>;

  setCsChats!: Sequelize.HasManySetAssociationsMixin<UserChat, UserChatId>;

  addCsChat!: Sequelize.HasManyAddAssociationMixin<UserChat, UserChatId>;

  addCsChats!: Sequelize.HasManyAddAssociationsMixin<UserChat, UserChatId>;

  createCsChat!: Sequelize.HasManyCreateAssociationMixin<UserChat>;

  removeCsChat!: Sequelize.HasManyRemoveAssociationMixin<UserChat, UserChatId>;

  removeCsChats!: Sequelize.HasManyRemoveAssociationsMixin<UserChat, UserChatId>;

  hasCsChat!: Sequelize.HasManyHasAssociationMixin<UserChat, UserChatId>;

  hasCsChats!: Sequelize.HasManyHasAssociationsMixin<UserChat, UserChatId>;

  countCsChats!: Sequelize.HasManyCountAssociationsMixin;

  // m_users hasMany u_user_chat via id_m_users
  userChats!: UserChat[];

  getUserChats!: Sequelize.HasManyGetAssociationsMixin<UserChat>;

  setUserChats!: Sequelize.HasManySetAssociationsMixin<UserChat, UserChatId>;

  addUserChat!: Sequelize.HasManyAddAssociationMixin<UserChat, UserChatId>;

  addUserChats!: Sequelize.HasManyAddAssociationsMixin<UserChat, UserChatId>;

  createUserChat!: Sequelize.HasManyCreateAssociationMixin<UserChat>;

  removeUserChat!: Sequelize.HasManyRemoveAssociationMixin<UserChat, UserChatId>;

  removeUserChats!: Sequelize.HasManyRemoveAssociationsMixin<UserChat, UserChatId>;

  hasUserChat!: Sequelize.HasManyHasAssociationMixin<UserChat, UserChatId>;

  hasUserChats!: Sequelize.HasManyHasAssociationsMixin<UserChat, UserChatId>;

  countUserChats!: Sequelize.HasManyCountAssociationsMixin;

  // m_users hasMany u_user_chat_detail via id_m_users
  userChatDetails!: UserChatDetail[];

  getUserChatDetails!: Sequelize.HasManyGetAssociationsMixin<UserChatDetail>;

  setUserChatDetails!: Sequelize.HasManySetAssociationsMixin<UserChatDetail, UserChatDetailId>;

  addUserChatDetail!: Sequelize.HasManyAddAssociationMixin<UserChatDetail, UserChatDetailId>;

  addUserChatDetails!: Sequelize.HasManyAddAssociationsMixin<UserChatDetail, UserChatDetailId>;

  createUserChatDetail!: Sequelize.HasManyCreateAssociationMixin<UserChatDetail>;

  removeUserChatDetail!: Sequelize.HasManyRemoveAssociationMixin<UserChatDetail, UserChatDetailId>;

  removeUserChatDetails!: Sequelize.HasManyRemoveAssociationsMixin<
    UserChatDetail,
    UserChatDetailId
  >;

  hasUserChatDetail!: Sequelize.HasManyHasAssociationMixin<UserChatDetail, UserChatDetailId>;

  hasUserChatDetails!: Sequelize.HasManyHasAssociationsMixin<UserChatDetail, UserChatDetailId>;

  countUserChatDetails!: Sequelize.HasManyCountAssociationsMixin;

  // m_users hasMany u_user_transaction via id_m_users
  userTransactions!: UserTransaction[];

  getUserTransactions!: Sequelize.HasManyGetAssociationsMixin<UserTransaction>;

  setUserTransactions!: Sequelize.HasManySetAssociationsMixin<UserTransaction, UserTransactionId>;

  addUserTransaction!: Sequelize.HasManyAddAssociationMixin<UserTransaction, UserTransactionId>;

  addUserTransactions!: Sequelize.HasManyAddAssociationsMixin<UserTransaction, UserTransactionId>;

  createUserTransaction!: Sequelize.HasManyCreateAssociationMixin<UserTransaction>;

  removeUserTransaction!: Sequelize.HasManyRemoveAssociationMixin<
    UserTransaction,
    UserTransactionId
  >;

  removeUserTransactions!: Sequelize.HasManyRemoveAssociationsMixin<
    UserTransaction,
    UserTransactionId
  >;

  hasUserTransaction!: Sequelize.HasManyHasAssociationMixin<UserTransaction, UserTransactionId>;

  hasUserTransactions!: Sequelize.HasManyHasAssociationsMixin<UserTransaction, UserTransactionId>;

  countUserTransactions!: Sequelize.HasManyCountAssociationsMixin;

  // m_users hasMany u_user_transaction via id_merchant
  merchantTransactions!: UserTransaction[];

  getMerchantTransactions!: Sequelize.HasManyGetAssociationsMixin<UserTransaction>;

  setMerchantTransactions!: Sequelize.HasManySetAssociationsMixin<
    UserTransaction,
    UserTransactionId
  >;

  addMerchantTransaction!: Sequelize.HasManyAddAssociationMixin<UserTransaction, UserTransactionId>;

  addMerchantTransactions!: Sequelize.HasManyAddAssociationsMixin<
    UserTransaction,
    UserTransactionId
  >;

  createMerchantTransaction!: Sequelize.HasManyCreateAssociationMixin<UserTransaction>;

  removeMerchantTransaction!: Sequelize.HasManyRemoveAssociationMixin<
    UserTransaction,
    UserTransactionId
  >;

  removeMerchantTransactions!: Sequelize.HasManyRemoveAssociationsMixin<
    UserTransaction,
    UserTransactionId
  >;

  hasMerchantTransaction!: Sequelize.HasManyHasAssociationMixin<UserTransaction, UserTransactionId>;

  hasMerchantTransactions!: Sequelize.HasManyHasAssociationsMixin<
    UserTransaction,
    UserTransactionId
  >;

  countMerchantTransactions!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    User.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        full_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: {
            customValidator(value: string) {
              if (value === '') throw new Error("name can't be empty");
            },
            len: {
              args: [2, 255],
              msg: 'input proper name',
            },
          },
        },
        username: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: {
            name: 'username',
            msg: 'username already used',
          },
          validate: {
            is: {
              /**
               * Regular expression to validate username
               * https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username/12019115
               */
              args: /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/i,
              msg: 'please input proper username',
            },
          },
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
          set(value) {
            let length = 0;

            if (typeof value === 'string') length = value.length;
            else length = String(value).length;

            if (length < 8 || length > 255) throw new Error('password is too short or too long');

            this.setDataValue('password', bcrypt.hashSync(value, 10));
          },
        },
        phone_number: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: {
            name: 'phone_number',
            msg: 'phone number already used',
          },
          validate: {
            is: {
              /**
               * Validate phone number with JavaScript
               * https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
               */
              args: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,13}$/im,
              msg: 'please input proper phone number',
            },
          },
        },
        address: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            customValidator(value: string) {
              if (value === '') throw new Error("address can't be empty");
            },
            len: {
              args: [5, 1000],
              msg: 'input proper address',
            },
          },
        },
        id_photo: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: true,
          references: {
            model: 'm_medias',
            key: 'id',
          },
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: Date.now(),
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: Date.now(),
        },
      },
      {
        sequelize,
        tableName: 'm_users',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'username',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'username' }],
          },
          {
            name: 'phone_number',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'phone_number' }],
          },
          {
            name: 'id_photo',
            using: 'BTREE',
            fields: [{ name: 'id_photo' }],
          },
        ],
        underscored: true,
      },
    );
    return User;
  }
}
