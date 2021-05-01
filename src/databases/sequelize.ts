import sq from 'sequelize';
import cls from 'cls-hooked';
import { logger } from '../utils/logger';

const namespace = cls.createNamespace('namespace');
const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env as Record<
  string,
  string
>;

sq.Sequelize.useCLS(namespace);

const sequelize = new sq.Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'mysql',
  logging: (msg) => logger.debug(msg),
});

export default sequelize;
