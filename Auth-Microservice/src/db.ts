
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/myapp';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err:any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;