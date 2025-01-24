import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const UserScheme = new mongoose.Schema({
    id:{type: Number},
    Fname: {type: String},
    Lname: {type: String},
    email: {type: String},
    phone: {type: Number},
    password: {type: String},
    address: {type: String},
    city: {type: String},
    state: {type: String},
    pincode: {type: Number},
    country: {type: String},
    profile: {type: String},
})

//password hash convert
UserScheme.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model("user", UserScheme);
export default User;