import express from "express";
import { User } from "../controller/user-controller";

export const publicRouter = express.Router();

publicRouter.post("/api/users", User.Register);
publicRouter.post("/api/users/login", User.Login);
