import md5 from 'md5';
import jwt from 'jsonwebtoken';
import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { UserUtility, UserUtilityId } from './UserUtility';

export interface UserLostPasswordAttributes {
  id: number;
  id_u_user: number;
  verification_token: string;
  status?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type UserLostPasswordPk = 'id';
export type UserLostPasswordId = UserLostPassword[UserLostPasswordPk];
export type UserLostPasswordCreationAttributes = Optional<
UserLostPasswordAttributes,
UserLostPasswordPk
>;

export class UserLostPassword
  extends Model<
  UserLostPasswordAttributes,
  UserLostPasswordCreationAttributes
  >
  implements UserLostPasswordAttributes {
  id!: number;

  id_u_user!: number;

  verification_token!: string;

  status?: number;

  created_at?: Date;

  updated_at?: Date;

  // u_user_lost_password belongsTo u_user via id_u_user
  userUtility!: UserUtility;

  getUserUtility!: Sequelize.BelongsToGetAssociationMixin<UserUtility>;

  setUserUtility!: Sequelize.BelongsToSetAssociationMixin<
  UserUtility,
  UserUtilityId
  >;

  createUserUtility!: Sequelize.BelongsToCreateAssociationMixin<UserUtility>;

  static initModel(
    sequelize: Sequelize.Sequelize,
  ): typeof UserLostPassword {
    UserLostPassword.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        id_u_user: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'u_user',
            key: 'id',
          },
        },
        verification_token: {
          type: DataTypes.STRING(255),
          allowNull: false,
          set(value: string) {
            const jwtToken = process.env.JWT_TEMP_TOKEN as string;
            const expiresIn = process.env.JWT_TEMP_TOKEN_EXP as string;
            const token = md5(`${Date.now()}${value}`);
            const generatedToken = jwt.sign({ token }, jwtToken, {
              expiresIn,
            });
            this.setDataValue('verification_token', generatedToken);
          },
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
          validate: {
            customValidator(value: number) {
              if (value < 0 || value > 2) throw new Error('please input proper visibility');
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
        tableName: 'u_user_lost_password',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'id_u_user',
            using: 'BTREE',
            fields: [{ name: 'id_u_user' }],
          },
        ],
        underscored: true,
      },
    );
    return UserLostPassword;
  }
}
