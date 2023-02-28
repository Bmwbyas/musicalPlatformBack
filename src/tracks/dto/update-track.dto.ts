import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export  class UpdateTrackDto{

  @ApiProperty({example:'jingle bels', description:'track name'})
  @IsString({message:'value string'})
  @Length(1,100, {message:'name min 1 symbol max 100 symbol'})
  readonly name:string

  @ApiProperty({example:'ABBA', description:'artist name'})
  @IsString({message:'value string'})
  @Length(1,100, {message:'name min 1 symbol max 100 symbol'})
  readonly artist:string

  @ApiProperty({example:'this track about love', description:'track description'})
  @IsString({message:'value string'})
  @Length(0,300, {message:'name min 0 symbol max 300 symbol'})
  readonly text:string

}
