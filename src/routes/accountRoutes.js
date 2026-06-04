import { Router } from "express";
import * as accountController from "../controllers/accountController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const accountRouter = Router();

// Protected routes for accounts
accountRouter.get("/accounts", authenticateToken, accountController.list);
accountRouter.post("/accounts", authenticateToken, accountController.create);
accountRouter.get("/accounts/:id", authenticateToken, accountController.getById);
accountRouter.put("/accounts/:id", authenticateToken, accountController.update);
accountRouter.delete("/accounts/:id", authenticateToken, accountController.remove);

export default accountRouter;