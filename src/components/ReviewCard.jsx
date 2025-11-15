import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-hot-toast";

const ReviewCard = ({ review }) => {
    const { user } = useAuth();
    const [isFav, setIsFav] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user?.email || !review?._id) return;

        let isMounted = true;

        const checkFavorite = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`/api/favorites?email=${user.email}`);
                const favList = res.data || [];
                const alreadyFav = favList.some(f => f.review?._id === review._id || f.review === review._id);

                if (isMounted) setIsFav(alreadyFav);
            } catch (err) {
                console.error("Error checking favorite:", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        checkFavorite();

        return () => { isMounted = false; };
    }, [user, review]);

    const handleToggleFavorite = async () => {
        if (!user?.email) {
            toast.error("Please login to manage favorites!");
            return;
        }

        setLoading(true);
        try {
            if (isFav) {
                await axios.delete("/api/favorites", { data: { userEmail: user.email, review: review._id } });
                toast.success("Removed from favorites");
                setIsFav(false);
            } else {
                await axios.post("/api/favorites", { userEmail: user.email, review: review._id });
                toast.success("Added to favorites!");
                setIsFav(true);
            }
        } catch (err) {
            console.error(`Error ${isFav ? "removing" : "adding"} favorite:`, err);
            toast.error(err.response?.data?.message || `Failed to ${isFav ? "remove" : "add"} favorite.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col h-full relative">
          
            <button
                onClick={handleToggleFavorite}
                disabled={loading}
                className="absolute top-3 right-3 text-2xl text-red-500 transition-all duration-200 disabled:opacity-50"
            >
                {loading ? (
                    <div className="w-6 h-6 border-2 border-t-2 border-red-200 border-t-red-500 rounded-full animate-spin"></div>
                ) : (
                    isFav ? <FaHeart className="hover:scale-110" /> : <FaRegHeart className="hover:scale-110" />
                )}
            </button>

        
            <img
                src={review.photo || review.foodImage}  
                alt={review.foodName}
                className="w-full h-48 object-cover rounded-lg mb-4"
            />

          
            <div className="flex-grow">
                <h3 className="text-xl font-semibold text-green-600">{review.foodName}</h3>
                <p className="text-gray-500 text-sm mt-1">
                    {review.restaurantName} — {review.restaurantLocation || review.location}
                </p>
                <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                    {review.reviewText}
                </p>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-700">By {review.reviewerName || review.userName}</div>
                <div className="text-sm font-medium bg-green-100 text-green-700 px-2 py-1 rounded">
                    Rating: {review.rating}
                </div>
            </div>

            <Link
                to={`/reviewdetails/${review._id}`}  
                className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-center hover:bg-green-700 transition"
            >
                View Details
            </Link>
        </div>
    );
};

export default ReviewCard;