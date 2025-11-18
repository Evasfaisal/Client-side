import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ReviewCard from "../components/ReviewCard";
import { toast } from "react-hot-toast";
import { getFavoriteReviews, clearFavorites } from "../api/localFavorites";

const MyFavorites = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user?.email) {
            setFavorites([]);
            setLoading(false);
            return;
        }
        try {
            const list = getFavoriteReviews(user.email) || [];
            const normalized = list.map((r) => ({ _id: r._id, review: r }));
            setFavorites(normalized);
        } catch (e) {
            console.error("Failed to load favorites", e);
            setError("Failed to load favorites");
            toast.error("Failed to load favorites");
        } finally {
            setLoading(false);
        }
    }, [user?.email]);

    const updateFavoriteOptimistically = (reviewId) => {
        setFavorites(prev => prev.filter(f => f.review._id !== reviewId));
    };

    if (!user) return <div className="text-center py-20">Please login to see your favorites.</div>;
    if (loading) return (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600"></div>
        </div>
    );
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
    if (!favorites.length) return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">No favorites yet</h2>
            <p className="text-gray-500">Start adding your favorite food reviews!</p>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-6 mt-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-green-700">My Favorites</h1>
                <button
                    onClick={() => {
                        if (!user?.email) return
                        clearFavorites(user.email)
                        setFavorites([])
                        toast.success("All favorites cleared")
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                    Clear All
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {favorites.map(fav => (
                    <ReviewCard
                        key={fav._id}
                        review={fav.review}
                        initialFavorite={true}
                        updateFavoriteOptimistically={updateFavoriteOptimistically}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyFavorites;