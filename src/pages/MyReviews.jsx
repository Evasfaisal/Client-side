import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const MyFavorites = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchFavorites = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/favorites?email=${user.email}`);
                const data = Array.isArray(res.data) ? res.data : [];
                setFavorites(data);
            } catch (err) {
                toast.error("Failed to load favorites");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [user]);

    const toggleFavorite = async (reviewId, isCurrentlyFav) => {
        if (!user) return toast.error("Please login!");

        try {
            if (isCurrentlyFav) {
                await axios.delete("/api/favorites", {
                    data: { userEmail: user.email, reviewId }
                });
                toast.success("Removed from favorites");
            } else {
                await axios.post("/api/favorites", {
                    userEmail: user.email,
                    reviewId
                });
                toast.success("Added to favorites!");
            }
            setFavorites(prev =>
                prev.map(f =>
                    f.reviewId._id === reviewId
                        ? { ...f, isFav: !isCurrentlyFav }
                        : f
                )
            );
        } catch (err) {
            toast.error("Failed to update favorite");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center py-20">
                <p className="text-lg text-gray-600">Please login to see your favorites.</p>
                <Link to="/login" className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-full">
                    Login Now
                </Link>
            </div>
        );
    }

    if (favorites.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-lg text-gray-600">You haven't added any favorites yet.</p>
                <Link to="/allreviews" className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-full">
                    Explore Reviews
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 mt-10">
            <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
                My Favorite Reviews
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {favorites.map((fav) => {
                    const r = fav.reviewId;
                    if (!r) return null;

                    return (
                        <div
                            key={r._id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
                        >
                            <img
                                src={r.foodImage}
                                alt={r.foodName}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-bold text-lg">{r.foodName}</h3>
                                <p className="text-gray-600 text-sm">
                                    {r.restaurantName} • {r.location}
                                </p>
                                <div className="flex items-center justify-between mt-3">
                                    <span className="text-yellow-500 font-bold">{r.rating}/5</span>
                                    <button
                                        onClick={() => toggleFavorite(r._id, true)}
                                        className="text-2xl text-red-500 hover:scale-110 transition"
                                    >
                                        <FaHeart />
                                    </button>
                                </div>
                                <Link
                                    to={`/reviewdetails/${r._id}`}
                                    className="mt-3 block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyFavorites;