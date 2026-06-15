const express = require("express");
const router = express.Router();
const { Volunteer } = require("../db"); 
const auth = require("../middleware/authmiddleware"); 

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
            role
        } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });
        }

        const existingVolunteer =
        await Volunteer.findOne({ email }); 

        if (existingVolunteer) {
            return res.status(400).json({
                success: false,
                message: "Volunteer already registered"
            });
        }

        const volunteer =
        await Volunteer.create(req.body);

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