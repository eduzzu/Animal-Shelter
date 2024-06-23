import Request from "../models/Request.js";
import User from "../models/User.js";
import Pet from "../models/Pet.js";
import mongoose from "mongoose";
import { updateUserAdoptions } from "../utils/utils.js";


export const createRequest = async (req, res) => {
    try {
        const { petId } = req.params;
        const userId = req.user.id;
        const existingRequest = await Request.findOne({userId, petId});
        const pet = await Pet.findById(petId);
        console.log(pet)

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

        console.log(pet.name, pet.breed)

        const newRequest = new Request({
            userId: req.user.id,
            petId,
            firstName,
            lastName,
            age,
            location,
            occupation,
            phoneNumber,
            message,
            petName: pet.name,
            petBreed: pet.breed,
            petCategory: pet.category
        });

        const savedRequest = await newRequest.save();

        if (!savedRequest) {
            return res.status(404).json({ message: error.message });
        }

        await User.findByIdAndUpdate(userId, { $push: { requests: savedRequest._id } });

        return res.status(201).json(savedRequest);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteRequest = async (req, res) => {
    try {
        const { id, requestId } = req.params;
        await updateUserAdoptions(id, requestId, 'remove');
        await Request.findByIdAndDelete(requestId);
        return res.status(200).json(`Adoption request deleted successfully!`);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

export const getAdoptionRequest = async(req, res) => {
    try{
        const {requestId} = req.params;
        const request = await Request.findById(requestId);
        if(!request) {
            return res.status(404).json(`Adoption requests not found.`);
        }

        return res.status(200).json(request);
    } catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const getAdoptionRequests = async(req, res) => {
    try{
        const requests = await Request.find();
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
        const {id} = req.params;
        const user = await User.findById(id);

        if(!user) {
            return res.status(404).json("User not found.");
        }

        const userRequest = await Request.find({userId: id}).populate("petId");


        if (userRequest.length === 0) {
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
        const request = await Request.findById(requestId);

        if(!request) {
            return res.status(404).json("No request found.");
        }

        request.status = status;
        await request.save();
        return res.status(200).json(`Adoption Request ${request.status}!`);

    } catch(error) {
        return res.status(500).json({message: error.message});
    }  
}