import mongoose from 'mongoose';

dotenv.config(); 
const uri = process.env.MONGODB_URI;


await mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB using Mongoose');
});

export default db;