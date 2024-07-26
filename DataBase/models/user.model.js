import { Schema, model } from "mongoose";
import { roles, status } from "../../src/utils/enum.js";

const userSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    mobileNumber: {
        type: String,
        unique: true,
        required: true,
    },
    recoveryEmail: {
        type: String,
        required: true,
    },
    verifyEmail: {
        type: Boolean,
        default: false
    },

    password: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(roles),
        default: roles.USER,
    },
    status: {
        type: String,
        enum: Object.values(status),
        default: status.OFFLINE,
    }


})

const UserModel = model('User', userSchema)

export default UserModel