import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const MyFavorites = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`http://localhost:5000/favorites?email=${user.email}`)
                .then((res) => setFavorites(res.data))
                .catch((err) => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [user]);

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:5000/favorites/${id}`)
            .then(() =>
                setFavorites(favorites.filter((fav) => fav._id !== id))
            )
            .catch((err) => console.error(err));
    };

    if (loading) return <p className="text-center py-10">Loading...</p>;

    if (!favorites.length)
        return <p className="text-center py-10">No favorites found.</p>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-green-700 mb-6">
                My Favorite Reviews
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {favorites.map((fav) => (
                    <div
                        key={fav._id}
                        className="bg-white rounded-2xl shadow p-4 flex flex-col"
                    >
                        <img
                            src={fav.review.photo}
                            alt={fav.review.foodName}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-semibold text-green-600">
                            {fav.review.foodName}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                            {fav.review.restaurantName} — {fav.review.restaurantLocation}
                        </p>
                        <p className="text-gray-700 mt-2 text-sm">
                            ⭐ {fav.review.rating} by {fav.review.reviewerName}
                        </p>
                        <button
                            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                            onClick={() => handleDelete(fav._id)}
                        >
                            Remove Favorite
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyFavorites;

