import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";
import { ObjectId } from "mongoose";

export  class AddCommentDto{

  @ApiProperty({example:'alex', description:'name person lost comment'})
  @IsString({message:'value string'})
  @Length(1,100,{message:'name min 1 symbol max 300 symbol'})
  readonly username:string

  @ApiProperty({example:'some text comment ', description:'comment text'})
  @IsString({message:'value string'})
  @Length(1,300,{message:'name min 1 symbol max 300 symbol'})
  readonly text:string

  @ApiProperty({example:'this track about love', description:'track description'})
  @IsString({message:'value string'})
  readonly trackId:ObjectId

}
