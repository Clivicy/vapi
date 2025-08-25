import mongoose, { Schema, Document } from 'mongoose';

export interface IMetric extends Document {
  name: string;
  value: number;
  type: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const MetricSchema = new Schema<IMetric>(
  {
    name: { type: String, required: true },
    value: { type: Number, required: true },
    type: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.model<IMetric>('Metric', MetricSchema);
