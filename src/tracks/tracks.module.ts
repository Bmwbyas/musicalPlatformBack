import { Module } from "@nestjs/common";
import { TracksService } from "./tracks.service";
import { TracksController } from "./tracks.controller";
import { Track, TrackSchema } from "./schema/track.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { Comment, CommentSchema } from "./schema/comment-schema";
import { FileService } from "../file/file.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])],
  providers: [TracksService,FileService],
  controllers: [TracksController]
})
export class TracksModule {
}
