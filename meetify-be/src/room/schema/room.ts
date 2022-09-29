import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop()
  name: string;

  @Prop()
  capacity: number;

  @Prop()
  futureMeetings: number;

  @Prop()
  currentStatus: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
