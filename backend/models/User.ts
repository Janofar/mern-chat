import mongoose, { Document, Schema } from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isOnline: boolean;
  avatar?: string;
  lastSeen?: Date;
  avatarUrl?: string;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isOnline: { type: Boolean, default: false },
    avatar: { type: String },
    lastSeen: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

UserSchema.virtual('avatarUrl').get(function (this: IUser) {
  if (!this.avatar) return null;

  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 5000;
  const protocol = process.env.PROTOCOL || 'http';

  return `${protocol}://${host}:${port}/${this.avatar.replace(/\\/g, '/')}`;
});


UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });
export default mongoose.model<IUser>('User', UserSchema);
