import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Bank, BankId } from './Bank';

export interface BankUtilityAttributes {
  id: number;
  id_m_banks: number;
  step: string;
  created_at?: Date;
  updated_at?: Date;
}

export type BankUtilityPk = 'id';
export type BankUtilityId = BankUtility[BankUtilityPk];
export type BankUtilityCreationAttributes = Optional<
BankUtilityAttributes,
BankUtilityPk
>;

export class BankUtility
  extends Model<BankUtilityAttributes, BankUtilityCreationAttributes>
  implements BankUtilityAttributes {
  id!: number;

  id_m_banks!: number;

  step!: string;

  created_at?: Date;

  updated_at?: Date;

  // u_bank belongsTo m_banks via id_m_banks
  bank!: Bank;

  getBank!: Sequelize.BelongsToGetAssociationMixin<Bank>;

  setBank!: Sequelize.BelongsToSetAssociationMixin<Bank, BankId>;

  createBank!: Sequelize.BelongsToCreateAssociationMixin<Bank>;

  static initModel(sequelize: Sequelize.Sequelize): typeof BankUtility {
    BankUtility.init(
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
        step: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            customValidator(value: string) {
              if (value === '') throw new Error("step can't be empty");
            },
            len: {
              args: [2, 1000],
              msg: 'input proper account step',
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
        tableName: 'u_bank',
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
    return BankUtility;
  }
}
