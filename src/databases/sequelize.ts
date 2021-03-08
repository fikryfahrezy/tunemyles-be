import sq from "sequelize";
import cls from "cls-hooked";
import logger from "../utils/logger";

const namespace = cls.createNamespace("namespace");
const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env as {
    [k: string]: string;
};

sq.Sequelize.useCLS(namespace);

export const sequelize = new sq.Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: Number(DB_PORT),
    dialect: "mysql",
    logging: (msg) => logger.debug(msg),
});

export async function sequelizeConnect(): Promise<void> {
    try {
        await sequelize.authenticate();
        logger.info("Connection has been established successfully.");
    } catch (error) {
        logger.error("Unable to connect to the database: %s", error);
    }
}
