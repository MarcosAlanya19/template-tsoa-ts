import { CreateUserDto, LoginUserDto } from "@dtos/user.dto";
import { UserEntity } from "@entities/user.entity";
import { createUserValidator } from "@middlewares/validators/user.validator";
import { userServiceInstance } from "@services/user.service";
import { HttpResponse } from "@utils/httpResponse.utils";
import { LoginUserResponse } from "app/domain/responses/user.response";
import { Body, Controller, Middlewares, Post, Route } from "tsoa";

@Route('users')
export class UserController extends Controller {
  constructor(private readonly userService = userServiceInstance) {
    super();
  }

  @Middlewares(createUserValidator)
  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<HttpResponse<UserEntity>> {
    const newUser = await this.userService.create(body);
    return new HttpResponse<UserEntity>(newUser);
  }

  @Middlewares()
  @Post('login')
  async loginUser(@Body() body: LoginUserDto): Promise<LoginUserResponse> {
    return await this.userService.login(body);
  }
}
