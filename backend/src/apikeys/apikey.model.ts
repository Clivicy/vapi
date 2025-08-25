import mongoose, { Schema, Document } from 'mongoose';

export interface IAPIKey extends Document {
  key: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  revoked: boolean;
  revokedAt?: Date;
}

const APIKeySchema = new Schema<IAPIKey>(
  {
    key: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    revoked: { type: Boolean, default: false },
    revokedAt: { type: Date },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IAPIKey>('APIKey', APIKeySchema);
