import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Bank, BankId } from './Bank';

export interface BankAccountAttributes {
  id: number;
  id_m_banks: number;
  account_number: string;
  account_name: string;
  is_visible?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type BankAccountPk = 'id';
export type BankAccountId = BankAccount[BankAccountPk];
export type BankAccountCreationAttributes = Optional<BankAccountAttributes, BankAccountPk>;

export class BankAccount
  extends Model<BankAccountAttributes, BankAccountCreationAttributes>
  implements BankAccountAttributes {
  id!: number;

  id_m_banks!: number;

  account_number!: string;

  account_name!: string;

  is_visible?: number;

  created_at?: Date;

  updated_at?: Date;

  // u_bank_account belongsTo m_banks via id_m_banks
  bank!: Bank;

  getBank!: Sequelize.BelongsToGetAssociationMixin<Bank>;

  setBank!: Sequelize.BelongsToSetAssociationMixin<Bank, BankId>;

  createBank!: Sequelize.BelongsToCreateAssociationMixin<Bank>;

  static initModel(sequelize: Sequelize.Sequelize): typeof BankAccount {
    BankAccount.init(
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
            model: 'm_banks',
            key: 'id',
          },
        },
        account_number: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: {
            customValidator(value: string) {
              if (value === '') throw new Error("account number can't be empty");
            },
            len: {
              args: [2, 255],
              msg: 'input proper account number',
            },
          },
        },
        account_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: {
            customValidator(value: string) {
              if (value === '') throw new Error("account name can't be empty");
            },
            len: {
              args: [2, 255],
              msg: 'input proper account name',
            },
          },
        },
        is_visible: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 1,
          validate: {
            customValidator(value: number) {
              if (value < 0 || value > 2) {
                throw new Error('wallet visibility must be between or equal 0 and 2');
              }
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
        tableName: 'u_bank_account',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'id_m_banks',
            using: 'BTREE',
            fields: [{ name: 'id_m_banks' }],
          },
        ],
        underscored: true,
      },
    );
    return BankAccount;
  }
}
