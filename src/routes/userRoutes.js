import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const userRouter = Router();

// User routes (protected)
userRouter.get("/users", authenticateToken, userController.list);
userRouter.post("/users", userController.create);
userRouter.get("/users/:id", authenticateToken, userController.getById);
userRouter.put("/users/:id", authenticateToken, userController.update);
userRouter.delete("/users/:id", authenticateToken, userController.remove);

export default userRouter;