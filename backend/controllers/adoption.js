import Adoption from "../models/Adoption.js";
import User from "../models/User.js";


export const createRequest = async (req, res) => {
    try {
        const { petId } = req.params;
        const userId = req.user.id;
        const existingRequest = await Adoption.findOne({userId, petId});
        
        if(existingRequest) {
            return res.status(404).json("You have already sent a request to adopt this pet.");
        }

        const {
            firstName,
            lastName,
            age,
            location,
            occupation,
            phoneNumber,
            message
        } = req.body;

        

        const newRequest = new Adoption({
            userId: req.user.id,
            petId,
            firstName,
            lastName,
            age,
            location,
            occupation,
            phoneNumber,
            message,
        });

        const savedRequest = await newRequest.save();

        if (!savedRequest) {
            return res.status(404).json({ message: error.message });
        }

        return res.status(201).json(savedRequest);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const request = await Adoption.findByIdAndDelete(requestId);

        if (!request) {
            return res.status(404).json(`Adoption request not found.`);
        }

        return res.status(200).json(`Adoption request deleted successfully!`);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

export const getAdoptionRequests = async(req, res) => {
    try{
        const requests = await Adoption.find();
        if(!requests) {
            return res.status(404).json(`Adoption requests not found.`);
        }

        return res.status(200).json(requests);

    } catch(error) {
        return res.status(500).json({message: error.message});
    }
}

export const getUsersAdoptionRequests = async(req, res) => {
    try{
        const {userId} = req.params;
        const user = await User.findById(userId)

        if(!user) {
            return res.status(404).json("User not found.");
        }

        const userRequest = await Adoption.find({userId}).populate("petId");

        if (userRequests.length === 0) {
            return res.status(404).json({ message: "User has no adoption requests." });
        }

        return res.status(200).json(userRequest);
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
}

export const updateRequestStatus = async(req, res) => {
    try{
        const {requestId} = req.params;
        const {status} = req.body;
        const request = await Adoption.findById(requestId);

        if(!request) {
            return res.status(404).json("No request found.");
        }

        request.status = status;
        await request.save();
        return res.status(200).json(`Adoption Request ${status}!`);

    } catch(error) {
        return res.status(500).json({message: error.message});
    }  
}