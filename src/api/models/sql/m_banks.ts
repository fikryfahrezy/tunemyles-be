import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_medias, m_mediasId } from "./m_medias";
import type { u_bank, u_bankId } from "./u_bank";
import type { u_bank_account, u_bank_accountId } from "./u_bank_account";
import type {
  u_user_bank_account,
  u_user_bank_accountId,
} from "./u_user_bank_account";
import type {
  u_user_wallet_top_up,
  u_user_wallet_top_upId,
} from "./u_user_wallet_top_up";

export interface m_banksAttributes {
  id: number;
  bank_name: string;
  id_logo?: number;
  is_visible?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type m_banksPk = "id";
export type m_banksId = m_banks[m_banksPk];
export type m_banksCreationAttributes = Optional<m_banksAttributes, m_banksPk>;

export class m_banks
  extends Model<m_banksAttributes, m_banksCreationAttributes>
  implements m_banksAttributes {
  id!: number;
  bank_name!: string;
  id_logo?: number;
  is_visible?: number;
  created_at?: Date;
  updated_at?: Date;

  // m_banks hasMany u_bank via id_m_banks
  u_banks!: u_bank[];
  getU_banks!: Sequelize.HasManyGetAssociationsMixin<u_bank>;
  setU_banks!: Sequelize.HasManySetAssociationsMixin<u_bank, u_bankId>;
  addU_bank!: Sequelize.HasManyAddAssociationMixin<u_bank, u_bankId>;
  addU_banks!: Sequelize.HasManyAddAssociationsMixin<u_bank, u_bankId>;
  createU_bank!: Sequelize.HasManyCreateAssociationMixin<u_bank>;
  removeU_bank!: Sequelize.HasManyRemoveAssociationMixin<u_bank, u_bankId>;
  removeU_banks!: Sequelize.HasManyRemoveAssociationsMixin<u_bank, u_bankId>;
  hasU_bank!: Sequelize.HasManyHasAssociationMixin<u_bank, u_bankId>;
  hasU_banks!: Sequelize.HasManyHasAssociationsMixin<u_bank, u_bankId>;
  countU_banks!: Sequelize.HasManyCountAssociationsMixin;
  // m_banks hasMany u_bank_account via id_m_banks
  u_bank_accounts!: u_bank_account[];
  getU_bank_accounts!: Sequelize.HasManyGetAssociationsMixin<u_bank_account>;
  setU_bank_accounts!: Sequelize.HasManySetAssociationsMixin<
    u_bank_account,
    u_bank_accountId
  >;
  addU_bank_account!: Sequelize.HasManyAddAssociationMixin<
    u_bank_account,
    u_bank_accountId
  >;
  addU_bank_accounts!: Sequelize.HasManyAddAssociationsMixin<
    u_bank_account,
    u_bank_accountId
  >;
  createU_bank_account!: Sequelize.HasManyCreateAssociationMixin<u_bank_account>;
  removeU_bank_account!: Sequelize.HasManyRemoveAssociationMixin<
    u_bank_account,
    u_bank_accountId
  >;
  removeU_bank_accounts!: Sequelize.HasManyRemoveAssociationsMixin<
    u_bank_account,
    u_bank_accountId
  >;
  hasU_bank_account!: Sequelize.HasManyHasAssociationMixin<
    u_bank_account,
    u_bank_accountId
  >;
  hasU_bank_accounts!: Sequelize.HasManyHasAssociationsMixin<
    u_bank_account,
    u_bank_accountId
  >;
  countU_bank_accounts!: Sequelize.HasManyCountAssociationsMixin;
  // m_banks hasMany u_user_bank_account via id_m_banks
  u_user_bank_accounts!: u_user_bank_account[];
  getU_user_bank_accounts!: Sequelize.HasManyGetAssociationsMixin<u_user_bank_account>;
  setU_user_bank_accounts!: Sequelize.HasManySetAssociationsMixin<
    u_user_bank_account,
    u_user_bank_accountId
  >;
  addU_user_bank_account!: Sequelize.HasManyAddAssociationMixin<
    u_user_bank_account,
    u_user_bank_accountId
  >;
  addU_user_bank_accounts!: Sequelize.HasManyAddAssociationsMixin<
    u_user_bank_account,
    u_user_bank_accountId
  >;
  createU_user_bank_account!: Sequelize.HasManyCreateAssociationMixin<u_user_bank_account>;
  removeU_user_bank_account!: Sequelize.HasManyRemoveAssociationMixin<
    u_user_bank_account,
    u_user_bank_accountId
  >;
  removeU_user_bank_accounts!: Sequelize.HasManyRemoveAssociationsMixin<
    u_user_bank_account,
    u_user_bank_accountId
  >;
  hasU_user_bank_account!: Sequelize.HasManyHasAssociationMixin<
    u_user_bank_account,
    u_user_bank_accountId
  >;
  hasU_user_bank_accounts!: Sequelize.HasManyHasAssociationsMixin<
    u_user_bank_account,
    u_user_bank_accountId
  >;
  countU_user_bank_accounts!: Sequelize.HasManyCountAssociationsMixin;
  // m_banks hasMany u_user_wallet_top_up via id_m_banks
  u_user_wallet_top_ups!: u_user_wallet_top_up[];
  getU_user_wallet_top_ups!: Sequelize.HasManyGetAssociationsMixin<u_user_wallet_top_up>;
  setU_user_wallet_top_ups!: Sequelize.HasManySetAssociationsMixin<
    u_user_wallet_top_up,
    u_user_wallet_top_upId
  >;
  addU_user_wallet_top_up!: Sequelize.HasManyAddAssociationMixin<
    u_user_wallet_top_up,
    u_user_wallet_top_upId
  >;
  addU_user_wallet_top_ups!: Sequelize.HasManyAddAssociationsMixin<
    u_user_wallet_top_up,
    u_user_wallet_top_upId
  >;
  createU_user_wallet_top_up!: Sequelize.HasManyCreateAssociationMixin<u_user_wallet_top_up>;
  removeU_user_wallet_top_up!: Sequelize.HasManyRemoveAssociationMixin<
    u_user_wallet_top_up,
    u_user_wallet_top_upId
  >;
  removeU_user_wallet_top_ups!: Sequelize.HasManyRemoveAssociationsMixin<
    u_user_wallet_top_up,
    u_user_wallet_top_upId
  >;
  hasU_user_wallet_top_up!: Sequelize.HasManyHasAssociationMixin<
    u_user_wallet_top_up,
    u_user_wallet_top_upId
  >;
  hasU_user_wallet_top_ups!: Sequelize.HasManyHasAssociationsMixin<
    u_user_wallet_top_up,
    u_user_wallet_top_upId
  >;
  countU_user_wallet_top_ups!: Sequelize.HasManyCountAssociationsMixin;
  // m_banks belongsTo m_medias via id_logo
  id_logo_m_media!: m_medias;
  getId_logo_m_media!: Sequelize.BelongsToGetAssociationMixin<m_medias>;
  setId_logo_m_media!: Sequelize.BelongsToSetAssociationMixin<
    m_medias,
    m_mediasId
  >;
  createId_logo_m_media!: Sequelize.BelongsToCreateAssociationMixin<m_medias>;

  static initModel(sequelize: Sequelize.Sequelize): typeof m_banks {
    m_banks.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        bank_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: {
            customValidator(value: string) {
              if (value === "") throw new Error("wallet name can't be empty");
            },
            len: {
              args: [2, 255],
              msg: "input proper wallet name",
            },
          },
        },
        id_logo: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: true,
          references: {
            model: "m_medias",
            key: "id",
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
        tableName: "m_banks",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "id_logo",
            using: "BTREE",
            fields: [{ name: "id_logo" }],
          },
        ],
        underscored: true,
      }
    );
    return m_banks;
  }
}
