import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/user/auth/jwt-auth.guards";
import { MeetingService } from "./interfaces/MeetingService";
import { CreateMeetingDTO } from "./models/create.meeting";
import { UpdateMeetingDTO } from "./models/update.meeting";
import { Meeting } from "./schema/meeting";

@Controller("meeting")
export class MeetingController {
  constructor(@Inject(MeetingService) private readonly meetingService: MeetingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createMeetingDto: CreateMeetingDTO) {
    console.log("dadada", createMeetingDto);

    await this.meetingService.create(createMeetingDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Meeting[]> {
    return this.meetingService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("/owned/:id")
  async findOwnedById(@Param("id") id: string): Promise<Meeting[]> {
    return this.meetingService.findOwnedById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/participation/:id")
  async findParticipationById(@Param("id") id: string): Promise<Meeting[]> {
    return this.meetingService.findParticipationById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":name")
  async findOne(@Param("name") name: string): Promise<Meeting> {
    return this.meetingService.findOne(name);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":name")
  async delete(@Param("name") name: string): Promise<Meeting> {
    return this.meetingService.delete(name);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async update(@Param("id") id: string, @Body() updateMeetingDTO: UpdateMeetingDTO): Promise<Meeting> {
    return this.meetingService.update(id, updateMeetingDTO);
  }
}
