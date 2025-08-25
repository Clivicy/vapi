import mongoose, { Schema, Document } from 'mongoose';

export interface ITestSuite extends Document {
  name: string;
  description?: string;
  tests: Array<{ name: string; input: any; expected: any }>;
  createdAt: Date;
  updatedAt: Date;
}

const TestSuiteSchema = new Schema<ITestSuite>(
  {
    name: { type: String, required: true },
    description: { type: String },
    tests: [
      {
        name: { type: String, required: true },
        input: { type: Schema.Types.Mixed, required: true },
        expected: { type: Schema.Types.Mixed, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<ITestSuite>('TestSuite', TestSuiteSchema);
