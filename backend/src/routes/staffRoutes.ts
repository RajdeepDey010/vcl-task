import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth";
import { createStaff, getUploadHistory } from "../controllers/staff.controller";

const router = Router();

router.get("/uploads", authenticateJWT, getUploadHistory);
router.post("/create", createStaff);

export default router;