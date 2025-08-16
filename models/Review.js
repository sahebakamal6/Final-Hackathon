import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hijabId: { type: Number, required: true }, 
  rating: { type: Number, required: true }, 
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);
export default Review;
