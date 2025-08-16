import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const hijabId = url.searchParams.get("hijabId");
    if (!hijabId) return new Response(JSON.stringify([]), { status: 200 });

    await connectDB();
    const reviews = await Review.find({ hijabId }).sort({ createdAt: -1 });
    return new Response(JSON.stringify(reviews), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to fetch reviews" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { hijabId, username, comment } = await req.json();
    if (!hijabId || !username || !comment) {
      return new Response(JSON.stringify({ message: "Missing fields" }), { status: 400 });
    }

    await connectDB();
    const newReview = await Review.create({ hijabId, username, comment });
    return new Response(JSON.stringify(newReview), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to submit review" }), { status: 500 });
  }
}
