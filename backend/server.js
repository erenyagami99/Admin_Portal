const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const {
  createPortal,
  getPortals,
  updatePortal,
  deletePortal,
} = require("./controllers/portalController");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("api is running good");
});

app.use("/login", (req, res) => {
  res.send({
    token: "test123",
  });
});

app.post("/create-portal", createPortal);
app.get("/get-portals", getPortals);
app.patch("/update-portal/:id", updatePortal);
app.delete("/delete-portal/:id", deletePortal);

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server started ${PORT}`));
