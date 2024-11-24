import mongoose from 'mongoose';

export const textWordSchema = new mongoose.Schema({
  wordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Word', require: true },
  TextId: { type: mongoose.Schema.Types.ObjectId, ref: 'Text', require: true },
});

export const TextWord = mongoose.model('TextWord', textWordSchema);
