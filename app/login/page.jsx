"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) router.push("/dashboard");
    else setError("Invalid email or password");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-300 to-purlpe-100">
      <form onSubmit={handleSubmit} className="bg-purple-400 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input type="email" placeholder="Email" className="w-full p-3 mb-4 border rounded-lg outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" className="w-full p-3 mb-4 border rounded-lg outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">Login</button>
      </form>
    </div>
  );
}
