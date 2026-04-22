const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const User = require("../models/User");

const createAdmin = async () => {
    try {
        console.log("Mongo URI:", process.env.MONGO_URI); // debug check

        await mongoose.connect(process.env.MONGO_URI);

        const existingAdmin = await User.findOne({ email: "admin@gmail.com" });

        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);

        const admin = await User.create({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin created:", admin.email);
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

createAdmin();