import mongoose, {ConnectOptions} from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function connectDB() {
    try {
      const uri = process.env.MONGODB;
    await mongoose.connect(uri as string, {
      useNewUrlParser: true,
      ignoreUndefined: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    console.log(
      'Connected to Distribution API Database - Initial Connection'
    );
  } catch (err) {
    console.log(
      `Initial Distribution API Database connection error occured -`,
      err
    );
  }
}

export default connectDB;