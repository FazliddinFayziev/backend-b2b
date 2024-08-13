import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionsService } from './collections.service';
import { Collection, CollectionSchema } from 'src/schemas/collections.schema';
import { CollectionsController } from './collections.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Collection.name, schema: CollectionSchema }])],
  controllers: [CollectionsController],
  providers: [CollectionsService]
})
export class CollectionsModule {}
