import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcryptjs';

interface IStaff extends Document {
  name: string;
  email: string;
  contactNumber: string;
  role: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const staffSchema = new Schema<IStaff>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true }
});

staffSchema.pre("save", async function (next) {
  const staff = this;
  if (!staff.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(staff.password, salt);
  staff.password = hash;
  next();
});

staffSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const Staff = model<IStaff>("Staff", staffSchema);