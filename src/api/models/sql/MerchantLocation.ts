import Sequelize, { DataTypes, Model } from 'sequelize';

export interface MerchantLocationAttributes {
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

export type MerchantLocationCreationAttributes = MerchantLocationAttributes;

export class MerchantLocation
  extends Model<MerchantLocationAttributes, MerchantLocationCreationAttributes>
  implements MerchantLocationAttributes {
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

  static initModel(sequelize: Sequelize.Sequelize): typeof MerchantLocation {
    MerchantLocation.init(
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
        tableName: 'u_user_is_merchant_location',
        timestamps: false,
        indexes: [
          {
            name: 'id_u_user_is_merchant',
            using: 'BTREE',
            fields: [{ name: 'id_u_user_is_merchant' }],
          },
        ],
      },
    );
    return MerchantLocation;
  }
}
