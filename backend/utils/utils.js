import bcrypt from "bcrypt";
import Pet from "../models/Pet.js";

export const hashPassword = async(password) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}

export const updateAllPets = async() => {
    try{
        await Pet.updateMany({}, {$set: {status: "Available"}})
        console.log("Pets were successfully updated!")
    } catch(error) {
        throw new Error("Couldn't update the pets");
    } 
}

