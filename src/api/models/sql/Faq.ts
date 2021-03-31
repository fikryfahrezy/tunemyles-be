import Sequelize, { DataTypes, Model, Optional } from 'sequelize';

export interface FaqAttributes {
  id: number;
  question: string;
  answer: string;
  created_at?: Date;
  updated_at?: Date;
}

export type FaqPk = 'id';
export type FaqId = Faq[FaqPk];
export type FaqCreationAttributes = Optional<FaqAttributes, FaqPk>;

export class Faq
  extends Model<FaqAttributes, FaqCreationAttributes>
  implements FaqAttributes {
  id!: number;

  question!: string;

  answer!: string;

  created_at?: Date;

  updated_at?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof Faq {
    Faq.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        question: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            customValidator(value: string) {
              if (value === '') throw new Error("question text can't be empty");
            },
            len: {
              args: [2, 1000],
              msg: 'input proper question text',
            },
          },
        },
        answer: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            customValidator(value: string) {
              if (value === '') throw new Error("answer text can't be empty");
            },
            len: {
              args: [2, 1000],
              msg: 'input proper answer text',
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
        tableName: 'm_faq',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
        ],
        underscored: true,
      },
    );
    return Faq;
  }
}
