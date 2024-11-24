import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class GlobalInfo {
  @Prop({ required: true, default: new Date() })
  lastRepeatWords: Date;
}

export const GlobalInfoShame = SchemaFactory.createForClass(GlobalInfo);
