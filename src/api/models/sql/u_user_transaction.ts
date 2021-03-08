import md5 from "md5";
import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_users, m_usersId } from "./m_users";
import type {
    u_user_transaction_products,
    u_user_transaction_productsId,
} from "./u_user_transaction_products";

export interface u_user_transactionAttributes {
    id: number;
    id_m_users: number;
    id_merchant: number;
    transaction_token: string;
    total_price?: number;
    status?: number;
    created_at?: Date;
    updated_at?: Date;
}

export type u_user_transactionPk = "id";
export type u_user_transactionId = u_user_transaction[u_user_transactionPk];
export type u_user_transactionCreationAttributes = Optional<
    u_user_transactionAttributes,
    u_user_transactionPk
>;

export class u_user_transaction
    extends Model<
        u_user_transactionAttributes,
        u_user_transactionCreationAttributes
    >
    implements u_user_transactionAttributes {
    id!: number;
    id_m_users!: number;
    id_merchant!: number;
    transaction_token!: string;
    total_price?: number;
    status?: number;
    created_at?: Date;
    updated_at?: Date;

    // u_user_transaction belongsTo m_users via id_m_users
    id_m_users_m_user!: m_users;
    getId_m_users_m_user!: Sequelize.BelongsToGetAssociationMixin<m_users>;
    setId_m_users_m_user!: Sequelize.BelongsToSetAssociationMixin<
        m_users,
        m_usersId
    >;
    createId_m_users_m_user!: Sequelize.BelongsToCreateAssociationMixin<m_users>;
    // u_user_transaction belongsTo m_users via id_merchant
    id_merchant_m_user!: m_users;
    getId_merchant_m_user!: Sequelize.BelongsToGetAssociationMixin<m_users>;
    setId_merchant_m_user!: Sequelize.BelongsToSetAssociationMixin<
        m_users,
        m_usersId
    >;
    createId_merchant_m_user!: Sequelize.BelongsToCreateAssociationMixin<m_users>;
    // u_user_transaction hasMany u_user_transaction_products via id_u_user_transaction
    u_user_transaction_products!: u_user_transaction_products[];
    getU_user_transaction_products!: Sequelize.HasManyGetAssociationsMixin<u_user_transaction_products>;
    setU_user_transaction_products!: Sequelize.HasManySetAssociationsMixin<
        u_user_transaction_products,
        u_user_transaction_productsId
    >;
    addU_user_transaction_product!: Sequelize.HasManyAddAssociationMixin<
        u_user_transaction_products,
        u_user_transaction_productsId
    >;
    addU_user_transaction_products!: Sequelize.HasManyAddAssociationsMixin<
        u_user_transaction_products,
        u_user_transaction_productsId
    >;
    createU_user_transaction_product!: Sequelize.HasManyCreateAssociationMixin<u_user_transaction_products>;
    removeU_user_transaction_product!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_transaction_products,
        u_user_transaction_productsId
    >;
    removeU_user_transaction_products!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_transaction_products,
        u_user_transaction_productsId
    >;
    hasU_user_transaction_product!: Sequelize.HasManyHasAssociationMixin<
        u_user_transaction_products,
        u_user_transaction_productsId
    >;
    hasU_user_transaction_products!: Sequelize.HasManyHasAssociationsMixin<
        u_user_transaction_products,
        u_user_transaction_productsId
    >;
    countU_user_transaction_products!: Sequelize.HasManyCountAssociationsMixin;

    static initModel(
        sequelize: Sequelize.Sequelize
    ): typeof u_user_transaction {
        u_user_transaction.init(
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
                        model: "m_users",
                        key: "id",
                    },
                },
                id_merchant: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    references: {
                        model: "m_users",
                        key: "id",
                    },
                },
                transaction_token: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    set(value) {
                        const token = md5(`${value}`);
                        this.setDataValue("transaction_token", token);
                    },
                },
                total_price: {
                    type: DataTypes.BIGINT,
                    allowNull: true,
                    defaultValue: 0,
                    validate: {
                        isNumeric: {
                            msg: "please input proper price",
                        },
                    },
                },
                status: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
                    validate: {
                        isNumeric: {
                            msg: "please input proper status",
                        },
                        customValidator(value: number) {
                            if (value < 0 || value > 4)
                                throw new Error(
                                    "please input proper visibility"
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
                tableName: "u_user_transaction",
                timestamps: false,
                indexes: [
                    {
                        name: "PRIMARY",
                        unique: true,
                        using: "BTREE",
                        fields: [{ name: "id" }],
                    },
                    {
                        name: "id_m_users",
                        using: "BTREE",
                        fields: [{ name: "id_m_users" }],
                    },
                    {
                        name: "id_merchant",
                        using: "BTREE",
                        fields: [{ name: "id_merchant" }],
                    },
                ],
                underscored: true,
            }
        );
        return u_user_transaction;
    }
}
