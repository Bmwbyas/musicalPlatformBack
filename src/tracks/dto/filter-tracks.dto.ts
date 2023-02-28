import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Length } from "class-validator";

export  class FindTracksDto{
  @ApiProperty({example:'abw', description:'find track include name this value'})
  @IsString({message:'value string'})
  @Length(1,100, {message:'name min 1 symbol max 100 symbol'})
  readonly name:string

  @ApiProperty({example:'10', description:'listens'})
  @IsInt({message:'listnes should be integer b'})
  readonly listens:1|-1
}
