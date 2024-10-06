import { Request, Response } from "express";
import { Student } from "../models/student.model";
import { Staff } from "../models/staff.model";

export const getUploadHistory = async (req: Request, res: Response) => {
    const students = await Student.find().select("name email contactNumber resume uploadDate");
    res.json(students);
};

export const createStaff = async (req: Request, res: Response): Promise<void> => {
    const { name, email, contactNumber, role, password } = req.body;
    const staff = new Staff({ name, email, contactNumber, role, password });

    try {
        await staff.save();
        res.json({ message: "Staff created successfully", staff });
    } catch (error) {
        console.error("Error creating staff:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};