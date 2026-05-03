const User = require("../models/User");
const bcrypt = require("bcrypt");

// Signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // check existing user
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // hash password
        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed,
            role
        });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ msg: "Wrong password" });
    }

    res.json(user);
};