import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MongoURL);
        console.log("DB Connected!!");
    }catch(err){
        console.error("Error while DB connection!!", err);
        process.exit(1)
    }
}
export default connectDB;