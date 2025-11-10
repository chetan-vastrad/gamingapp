import mongoose from "mongoose";

const connectToDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB is Connnected ! ");
    } catch (error) {
        console.log("DB not conneted !");
    }
}
export default connectToDb;