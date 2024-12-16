import { Response, Request, NextFunction } from "express";
import { CreateUserRequest, LoginRequest } from "../model/user-model";
import { UserService } from "../service/user-service";

export class User {
  static async Register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      const response = await UserService.RegisterService(request);
      res.status(200).json({
        data: response,
        message: "User Created",
        status: true,
      });
    } catch (error) {
      next(error);
    }
  }

  static async Login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginRequest = req.body as LoginRequest;
      const response = await UserService.LoginService(request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async GetUsers() {}
  static async GetSingleUsers() {}
  static async UpdateUser() {}
}
