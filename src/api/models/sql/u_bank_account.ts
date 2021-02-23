import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_banks, m_banksId } from "./m_banks";

export interface u_bank_accountAttributes {
  id: number;
  id_m_banks: number;
  account_number: string;
  account_name: string;
  is_visible?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type u_bank_accountPk = "id";
export type u_bank_accountId = u_bank_account[u_bank_accountPk];
export type u_bank_accountCreationAttributes = Optional<
  u_bank_accountAttributes,
  u_bank_accountPk
>;

export class u_bank_account
  extends Model<u_bank_accountAttributes, u_bank_accountCreationAttributes>
  implements u_bank_accountAttributes {
  id!: number;
  id_m_banks!: number;
  account_number!: string;
  account_name!: string;
  is_visible?: number;
  created_at?: Date;
  updated_at?: Date;

  // u_bank_account belongsTo m_banks via id_m_banks
  id_m_banks_m_bank!: m_banks;
  getId_m_banks_m_bank!: Sequelize.BelongsToGetAssociationMixin<m_banks>;
  setId_m_banks_m_bank!: Sequelize.BelongsToSetAssociationMixin<
    m_banks,
    m_banksId
  >;
  createId_m_banks_m_bank!: Sequelize.BelongsToCreateAssociationMixin<m_banks>;

  static initModel(sequelize: Sequelize.Sequelize): typeof u_bank_account {
    u_bank_account.init(
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
                throw new Error(
                  "wallet visibility must be between or equal 0 and 2"
                );
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
        tableName: "u_bank_account",
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
        ],
        underscored: true,
      }
    );
    return u_bank_account;
  }
}
