import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface File {
  id: Types.ObjectId;
  name: string;
  time: string;
  data: Buffer;
}

@Schema()
export class Collection extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ id: { type: Types.ObjectId }, name: String, time: String, data: Buffer }], default: [] })
  files: File[];
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
