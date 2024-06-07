import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
    try {

        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).json(`Access denied!`);
        }

        if (token.startsWith(`Bearer `)) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const isMyAccount = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (user.id !== req.user.id && req.user.isAdmin === false) {
            return res.status(401).json(`You do not have permission to do that`)
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

export const isAdmin = async(req, res, next) => {
    try{
        if(req.user.isAdmin === false) {
            return res.status(401).json("You do not have permission to do that!");
        }
        next();
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
    

}