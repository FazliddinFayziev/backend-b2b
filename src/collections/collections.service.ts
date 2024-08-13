import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Collection } from 'src/schemas/collections.schema';

@Injectable()
export class CollectionsService {
  constructor(@InjectModel(Collection.name) private readonly collectionModel: Model<Collection>) {}

  async getAllCollections(): Promise<any[]> {
    const collections = await this.collectionModel.find({}, 'name files').exec();

    return collections.map(collection => ({
      ...collection.toObject(),
      files: collection.files.map(file => ({
        id: file.id,
        name: file.name,
        time: file.time,
      })),
    }));
  }

  async getCollectionById(id: string): Promise<any> {
    return this.collectionModel.findById(id, 'name files').exec();
  }

  async createCollection(name: string, files: Express.Multer.File[]): Promise<Collection> {
    const fileData = files.map(file => ({
      id: new Types.ObjectId(),
      name: file.originalname,
      time: new Date().toISOString(),
      data: file.buffer,
    }));

    const newCollection = new this.collectionModel({ name, files: fileData });
    return newCollection.save();
  }

  async updateCollection(id: string, name: string, files: Express.Multer.File[]): Promise<Collection> {
    const fileData = files.map(file => ({
      id: new Types.ObjectId(),
      name: file.originalname,
      time: new Date().toISOString(),
      data: file.buffer,
    }));

    return this.collectionModel.findByIdAndUpdate(id, { name, files: fileData }, { new: true }).exec();
  }

  async deleteCollection(id: string): Promise<Collection> {
    return this.collectionModel.findByIdAndDelete(id).exec();
  }
}
