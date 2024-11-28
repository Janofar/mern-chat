import mongoose, { Schema } from "mongoose";

export interface IMessage extends Document {
    _id? : mongoose.Types.ObjectId,
    sender: mongoose.Types.ObjectId;
    content: string;
    chat: mongoose.Types.ObjectId;
    readBy: mongoose.Types.ObjectId[];
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
  