import { Body, Controller, Delete, Get, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guards";
import { LocalAuthGuard } from "./auth/local-auth.guards";
import { UserService } from "./interfaces/UserService";
import { CreateUserDTO } from "./models/create.user";
import { LoginUserDTO } from "./models/login.user";
import { User } from "./schema/user";

@Controller("user")
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService, private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  async login(@Body() loginUserDTO: LoginUserDTO) {
    return this.authService.login(loginUserDTO);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDTO) {
    await this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":email")
  async findOne(@Param("email") email: string): Promise<User> {
    return this.userService.findOne(email);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<User> {
    return this.userService.delete(id);
  }
}
