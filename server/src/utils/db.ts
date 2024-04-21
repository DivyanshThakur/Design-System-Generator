import mongoose from 'mongoose';
import dbConfig from '../config/db.config';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(dbConfig.MONGO_URI);

        console.log('MongoDB Connected : ', conn.connection.host);
    } catch (error) {
        console.error('Error: ', error.message);
    }
};

export default connectDB;
