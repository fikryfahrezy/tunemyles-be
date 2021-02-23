import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_banks, m_banksId } from "./m_banks";
import type { m_users, m_usersId } from "./m_users";
import type {
  u_user_wallet_withdraw,
  u_user_wallet_withdrawId,
} from "./u_user_wallet_withdraw";

export interface u_user_bank_accountAttributes {
  id: number;
  id_m_banks: number;
  id_m_users: number;
  account_number: string;
  account_name: string;
  is_visible?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type u_user_bank_accountPk = "id";
export type u_user_bank_accountId = u_user_bank_account[u_user_bank_accountPk];
export type u_user_bank_accountCreationAttributes = Optional<
  u_user_bank_accountAttributes,
  u_user_bank_accountPk
>;

export class u_user_bank_account
  extends Model<
    u_user_bank_accountAttributes,
    u_user_bank_accountCreationAttributes
  >
  implements u_user_bank_accountAttributes {
  id!: number;
  id_m_banks!: number;
  id_m_users!: number;
  account_number!: string;
  account_name!: string;
  is_visible?: number;
  created_at?: Date;
  updated_at?: Date;

  // u_user_bank_account belongsTo m_banks via id_m_banks
  id_m_banks_m_bank!: m_banks;
  getId_m_banks_m_bank!: Sequelize.BelongsToGetAssociationMixin<m_banks>;
  setId_m_banks_m_bank!: Sequelize.BelongsToSetAssociationMixin<
    m_banks,
    m_banksId
  >;
  createId_m_banks_m_bank!: Sequelize.BelongsToCreateAssociationMixin<m_banks>;
  // u_user_bank_account belongsTo m_users via id_m_users
  id_m_users_m_user!: m_users;
  getId_m_users_m_user!: Sequelize.BelongsToGetAssociationMixin<m_users>;
  setId_m_users_m_user!: Sequelize.BelongsToSetAssociationMixin<
    m_users,
    m_usersId
  >;
  createId_m_users_m_user!: Sequelize.BelongsToCreateAssociationMixin<m_users>;
  // u_user_bank_account hasMany u_user_wallet_withdraw via id_u_user_bank_account
  u_user_wallet_withdraws!: u_user_wallet_withdraw[];
  getU_user_wallet_withdraws!: Sequelize.HasManyGetAssociationsMixin<u_user_wallet_withdraw>;
  setU_user_wallet_withdraws!: Sequelize.HasManySetAssociationsMixin<
    u_user_wallet_withdraw,
    u_user_wallet_withdrawId
  >;
  addU_user_wallet_withdraw!: Sequelize.HasManyAddAssociationMixin<
    u_user_wallet_withdraw,
    u_user_wallet_withdrawId
  >;
  addU_user_wallet_withdraws!: Sequelize.HasManyAddAssociationsMixin<
    u_user_wallet_withdraw,
    u_user_wallet_withdrawId
  >;
  createU_user_wallet_withdraw!: Sequelize.HasManyCreateAssociationMixin<u_user_wallet_withdraw>;
  removeU_user_wallet_withdraw!: Sequelize.HasManyRemoveAssociationMixin<
    u_user_wallet_withdraw,
    u_user_wallet_withdrawId
  >;
  removeU_user_wallet_withdraws!: Sequelize.HasManyRemoveAssociationsMixin<
    u_user_wallet_withdraw,
    u_user_wallet_withdrawId
  >;
  hasU_user_wallet_withdraw!: Sequelize.HasManyHasAssociationMixin<
    u_user_wallet_withdraw,
    u_user_wallet_withdrawId
  >;
  hasU_user_wallet_withdraws!: Sequelize.HasManyHasAssociationsMixin<
    u_user_wallet_withdraw,
    u_user_wallet_withdrawId
  >;
  countU_user_wallet_withdraws!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof u_user_bank_account {
    u_user_bank_account.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        id_m_banks: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "m_banks",
            key: "id",
          },
        },
        id_m_users: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "m_users",
            key: "id",
          },
        },
        account_number: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: {
            customValidator(value: string) {
              if (value === "")
                throw new Error("account number can't be empty");
            },
            len: {
              args: [2, 255],
              msg: "input proper account number",
            },
          },
        },
        account_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: {
            customValidator(value: string) {
              if (value === "") throw new Error("account name can't be empty");
            },
            len: {
              args: [2, 255],
              msg: "input proper account name",
            },
          },
        },
        is_visible: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 1,
          validate: {
            customValidator(value: number) {
              if (value < 0 || value > 2)
                throw new Error("please input proper visibility");
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
        tableName: "u_user_bank_account",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "id_m_banks",
            using: "BTREE",
            fields: [{ name: "id_m_banks" }],
          },
          {
            name: "id_m_users",
            using: "BTREE",
            fields: [{ name: "id_m_users" }],
          },
        ],
        underscored: true,
      }
    );
    return u_user_bank_account;
  }
}
