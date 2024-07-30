import { Schema, model, Document } from 'mongoose';

interface IComment extends Document {
  date: Date;
  customer: string;
  email: string;
  phone: string;
  comment: string;
  archived: boolean;
}

const commentSchema = new Schema<IComment>({
  date: { type: Date, required: true },
  customer: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  comment: { type: String, required: true },
  archived: { type: Boolean, required: true },
});

const Comment = model<IComment>('Comment', commentSchema);

export default Comment;
