import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { serialize } from "cookie";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) return new Response(JSON.stringify({ error: "Invalid email" }), { status: 400 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return new Response(JSON.stringify({ error: "Invalid password" }), { status: 400 });

    const token = signToken(user);

    return new Response(JSON.stringify({ message: "Login success" }), {
      status: 200,
      headers: {
        "Set-Cookie": serialize("token", token, {
          path: "/",
          httpOnly: true,
          maxAge: 60 * 60,
        }),
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
