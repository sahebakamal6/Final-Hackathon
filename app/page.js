import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
      <h1 className="text-4xl font-bold mb-6">Welcome to Hijab Website</h1>
      <img src="/hijablogo.png" className="w-24 h-24 mb-4" alt="Hijab Logo" />
      <p className="text-lg mb-8">Explore our beautiful collection of hijabs.</p>
      

      <div className="flex gap-4">
        <Link href="/signup" className="bg-white text-purple-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100">Sign Up</Link>
        <Link href="/login" className="bg-white text-purple-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100">Login</Link>
      </div>
    </div>
  );
}
