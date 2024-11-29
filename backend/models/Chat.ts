import mongoose, { Schema } from "mongoose";

export interface IChat extends Document {
  name?: string;
  isGroupChat: boolean;
  users: mongoose.Types.ObjectId[];
  latestMessage?: mongoose.Types.ObjectId;
  groupAdmins?: mongoose.Types.ObjectId[];
  groupAvatar?: string;
  groupAvatarUrl? : string;
}

const ChatSchema: Schema = new Schema(
  {
    name: { type: String },
    isGroupChat: { type: Boolean, default: false },
    groupAvatar: { type: String },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    groupAdmins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

ChatSchema.virtual('groupAvatarUrl').get(function (this: IChat) {
  if (!this.groupAvatar) return null;

  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 5000;
  const protocol = process.env.PROTOCOL || 'http';

  return `${protocol}://${host}:${port}/${this.groupAvatar.replace(/\\/g, '/')}`;
});


ChatSchema.set('toJSON', { virtuals: true });
ChatSchema.set('toObject', { virtuals: true });

export default mongoose.model<IChat>('Chat', ChatSchema);
