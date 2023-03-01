import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from "mongoose";
import * as mongoose  from "mongoose"
import { ApiProperty } from "@nestjs/swagger";
import { Track } from "../../tracks/schema/track.schema";


export type AlbumDocument = HydratedDocument<Album>;

@Schema()
export class Album {
  @ApiProperty({ example: "track name", description: "neme current track" })
  @Prop()
  name: string;

  @ApiProperty({ example: "AC-DC", description: "artist" })
  @Prop()
  author: string;

  @ApiProperty({ example: "maryCrismas.mp3", description: "file with track" })
  @Prop()
  picture: string;



  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Track'}]})
  tracks:Track[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
