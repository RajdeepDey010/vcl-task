import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcryptjs';

interface IStudent extends Document {
  name: string;
  email: string;
  contactNumber: string;
  resume: string;
  uploadDate: Date;
  password: string;
  role: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const studentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  resume: { type: String, default: '' },
  uploadDate: { type: Date, default: Date.now },
  password: { type: String, required: true },
  role: { type: String, default: 'student' }
});

studentSchema.pre("save", async function (next) {
  const student = this;
  if (!student.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(student.password, salt);
  student.password = hash;
  next();
});

studentSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const Student = model<IStudent>("Student", studentSchema);