import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
    username: string,
    email: string,
    password: string,
    isVerified: boolean,
    otp: string,
    otpExpiry: Date
}

const userSchema: Schema<User> = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid email"]
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    otp: {
        type: String
    },

    otpExpiry: {
        type: Date
    },
})

const userModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", userSchema));
export default userModel;