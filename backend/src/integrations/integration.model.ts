import mongoose, { Schema, Document } from 'mongoose';

export interface IIntegration extends Document {
  name: string;
  type: string;
  config?: Record<string, any>;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const IntegrationSchema = new Schema<IIntegration>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    config: { type: Schema.Types.Mixed },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IIntegration>('Integration', IntegrationSchema);
