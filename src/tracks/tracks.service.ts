import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Track, TrackDocument } from "./schema/track.schema";
import { Model, ObjectId } from "mongoose";
import { FindTracksDto } from "./dto/filter-tracks.dto";
import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import { Comment,CommentDocument } from "./schema/comment-schema";
import { AddCommentDto } from "./dto/add-comment.dto";
import { FileService, FileType } from "../file/file.service";

@Injectable()
export class TracksService {
  constructor(@InjectModel(Track.name) private tracksModel: Model<TrackDocument>,
              @InjectModel(Comment.name) private commentsModel: Model<CommentDocument>,
              private fileService: FileService) {}

  async getFilteredTracks(query:FindTracksDto): Promise<Track[]> {
    const filter: any = {};
    if (query.name) {
      filter.name={$regex:query.name}
    }
    if (query.listens){
      return this.tracksModel.find(filter).sort({listens:query.listens}).exec()
    }
    return this.tracksModel.find(filter).exec()
  }

  async getTracksById(id:ObjectId):Promise<Track>{
    return this.tracksModel.findOne( {_id:id} ).populate('comments')
  }

  async createTrack(track:CreateTrackDto, audio:Express.Multer.File, image:Express.Multer.File):Promise<Track>{
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.IMAGE, image);
    const createTrack= await new this.tracksModel({ ...track, listens:0, audio: audioPath, picture: picturePath });
    return createTrack.save();
  }
  async removeTrack(id:ObjectId):Promise<Track>{
    return await this.tracksModel.findByIdAndDelete(id);

  }
  async updateTrack(id: ObjectId, updateTrack: UpdateTrackDto):Promise<Track> {
     await this.tracksModel.findByIdAndUpdate(id , updateTrack,{new:false});
     return this.getTracksById(id)

  }

  async addComment( dto: AddCommentDto):Promise<Comment> {
    const track = await this.tracksModel.findById(dto.trackId);
    const comment:any = await this.commentsModel.create({...dto})
    console.log(dto);
    track.comments.push(comment._id)
    await track.save();
    return comment;
  }


}
