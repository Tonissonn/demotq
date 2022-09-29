import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type MeetingDocument = Meeting & Document;

@Schema()
export class Meeting {
  @Prop()
  name: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  ownerId: string;

  @Prop()
  participantsId: string[];

  @Prop()
  roomId: string;
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
