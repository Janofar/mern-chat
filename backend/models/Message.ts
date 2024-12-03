import mongoose, { Schema } from "mongoose";
import { ChatData, ChatDTO } from "../types/chat";
import { User } from "../types/user";

export interface IMessage extends Document {
    _id : mongoose.Types.ObjectId,
    sender: User;
    content: string;
    chat: ChatData;
    readBy: mongoose.Types.ObjectId[];
    createdAt: Date;
  }

  
  const MessageSchema: Schema = new Schema(
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      content: { type: String, required: true },
      chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
      readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true }
  );
  
  export default mongoose.model<IMessage>('Message', MessageSchema);
  