import { Router } from "express";
import multer from "multer";
import { authenticateJWT } from "../middlewares/auth";
import { createStudent, uploadResume } from "../controllers/student.controller";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", authenticateJWT, upload.single("resume"), uploadResume);
router.post("/create", createStudent);

export default router;