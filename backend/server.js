require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const schoolRouter = require("./api/routes/schools");

//Cross-Origin
app.use(cors());

app.listen(process.env.api_Port);

// Json Parser
app.use(express.json());
// Parses url encoded 
app.use(express.urlencoded({extended: false}));
// home 
app.use("/schools", schoolRouter);

app.use("*", (req, res) => res.status(404).json({message: "Route not found."}));



