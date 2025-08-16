"use client";
import { useState } from "react";

export default function HijabDetailClient({ hijabId }) {
  const hijab = {
    id: hijabId,
    name: `Hijab ${hijabId}`,
    description: `This is a beautiful and elegant hijab number ${hijabId}. Perfect for all occasions.`,
    image: `/hijabs/hijab${hijabId}.jpg`,
    rating: 4,
  };

  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingComment, setEditingComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !comment) return alert("Please fill in both fields");

    const newReview = {
      id: Date.now(),
      username,
      comment,
      createdAt: new Date().toISOString(),
    };

    setReviews([newReview, ...reviews]);
    setUsername("");
    setComment("");
  };

  const handleEdit = (review) => {
    setEditingId(review.id);
    setEditingComment(review.comment);
  };

  const handleSaveEdit = (id) => {
    setReviews(
      reviews.map((r) =>
        r.id === id ? { ...r, comment: editingComment } : r
      )
    );
    setEditingId(null);
    setEditingComment("");
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 flex flex-col items-center p-6">
      <div className="bg-purple-300 shadow-lg rounded-xl p-6 max-w-lg w-full">
        <img
          src={hijab.image}
          alt={hijab.name}
          className="w-full h-72 object-cover rounded-lg"
        />
        <h1 className="mt-4 text-2xl font-bold">{hijab.name}</h1>
        <p className="mt-2 text-gray-700">{hijab.description}</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <input
            type="text"
            placeholder="Your Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 rounded border focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Your Review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="p-2 rounded border focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button type="submit" className="bg-transparent border-2 border-purple-600 text-purple-600 p-2 rounded cursor-pointer hover:bg-purple-500 hover:text-white transition">
            Submit Review
          </button>
        </form>


        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Reviews</h2>
          {reviews.length === 0 && <p>No reviews yet.</p>}
          {reviews.map((r) => (
            <div key={r.id} className="bg-purple-200 p-3 rounded mb-2">
              <p className="font-semibold">{r.username}</p>

              {editingId === r.id ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    value={editingComment}
                    onChange={(e) => setEditingComment(e.target.value)}
                    className="p-2 rounded border"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveEdit(r.id)}
                      className="bg-transparent border-2 border-green-500 text-green-600 p-1 rounded cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-transparent border-2 border-red-500 text-red-600 p-1 rounded cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p>{r.comment}</p>
              )}

              <p className="text-xs text-gray-600">
                {new Date(r.createdAt).toLocaleString()}
              </p>
              {editingId !== r.id && (
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => handleEdit(r)}
                    className="bg-transparent border-2 border-yellow-500 text-yellow-600 p-1 rounded cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="bg-transparent border-2 border-red-500 text-red-600 p-1 rounded cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
