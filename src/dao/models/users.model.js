import mongoose from "mongoose";

const usersCollection = "users"

const userSchema = new mongoose.Schema({
    name: {type: String, required: true }, 
    lastname: {type: String, required: true },
    age: {type: Number, required: true },
    email: {type: String, unique: true, required: true },
    password: {type: String, required: true },
})

const usersModel = mongoose.model(usersCollection, userSchema)

export default usersModel