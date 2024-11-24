import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';

@Schema()
export class RepeatWords {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Word', required: true })
  wordId: Types.ObjectId;
}

export const RepeatWordsShema = SchemaFactory.createForClass(RepeatWords);
