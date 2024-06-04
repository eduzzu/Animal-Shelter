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
    breed: {
        type: String,
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
    description: {
        type: String,
        required: true
    },
    previousOwners: Number,
    viewedPet: Number,

}, { timestamps: true });

const Pet = mongoose.model("Pet", petSchema);
export default Pet;