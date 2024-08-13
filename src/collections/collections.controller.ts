import { Controller, Get, Post, Patch, Delete, Param, Body, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CollectionsService } from './collections.service';
import { Collection } from 'src/schemas/collections.schema';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  async getAllCollections(): Promise<Collection[]> {
    return this.collectionsService.getAllCollections();
  }

  @Get(':id')
  async getCollection(@Param('id') id: string): Promise<Collection> {
    return this.collectionsService.getCollectionById(id);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async createCollection(
    @Body('name') name: string,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<Collection> {
    return this.collectionsService.createCollection(name, files);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files'))
  async updateCollection(
    @Param('id') id: string,
    @Body('name') name: string,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<Collection> {
    return this.collectionsService.updateCollection(id, name, files);
  }

  @Delete(':id')
  async deleteCollection(@Param('id') id: string) {
    return this.collectionsService.deleteCollection(id);
  }
}
