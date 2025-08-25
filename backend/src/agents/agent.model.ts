import mongoose, { Schema, Document } from 'mongoose';

export interface IAgent extends Document {
  name: string;
  sttProvider: string;
  ttsProvider: string;
  llmProvider: string;
  prompt: string;
  createdAt: Date;
  updatedAt: Date;
}

const AgentSchema = new Schema<IAgent>(
  {
    name: { type: String, required: true },
    sttProvider: { type: String, required: true },
    ttsProvider: { type: String, required: true },
    llmProvider: { type: String, required: true },
    prompt: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IAgent>('Agent', AgentSchema);
