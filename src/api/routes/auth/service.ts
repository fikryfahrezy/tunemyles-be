import { sequelize } from "../../../databases/sequelize";
import { initModels } from "../../models/sql/init-models";
import type { RegisterBody } from "../../types/schema";

const { User, UserUtility, UserWallet } = initModels(sequelize);

export const userRegistration: (
    data: RegisterBody
) => Promise<{ type?: number; token: string }> = async (data) => {
    const user = await User.create(data);
    const userUtility = await UserUtility.create({
        api_token: data.password,
        id_m_users: user.id,
    });
    await UserWallet.create({ id_u_user: userUtility.id });

    const type = userUtility.type;
    const token = userUtility.api_token;

    return { type, token };
};
