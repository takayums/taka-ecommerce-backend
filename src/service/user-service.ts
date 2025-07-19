import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prismaClient } from "@/application/database";
import { logger } from "@/application/logging";

import {
  CreateUserRequest,
  LoginRequest,
  responseUser,
} from "@/model/user-model";

import { ResponseError } from "@/error/response-error";

export class UserService {
  static async RegisterService(request: CreateUserRequest) {
    const existingUser = await prismaClient.user.count({
      where: {
        email: request.email,
      },
    });

    if (existingUser == 1) {
      logger.warn(
        `Registration failed: Email already is use - ${request.email}`,
      );
      throw new ResponseError("User is already", 401);
    }

    request.password = await bcrypt.hash(request.password, 10);

    const user = await prismaClient.user.create({
      data: request,
    });

    const data = responseUser(user);
    return data;
  }

  static async LoginService(request: LoginRequest) {
    const jwtSecretKey: string = process.env.SECRETE_KEY as string;
    let user = await prismaClient.user.findUnique({
      where: {
        email: request.email,
      },
    });

    if (!user) {
      throw new ResponseError("User not found", 404);
    }

    const passwordMatched = await bcrypt.compare(
      request.password,
      user!.password,
    );

    if (!passwordMatched) {
      throw new ResponseError("Email or Password is wrong", 400);
    }

    const token = jwt.sign({ data: user?.email }, jwtSecretKey, {
      expiresIn: "1h",
    });

    user = await prismaClient.user.update({
      where: { email: request.email },
      data: {
        token: token,
      },
    });

    const data = responseUser(user);
    data.token = user.token!;
    return data;
  }
}
