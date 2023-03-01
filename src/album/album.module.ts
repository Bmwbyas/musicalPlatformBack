import { Module } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { AlbumController } from "./album.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Track, TrackSchema } from "../tracks/schema/track.schema";
import { Album, AlbumSchema } from "./schema/album.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }])
  ],
  providers: [AlbumService],
  controllers: [AlbumController]
})
export class AlbumModule {
}
