import bcrypt from "bcrypt";

export const hashPassword = async(password) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}