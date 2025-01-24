import User from "../models/UserModel.js"

//add user
export const addUser = async (req, res) => {
    const { id, Fname, Lname, email, phone, password, address, city, state, pincode, country } = req.body;
    try {
        const newUser = new User({
            id,
            Fname,
            Lname,
            email,
            phone,
            password,
            address,
            city,
            state,
            pincode,
            country,
            profile: req.file ? req.file.filename : null,
        })
        await newUser.save();
        res.status(200).json({ message: "User Added!!" });
    } catch (err) {
        res.status(500).json({ error: "Failed To add user" });
    }
}

//get User
export const getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//edit User
export const editUser = async (req, res) => {
    const { id } = req.params;
    const { Fname, Lname, email, phone, password, address, city, state, pincode, country } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User Not Found!" });
        }
        user.Fname = Fname || user.Fname;
        user.Lname = Lname || user.Lname;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.password = password || user.password;
        user.address = address || user.address;
        user.city = city || user.city;
        user.state = state || user.state;
        user.pincode = pincode || user.pincode;
        user.country = country || user.country;
        if (req.file) {
            user.profile = req.file.filename;
        }
        await user.save();
        res.status(200).json({ message: "User data updated!!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//delete User
export const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: "user not found!!" });
        }
        res.status(200).json({ message: "user deleted!!" })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//user get By Id
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found!!" })
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
} 

