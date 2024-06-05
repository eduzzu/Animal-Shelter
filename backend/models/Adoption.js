import mongoose from "mongoose";

const adoptionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    petId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Accept", "Denied", "Pending"],
        default: "Pending"
    }
}, { timestamps: true }
);

const Adoption = mongoose.model("Adoption", adoptionSchema);
export default Adoption;