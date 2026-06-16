const express = require("express");
const { Volunteer } = require("../db");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { name, email, phone, age, skills, availability, address, preferredRole } = req.body;

        if (!name || !email || !phone || !age) {
            return res.status(400).json({ message: "Required fields are missing" });
        }

        const existingVolunteer = await Volunteer.findOne({ email });
        if (existingVolunteer) {
            return res.status(400).json({ message: "Volunteer already registered with this email" });
        }

        const volunteer = await Volunteer.create({
            name,
            email,
            phone,
            age,
            skills,
            availability,
            address,
            preferredRole,
            status: "Pending"
        });

        res.status(201).json({
            message: "Volunteer Registered Successfully!",
            volunteer
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;