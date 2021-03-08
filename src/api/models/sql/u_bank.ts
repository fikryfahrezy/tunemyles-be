import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_banks, m_banksId } from "./m_banks";

export interface u_bankAttributes {
    id: number;
    id_m_banks: number;
    step: string;
    created_at?: Date;
    updated_at?: Date;
}

export type u_bankPk = "id";
export type u_bankId = u_bank[u_bankPk];
export type u_bankCreationAttributes = Optional<u_bankAttributes, u_bankPk>;

export class u_bank
    extends Model<u_bankAttributes, u_bankCreationAttributes>
    implements u_bankAttributes {
    id!: number;
    id_m_banks!: number;
    step!: string;
    created_at?: Date;
    updated_at?: Date;

    // u_bank belongsTo m_banks via id_m_banks
    id_m_banks_m_bank!: m_banks;
    getId_m_banks_m_bank!: Sequelize.BelongsToGetAssociationMixin<m_banks>;
    setId_m_banks_m_bank!: Sequelize.BelongsToSetAssociationMixin<
        m_banks,
        m_banksId
    >;
    createId_m_banks_m_bank!: Sequelize.BelongsToCreateAssociationMixin<m_banks>;

    static initModel(sequelize: Sequelize.Sequelize): typeof u_bank {
        u_bank.init(
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
                step: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                    validate: {
                        customValidator(value: string) {
                            if (value === "")
                                throw new Error("step can't be empty");
                        },
                        len: {
                            args: [2, 1000],
                            msg: "input proper account step",
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
                tableName: "u_bank",
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
        return u_bank;
    }
}
