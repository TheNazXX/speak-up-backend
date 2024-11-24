import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Word {
  @Prop({ unique: true, required: true })
  en: string;

  @Prop({ required: true })
  createAt: Date;

  @Prop({ required: true })
  updateAt: Date;

  @Prop({ required: true })
  translate: string[];
}

export const WordSchema = SchemaFactory.createForClass(Word);
