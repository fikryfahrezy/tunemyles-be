import md5 from 'md5';
import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from './User';
import type { TransactionProduct, TransactionProductId } from './TransactionProduct';

export interface UserTransactionAttributes {
  id: number;
  id_m_users: number;
  id_merchant: number;
  transaction_token: string;
  total_price?: number;
  status?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type UserTransactionPk = 'id';
export type UserTransactionId = UserTransaction[UserTransactionPk];
export type UserTransactionCreationAttributes = Optional<
  UserTransactionAttributes,
  UserTransactionPk
>;

export class UserTransaction
  extends Model<UserTransactionAttributes, UserTransactionCreationAttributes>
  implements UserTransactionAttributes {
  id!: number;

  id_m_users!: number;

  id_merchant!: number;

  transaction_token!: string;

  total_price?: number;

  status?: number;

  created_at?: Date;

  updated_at?: Date;

  // u_user_transaction belongsTo m_users via id_m_users
  user!: User;

  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;

  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;

  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  // u_user_transaction belongsTo m_users via id_merchant
  merchant!: User;

  getMerchant!: Sequelize.BelongsToGetAssociationMixin<User>;

  setMerchant!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;

  createMerchant!: Sequelize.BelongsToCreateAssociationMixin<User>;

  // u_user_transaction hasMany u_user_transaction_products via id_u_user_transaction
  transactionProducts!: TransactionProduct[];

  getTransactionProducts!: Sequelize.HasManyGetAssociationsMixin<TransactionProduct>;

  setTransactionProducts!: Sequelize.HasManySetAssociationsMixin<
    TransactionProduct,
    TransactionProductId
  >;

  addTransactionProduct!: Sequelize.HasManyAddAssociationMixin<
    TransactionProduct,
    TransactionProductId
  >;

  addTransactionProducts!: Sequelize.HasManyAddAssociationsMixin<
    TransactionProduct,
    TransactionProductId
  >;

  createUserTransactionProduct!: Sequelize.HasManyCreateAssociationMixin<TransactionProduct>;

  removeUserTransactionProduct!: Sequelize.HasManyRemoveAssociationMixin<
    TransactionProduct,
    TransactionProductId
  >;

  removeUserTransactionProducts!: Sequelize.HasManyRemoveAssociationsMixin<
    TransactionProduct,
    TransactionProductId
  >;

  hasUserTransactionProduct!: Sequelize.HasManyHasAssociationMixin<
    TransactionProduct,
    TransactionProductId
  >;

  hasUserTransactionProducts!: Sequelize.HasManyHasAssociationsMixin<
    TransactionProduct,
    TransactionProductId
  >;

  countUserTransactionProducts!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserTransaction {
    UserTransaction.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        id_m_users: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'm_users',
            key: 'id',
          },
        },
        id_merchant: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'm_users',
            key: 'id',
          },
        },
        transaction_token: {
          type: DataTypes.STRING(255),
          allowNull: false,
          set(value: string) {
            const token = md5(`${value}`);
            this.setDataValue('transaction_token', token);
          },
        },
        total_price: {
          type: DataTypes.BIGINT,
          allowNull: true,
          defaultValue: 0,
          validate: {
            isNumeric: {
              msg: 'please input proper price',
            },
          },
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
          validate: {
            isNumeric: {
              msg: 'please input proper status',
            },
            customValidator(value: number) {
              if (value < 0 || value > 4) throw new Error('please input proper visibility');
            },
          },
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
        tableName: 'u_user_transaction',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'id_m_users',
            using: 'BTREE',
            fields: [{ name: 'id_m_users' }],
          },
          {
            name: 'id_merchant',
            using: 'BTREE',
            fields: [{ name: 'id_merchant' }],
          },
        ],
        underscored: true,
      },
    );
    return UserTransaction;
  }
}
