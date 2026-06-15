const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/authmiddleware");

const { Admin, Volunteer } = require("../db");

const router = express.Router();

router.post("/register", async(req,res)=>{

    try{

        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingAdmin = await Admin.findOne({
            email
        });

        if(existingAdmin){
            return res.status(400).json({
                message: "Admin already exists"
            });
        }

        const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );

        const admin =
        await Admin.create({

            email,
            password: hashedPassword

        });

        res.status(201).json({
            message:"Admin Registered Successfully"
        });

    }
    catch(err){

        res.status(500).json({
            message:err.message
        });

    }

});

router.post("/login", async(req,res)=>{

    try{

        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const admin =
        await Admin.findOne({
            email
        });

        if(!admin){
            return res.status(400).json({
                message:"Admin Not Found"
            });
        }

        const isMatch =
        await bcrypt.compare(
            password,
            admin.password
        );

        if(!isMatch){
            return res.status(400).json({
                message:"Wrong Password"
            });
        }

        const token =
        jwt.sign(
            {
                id:admin._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        );

        res.json({
            message:"Login Successful",
            token
        });

    }
    catch(err){

        res.status(500).json({
            message:err.message
        });

    }

});

router.get("/stats", auth, async(req,res) => {

    try {

        const [total, approved, pending, rejected] = await Promise.all([
            Volunteer.countDocuments(),
            Volunteer.countDocuments({
                status: "Approved"
            }),
            Volunteer.countDocuments({
                status: "Pending"
            }),
            Volunteer.countDocuments({
                status: "Rejected"
            })
        ]);

        res.json({
            total,
            approved,
            pending,
            rejected
        });

    }
    catch(err) {

        res.status(500).json({
            message: err.message
        });

    }

});

router.get("/volunteers", auth, async(req,res)=>{

    try{

        const volunteers =
        await Volunteer.find();

        res.json(volunteers);

    }
    catch(err){

        res.status(500).json({
            message:err.message
        });

    }

});

router.get("/volunteers/:id", auth, async(req,res)=>{

    try{

        const volunteer =
        await Volunteer.findById(
            req.params.id
        );

        if(!volunteer){
            return res.status(404).json({
                message:"Volunteer Not Found"
            });
        }

        res.json(volunteer);

    }
    catch(err){

        res.status(500).json({
            message:err.message
        });

    }

});

router.put("/volunteers/:id/status", auth, async(req,res)=>{

    try{

        const volunteer =
        await Volunteer.findByIdAndUpdate(
            req.params.id,
            {
                status:req.body.status
            },
            {
                new:true
            }
        );

        if(!volunteer){
            return res.status(404).json({
                message:"Volunteer Not Found"
            });
        }

        res.json(volunteer);

    }
    catch(err){

        res.status(500).json({
            message:err.message
        });

    }

});

router.delete("/volunteers/:id", auth, async(req,res)=>{

    try{

        const volunteer =
        await Volunteer.findByIdAndDelete(
            req.params.id
        );

        if(!volunteer){
            return res.status(404).json({
                message:"Volunteer Not Found"
            });
        }

        res.json({
            message:"Volunteer Deleted Successfully"
        });

    }
    catch(err){

        res.status(500).json({
            message:err.message
        });

    }

});

module.exports = router;