import mongoose, { Schema } from "mongoose";
import { ChatDTO } from "../types/chat";
import { UserDTO } from "../types/user";

export interface IMessage extends Document {
    _id : mongoose.Types.ObjectId,
    sender: UserDTO;
    content: string;
    chat: ChatDTO;
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
  