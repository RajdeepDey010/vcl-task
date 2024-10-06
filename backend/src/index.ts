import express from "express";
import { Request, Response } from 'express';
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import studentRoutes from "./routes/studentRoutes";
import staffRoutes from "./routes/staffRoutes";
import bodyParser from "body-parser";
import cors from 'cors';
import path from "path";

const app = express();

mongoose.connect("mongodb://localhost:27017/vcl-StudentManagement").then(() => console.log("Connected to MongoDB..."));

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use("/auth", authRoutes);
app.use("/student", studentRoutes);
app.use("/staff", staffRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req: Request, res: Response) => {
    res.send('Application works!');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});