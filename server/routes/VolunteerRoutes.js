const express = require("express");
const router = express.Router();
const { Volunteer } = require("../db"); 

router.post("/", async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            age,
            skills,
            availability,
            address,
            preferredRole
        } = req.body;

        if (!name || !email || !phone || !age) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields (Name, Email, Phone, Age)"
            });
        }

        const existingVolunteer =
        await Volunteer.findOne({ email }); 

        if (existingVolunteer) {
            return res.status(400).json({
                success: false,
                message: "A volunteer with this email already exists"
            });
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
            success: true,
            message: "Registration successful",
            volunteer
        });

    }
    catch(err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

module.exports = router;