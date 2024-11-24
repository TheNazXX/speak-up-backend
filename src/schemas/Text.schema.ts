import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Text {
  @Prop({ required: true, default: '' })
  name: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  createAt: Date;

  @Prop({ required: true })
  updateAt: Date;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Word' }] })
  words: MongooseSchema.Types.ObjectId[]; // массив ID текстов
}

export const TextSchema = SchemaFactory.createForClass(Text);
