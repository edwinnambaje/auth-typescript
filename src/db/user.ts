import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    authentication: {
        password: {
            type: String,
            required: true,
            select: false
        },
        salt: {
            type: String,
            select: false
        },
        sessionKey: {
            type: String,
            select: false
        }
    }
})
export const UserModel = mongoose.model('User', UserSchema)
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: String) => UserModel.findOne({ email })
export const getUserBySessionKey = (sessionToken: String) => UserModel.findOne({
    'authentication.sessionToken': sessionToken,
})
export const getUserById = (id: String) => UserModel.findById(id)
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject())
export const deleteUser = (id: String) => UserModel.findByIdAndDelete({ _id: id })
export const updateUser = (id: String, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)