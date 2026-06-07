import { Router } from "express";
import * as categoryController from "../controllers/categoryController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const categoryRouter = Router();

// Category routes (protected)
categoryRouter.get("/categories", authenticateToken, categoryController.getAllCategories);
categoryRouter.post("/categories", authenticateToken, categoryController.createCategory);
categoryRouter.get("/categories/:id", authenticateToken, categoryController.getCategoryById);
categoryRouter.put("/categories/:id", authenticateToken, categoryController.updateCategory);
categoryRouter.delete("/categories/:id", authenticateToken, categoryController.deleteCategory);

export default categoryRouter;