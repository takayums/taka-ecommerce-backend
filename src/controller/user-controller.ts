import { Response, Request } from "express";
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prismaClient } from "../application/database";
import { responseUser } from "../model/user-model";

export class User {
  static async Register(req: Request, res: Response) {
    try {
      const registerRequest = req.body;
      const existingUser = await prismaClient.user.count({
        where: {
          email: registerRequest.email,
        },
      });

      if (existingUser == 1) {
        res.status(400).json({ message: "User is already" });
      }

      registerRequest.password = await bcrypt.hash(
        registerRequest.password,
        10,
      );

      const user = await prismaClient.user.create({
        data: registerRequest,
      });

      const data = responseUser(user);

      res.status(201).json({
        message: "register succesfully",
        success: true,
        data: data,
      });
    } catch (error) {
      res.json({
        message: `register failed, ${error}`,
        status: "error",
      });
    }
  }

  static async Login(req: Request, res: Response) {
    try {
      const loginRequest = req.body;
      const jwtSecretKey: string = process.env.SECRETE_KEY as string;
      let user = await prismaClient.user.findUnique({
        where: {
          email: loginRequest.email,
        },
      });

      if (!user) {
        res.status(404).json({ message: "User not found", success: false });
      }

      const passwordMatched = await bcrypt.compare(
        loginRequest.password,
        user!.password,
      );

      if (!passwordMatched) {
        res
          .status(400)
          .json({ message: "Email or Password is wrong", success: false });
      }

      const token = jwt.sign({ data: user?.email }, jwtSecretKey, {
        expiresIn: "1h",
      });

      user = await prismaClient.user.update({
        where: { email: loginRequest.email },
        data: {
          token: token,
        },
      });

      const data = responseUser(user);
      data.token = user.token!;

      res.status(200).json({
        message: "Login Success",
        success: true,
        data: data,
      });
    } catch (error) {
      res.status(400).json({
        message: `Login failed, ${error}`,
        success: false,
      });
    }
  }

  static async GetUsers() {}
  static async GetSingleUsers() {}
  static async UpdateUser() {}
}
