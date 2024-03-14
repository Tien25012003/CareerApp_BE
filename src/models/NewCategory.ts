import mongoose from "mongoose";
const NewCategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    listNews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NewsModel",
      },
    ],
  },
  { collection: "NewCategory", versionKey: false }
);
const NewCategoryModel = mongoose.model("NewCategoryModel", NewCategorySchema);
export { NewCategoryModel };
