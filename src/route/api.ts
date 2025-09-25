import express from "express";
import { UserController } from "@/controller/user-controller";
import { authMiddleware } from "@/middleware/auth-middleware";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);

// User Route
apiRouter.delete("/api/users/current", UserController.Logout);
apiRouter.patch("/api/users/current", UserController.UpdateUser);
apiRouter.get("/api/users/current", UserController.GetUsers);
