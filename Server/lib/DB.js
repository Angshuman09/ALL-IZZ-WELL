import mongoose from 'mongoose';

export const db = async ()=>{
    try {
       await mongoose.connect(process.env.MONGO_URI);
       console.log(`mongodb connected successfully`);
    } catch (error) {
        console.log(`error in connecting mongodb: ${error}`);
        process.exit(1);
    }
}