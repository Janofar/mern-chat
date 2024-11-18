import mongoose, { Schema } from "mongoose";
import { MessageDTO } from "./Message";
import { UserDTO } from "./User";

export interface IChat extends Document {
  name?: string;
  isGroupChat: boolean;
  users: mongoose.Types.ObjectId[];
  latestMessage?: mongoose.Types.ObjectId;
  groupAdmins?: mongoose.Types.ObjectId[];
}

export interface ChatDTO {
  _id?: mongoose.Types.ObjectId,
  name?: string;
  isGroupChat: boolean;
  users: UserDTO[];
  currentUser?: mongoose.Types.ObjectId,
  receiver?: UserDTO,
  otherParticipants?: UserDTO[];
  latestMessage?: string;
  groupAdmins?: UserDTO[];
  messages?: MessageDTO[];
  unreadCount?: BigInteger;
  timestamp?: string;
}

const ChatSchema: Schema = new Schema(
  {
    name: { type: String },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    groupAdmins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export default mongoose.model<IChat>('Chat', ChatSchema);
