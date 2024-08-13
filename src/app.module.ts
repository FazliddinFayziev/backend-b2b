import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionsModule } from './collections/collections.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { CollectionsController } from './collections/collections.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    MongooseModule.forRoot(process.env.MONGO_URI),
    CollectionsModule, 
    AuthorizationModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

