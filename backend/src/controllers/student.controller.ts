import { Request, Response } from "express";
import { Student } from "../models/student.model";

interface MulterRequest extends Request {
    file?: Express.Multer.File;
    user?: any;
}

export const uploadResume = async (req: MulterRequest, res: Response): Promise<void> => {
    const { email } = req.body;
    const resume = req.file?.path;

    if (!resume) {
        res.status(400).json({ message: "Resume file is required" });
        return;
    }

    try {
        const student = await Student.findOne({ email });
        if (!student) {
            res.status(404).json({ message: "Student not found" });
            return;
        }

        // Store only the file name
        student.resume = resume.replace(/^uploads[\\/]/, '');
        // student.resume = resume;
        await student.save();

        res.json({ message: "Resume uploaded successfully", student });
    } catch (error) {
        console.error("Error uploading resume:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createStudent = async (req: Request, res: Response): Promise<void> => {
    const { name, email, contactNumber, password } = req.body;
    const student = new Student({ name, email, contactNumber, password, resume: '' });

    try {
        await student.save();
        res.json({ message: "Student created successfully", student });
    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};