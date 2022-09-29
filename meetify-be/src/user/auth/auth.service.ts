import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../interfaces/UserService";
import { LoginUserDTO } from "../models/login.user";
import { NoPassUserDTO } from "../models/no.pass.user";

@Injectable()
export class AuthService {
  constructor(@Inject(UserService) private usersService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<NoPassUserDTO> {
    const user = await this.usersService.checkPass(email, pass);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginUserDTO) {
    const loggedUser = await this.usersService.findOne(user.email);
    const payload = { _id: loggedUser._id, name: loggedUser.name, email: loggedUser.email, role: loggedUser.role };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: "15m" }),
    };
  }
}
