import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config()

// Load routes
import usersRoute from "./routes/users.js";

// Setup Express App
const app = express();

app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.options('*', cors());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Connect to the database
const URI = process.env.MONGODB_URI;
mongoose
    .connect(URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log("Database connected..."))
    .catch((error) => console.log(error.message));

// Use routes
app.use("/user", usersRoute);

// Port
const PORT = process.env.PORT || 5000;

const server =  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

export default server;