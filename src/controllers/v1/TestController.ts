import { injectable } from "inversify";
import {
  Tags,
  Get,
  Route,
  Response,
} from "@tsoa/runtime";

@injectable()
@Tags("Test")
@Route("/test")
export class TestController {

  @Response<{ status: number; message: string }>(500) // error response
  @Get("/")
  async Test(
  ): Promise<any> {
    return {
      status: 200,
      message: "Hello World",
    }
  }
}
