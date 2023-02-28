import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from "mongoose";
import * as mongoose  from "mongoose"
import { ApiProperty } from "@nestjs/swagger";


export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
  @ApiProperty({ example: "track name", description: "neme current track" })
  @Prop()
  name: string;

  @ApiProperty({ example: "AC-DC", description: "artist" })
  @Prop()
  artist: string;

  @ApiProperty({ example: "maryCrismas.mp3", description: "file with track" })
  @Prop()
  text: string;

  @ApiProperty({ example: "1", description: "count listens" })
  @Prop()
  listens:number;

  @ApiProperty({ example: "img.png", description: "image" })
  @Prop()
  picture: string;

  @ApiProperty({ example: "bla.mp3", description: "audio" })
  @Prop()
  audio: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]})
  comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
