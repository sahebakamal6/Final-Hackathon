import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";

export async function POST(req) {
  try {
    await connectDB();

    const { userId, hijabId, rating, comment } = await req.json();

    if (!userId || !hijabId || !rating) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const newReview = await Review.create({ userId, hijabId, rating, comment });

    return new Response(JSON.stringify({ message: "Review submitted", review: newReview }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
