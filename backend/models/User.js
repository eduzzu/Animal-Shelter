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
        age: {
            type: Number,
            required: true,
            min: 18,
            max: 100
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
        petsAdopted: Number,
        appointments: {
            type: [String],
            default: []
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    }, { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;