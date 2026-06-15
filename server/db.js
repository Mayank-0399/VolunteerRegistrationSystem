const mongoose  = require("mongoose");

const connectDb = async () =>{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
}

const volunteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    phone: {
      type: String,
      required: true
    },

    age: {
      type: Number
    },

    skills: String,

    availability: String,

    address: String,

    role: String,

    status: {
      type: String,
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);
const adminSchema  = new  mongoose.Schema({
  email: {
    type: String,
    required:true,
    unique:true
  },

  password:{
    type :String,
    required :true 
  }
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);
const Admin = mongoose.model("Admin", adminSchema);

module.exports = { connectDb, Volunteer, Admin };