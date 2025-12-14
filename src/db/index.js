import mongoose from "mongoose";
import { DBNAME } from "../constants.js";

const connectDB = async ()=>{
   try {
     const connestDetels = await mongoose.connect(`${process.env.MONGODB_URI}/${DBNAME}`)
     console.log(`=========>||Mongo_DB connecet succesfully || at port ${connestDetels.connection.host}||`);
   } catch (error) {
    console.log("mongoDB failed to connect");
    process.exit(1);
   }
}
export default connectDB;