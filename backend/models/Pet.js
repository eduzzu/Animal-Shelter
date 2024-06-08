import mongoose from "mongoose";

const petSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["M", "F"],
        required: true
    },
    size: {
        type: String,
        required: true
    },
    picturePath: {
        type: String,
        required: true
    },
    health: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Available", "Adopted"],
        default: "Available"
    },
    description: {
        type: String,
        required: true
    },
    previousOwners: Number,
    viewedPet: Number,

}, { timestamps: true });

const Pet = mongoose.model("Pet", petSchema);
export default Pet;