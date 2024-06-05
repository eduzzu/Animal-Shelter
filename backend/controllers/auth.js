import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { hashPassword } from "../utils/utils.js";

export const register = async (req, res) => {
    try {
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

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: await hashPassword(password),
            birthDate,
            picturePath,
            occupation,
            location,
            petsAdopted: 0,

        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!email || !password || password.length < 8) {
            return res.status(400).json(`Invalid credentials!`)
        }

        if (!user) {
            return res.status(401).json(`User does not exist.`);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json(`Invalid credentials.`)
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}