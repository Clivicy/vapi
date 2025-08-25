import mongoose, { Schema, Document } from 'mongoose';

export interface ITool extends Document {
  name: string;
  description?: string;
  config?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const ToolSchema = new Schema<ITool>(
  {
    name: { type: String, required: true },
    description: { type: String },
    config: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.model<ITool>('Tool', ToolSchema);
