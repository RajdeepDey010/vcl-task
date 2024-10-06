import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { Student } from "../models/student.model";
import { Staff } from "../models/staff.model";

const jwtSecret = "your_secret_key";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password, role } = req.body;
  let user;

  if (role === "student") {
    user = await Student.findOne({ email });
  } else if (role === "staff") {
    user = await Staff.findOne({ email });
  } else {
    user = await User.findOne({ username: email });
  }

  if (!user || !(await user.comparePassword(password))) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, jwtSecret, {
    expiresIn: "1h"
  });

  res.json({ token });
};