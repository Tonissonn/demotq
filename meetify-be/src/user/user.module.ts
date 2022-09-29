import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { User, UserSchema } from "./schema/user";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "./auth/constants";
import { AuthService } from "./auth/auth.service";
import { LocalStrategy } from "./auth/local.strategy";
import { JwtStrategy } from "./auth/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "./interfaces/UserService";
import { UserRepository } from "./interfaces/UserRepository";
import { UserServiceImpl } from "./user.service";
import { UserRepositoryImpl } from "./user.repository";

const service = { provide: UserService, useClass: UserServiceImpl };
const repository = { provide: UserRepository, useClass: UserRepositoryImpl };

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  providers: [repository, service, AuthService, LocalStrategy, JwtStrategy],
  controllers: [UserController],
  exports: [service],
})
export class UserModule {}
