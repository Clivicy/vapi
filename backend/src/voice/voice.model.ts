import mongoose, { Schema, Document } from 'mongoose';

export interface IVoice extends Document {
  name: string;
  url: string;
  type: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const VoiceSchema = new Schema<IVoice>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.model<IVoice>('Voice', VoiceSchema);
