"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Star } from "lucide-react";

const hijabs = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  name: `Hijab ${i + 1}`,
  image: `/hijabs/hijab${i + 1}.jpg`,
  rating: (i % 5) + 1,
}));


export default function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <nav className="flex justify-between items-center p-4 bg-purple-200 shadow-md">
        <div className="flex items-center">
          <img src="/hijablogo.png" className="w-10 h-10" alt="logo" />
          <span className="ml-2 font-bold text-xl">Hijab Store</span>
        </div>

        <ul className="hidden md:flex space-x-6">
          <li><Link href="/dashboard" className="text-black hover:underline">Dashboard</Link></li>
          <li><Link href="/profile" className="text-black hover:underline">Profile</Link></li>
          <li><Link href="/settings" className="text-black hover:underline">Settings</Link></li>
          <li><Link href="/logout" className="text-black hover:underline">Logout</Link></li>
        </ul>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col space-y-3 p-4">
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/profile">Profile</Link></li>
            <li><Link href="/settings">Settings</Link></li>
            <li><Link href="/logout">Logout</Link></li>
          </ul>
        </div>
      )}

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {hijabs.map((hijab) => (
          <Link
            key={hijab.id}
            href={`/dashboard/hijab/${hijab.id}`}
            className="bg-purple-300 p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={hijab.image}
              alt={hijab.name}
              className="w-full h-48 bg-purple-100 object-cover rounded-lg"
            />
            <h2 className="mt-3 text-lg font-semibold">{hijab.name}</h2>
            <div className="flex mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < hijab.rating ? "text-black fill-black" : "text-black"}
                />
              ))}
            </div>
          </Link>
        ))}
      </div>
      
    </div>
  );
}
