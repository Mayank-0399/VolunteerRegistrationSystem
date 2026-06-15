const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDb } = require("./db");
const volunteerRoutes = require("./routes/volunteerRoutes");
const adminRoutes  = require("./routes/adminRoutes");
dotenv.config();
connectDb();

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Volunteer API Running");
});


app.use("/api/volunteers", volunteerRoutes);

app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});