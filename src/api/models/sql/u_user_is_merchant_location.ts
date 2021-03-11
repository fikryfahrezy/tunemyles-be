import Sequelize, { DataTypes, Model } from "sequelize";

export interface u_user_is_merchant_locationAttributes {
    id_u_user_is_merchant: number;
    province_id: number;
    province: string;
    city_id: number;
    city: string;
    suburbs_id: number;
    suburbs: string;
    area_id: number;
    area: string;
    post_code: number;
    address: string;
}

export type u_user_is_merchant_locationCreationAttributes = u_user_is_merchant_locationAttributes;

export class u_user_is_merchant_location
    extends Model<
        u_user_is_merchant_locationAttributes,
        u_user_is_merchant_locationCreationAttributes
    >
    implements u_user_is_merchant_locationAttributes {
    id_u_user_is_merchant!: number;
    province_id!: number;
    province!: string;
    city_id!: number;
    city!: string;
    suburbs_id!: number;
    suburbs!: string;
    area_id!: number;
    area!: string;
    post_code!: number;
    address!: string;

    static initModel(
        sequelize: Sequelize.Sequelize
    ): typeof u_user_is_merchant_location {
        u_user_is_merchant_location.init(
            {
                id_u_user_is_merchant: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                },
                province_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                province: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                city_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                city: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                suburbs_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                suburbs: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                area_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                area: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                post_code: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                address: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "u_user_is_merchant_location",
                timestamps: false,
                indexes: [
                    {
                        name: "id_u_user_is_merchant",
                        using: "BTREE",
                        fields: [{ name: "id_u_user_is_merchant" }],
                    },
                ],
            }
        );
        return u_user_is_merchant_location;
    }
}
