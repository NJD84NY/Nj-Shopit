import mongoose from 'mongoose';

const connectDB = async () => {
  let DB_URI = '';

  if (process.env.NODE_ENV === 'DEVELOPMENT') DB_URI = process.env.DB_LOCAL_URI;
  if (process.env.NODE_ENV === 'PRODUCTION') DB_URI = process.env.DB_URI;

  const connect = await mongoose.connect(DB_URI);
  console.log(`MongoDB Connected: ${connect.connection.host}`);
};

export default connectDB;
