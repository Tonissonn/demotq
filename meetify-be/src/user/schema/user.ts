import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "../roles/role.enum";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
