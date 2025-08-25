import mongoose, { Schema, Document } from 'mongoose';

export interface IPhoneNumber extends Document {
  number: string;
  assignedTo?: mongoose.Types.ObjectId;
  status: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const PhoneNumberSchema = new Schema<IPhoneNumber>(
  {
    number: { type: String, required: true, unique: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.model<IPhoneNumber>('PhoneNumber', PhoneNumberSchema);
