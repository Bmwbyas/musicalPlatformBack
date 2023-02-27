import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://askerko50:64vzJmdTGUSyVKiL@cluster0.byzwxqv.mongodb.net/?retryWrites=true&w=majority'),
    ConfigModule.forRoot({
      envFilePath:`.${process.env.NODE_ENV}.env`
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
