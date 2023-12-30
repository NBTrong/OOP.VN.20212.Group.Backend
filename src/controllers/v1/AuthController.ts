import { injectable } from "inversify";
import {
  Tags,
  Post,
  Route,
  Response,
  Body,
} from "@tsoa/runtime";
import User from '@n-models/User';
import { v4 as uuidv4 } from 'uuid';

@injectable()
@Tags("Auth")
@Route("/api/v1/auth")
export class AuthController {
  @Response<{ status: number; message: string }>(500) // error response
  @Post("/login")
  async login(
    @Body() body: {
      email: string,
      password: string
    },
  ): Promise<any> {
    const { email, password } = body;

    const user = await User.query()
      .select("*")
      .where("email", email)
      .first();

    if (!user)
      throw new Error("User not found")

    if (user.password !== password)
      throw new Error("Email or password error")

    return {
      status: 200,
      message: "success",
      data: user,
    }
  }

  @Response<{ status: number; message: string }>(500) // error response
  @Post("/register")
  async register(
    @Body() body: {
      email: string,
      password: string
    },
  ): Promise<any> {
    const { email, password } = body;

    const user = await User.query()
      .select("*")
      .where("email", email)
      .first();

    if (user)
      throw new Error("Email is existed")

    const user_key = uuidv4();

    const newUser = await User.query().insert({
      email,
      password,
      user_key
    })

    return {
      status: 200,
      message: "success",
      data: newUser,
    }
  }
}
