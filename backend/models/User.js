import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        birthDate: {
            type: Date,
            required: true,
        },
        picturePath: {
            type: String,
            required: true
        },
        occupation: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        petsAdopted: {
            type: Number,
            default: 0
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    }, { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;