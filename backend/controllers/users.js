import Adoption from "../models/Adoption.js";
import User from "../models/User.js";
import { hashPassword } from "../utils/utils.js";

export const getUsers = async (req, res) => {
    try {
        const user = await User.find();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

export const editUserAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            firstName,
            lastName,
            email,
            password,
            birthDate,
            picturePath,
            occupation,
            location
        } = req.body;
        if (!firstName || !lastName || !email || !password || !birthDate || !picturePath || !occupation || !location) {
            return res.status(400).json(`Please fill all these fields correctly! ${error}`);
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                firstName,
                lastName,
                email,
                password: await hashPassword(password),
                birthDate,
                picturePath,
                occupation,
                location
            }, { new: true })

        if (!updatedUser) {
            return res.status(404).json(`User not found, ${error}`);
        }

        return res.status(200).json(updatedUser);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteUserAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json(`User not found.`)
        }

        return res.status(200).json(`Account deleted successfully!`);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}
