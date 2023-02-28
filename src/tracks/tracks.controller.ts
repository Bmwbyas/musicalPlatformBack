import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Track } from "./schema/track.schema";
import { TracksService } from "./tracks.service";
import { FindTracksDto } from "./dto/filter-tracks.dto";
import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import { ObjectId } from "mongoose";
import { AddCommentDto } from "./dto/add-comment.dto";
import { Comment } from "./schema/comment-schema";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@ApiTags("tracks")
@Controller("/tracks")
export class TracksController {
  constructor(private tracksService: TracksService) {
  }

  @ApiOperation({ summary: "get all filter track" })
  @ApiResponse({ status: 200, type: [Track] })
  // @UseGuards(JwtAuthGuard)
  // @Roles("ADMIN")
  @Get()
  async getFilterTracks(@Query() query: FindTracksDto) {
    return this.tracksService.getFilteredTracks(query);
  }

  @ApiOperation({ summary: "get current track" })
  @ApiResponse({ status: 200, type: Track })
  // @UseGuards(JwtAuthGuard)
  // @Roles("ADMIN")
  @Get(":id")
  async getTracksById(@Param("id") id: ObjectId): Promise<Track> {
    return this.tracksService.getTracksById(id);
  }

  @ApiOperation({ summary: "create track" })
  @ApiResponse({ status: 201, type: Track })
  // @UseGuards(JwtAuthGuard)
  // @Roles("ADMIN")
  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: "audio", maxCount: 1 },
    { name: "image", maxCount: 1 }
  ]))
  async createTrack(@Body() dto: CreateTrackDto,
                    @UploadedFiles() files: { audio?: Express.Multer.File[], image?: Express.Multer.File[] }
  ): Promise<Track> {
    const {audio,image}=files
    return this.tracksService.createTrack(dto, audio[0],image[0]);
  }

  @ApiOperation({ summary: "delete track" })
  @ApiResponse({ status: 203 })
  // @UseGuards(JwtAuthGuard)
  // @Roles("ADMIN")
  @Delete(":id")
  async removeTrack(@Param("id") id: ObjectId) {
    return this.tracksService.removeTrack(id);
  }

  @ApiOperation({ summary: "update track" })
  @ApiResponse({ status: 201 })
  // @UseGuards(JwtAuthGuard)
  // @Roles("ADMIN")
  @Put(":id")
  async updateTrack(
    @Body() dto: UpdateTrackDto,
    @Param("id") id: ObjectId
  ) {
    return this.tracksService.updateTrack(id, dto);
  }

  @ApiOperation({ summary: "create comment" })
  @ApiResponse({ status: 201, type: Comment })
  // @UseGuards(JwtAuthGuard)
  // @Roles("ADMIN")
  @Post("/comment")
  async addComment(@Body() dto: AddCommentDto): Promise<Comment> {
    return this.tracksService.addComment(dto);
  }


}
