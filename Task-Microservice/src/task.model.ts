import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    done: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>('Task', TaskSchema);