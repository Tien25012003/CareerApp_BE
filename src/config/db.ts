import mongoose from "mongoose";

const URI = process.env.DB_LINK;
const connectToDb = async () => {
  if (URI)
    try {
      await mongoose.connect(URI, { dbName: "Career_App" });
      console.log("db connected...");
    } catch (e) {
      console.log(e);
    }
};

export { connectToDb };
