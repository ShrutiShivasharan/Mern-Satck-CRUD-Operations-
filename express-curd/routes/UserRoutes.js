import express from "express"
import { addUser, getUser, editUser, deleteUser, getUserById } from "../controllers/UserController.js"
import uploadImages from "../middlewares/MulterConfig.js"

const router = express.Router();

router.get("/users", getUser);
router.get("/user/:id", getUserById);
router.post("/addUser", uploadImages.single("profile"), addUser);
router.put("/editUser/:id", uploadImages.single("profile"), editUser)
router.delete("/user/:id", deleteUser)

export default router;