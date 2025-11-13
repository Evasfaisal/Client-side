import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ReviewCard = ({ review, user, onFavoriteRemoved }) => {
    const [isFav, setIsFav] = useState(false);
    const [loadingFav, setLoadingFav] = useState(false);

    if (!review || !review._id) {
        return null;
    }

    
    useEffect(() => {
        const checkFavorite = async () => {
            if (!user?.email) return;
            try {
                const res = await axios.get(`/api/favorites?email=${user.email}`);
                const favExists = res.data.some(
                    
                    fav => fav.review?._id === review._id
                );
                setIsFav(favExists);
            } catch (err) {
                console.error("Error checking favorite status:", err);
            }
        };
        checkFavorite();
    }, [user, review._id]);

    const handleFavorite = async () => {
        if (!user?.email) {
            alert("Please login to add favorites!");
            return;
        }

        setLoadingFav(true);

        try {
            if (isFav) {
            
                await axios.delete("/api/favorites/remove", {
                    data: {
                        userEmail: user.email,
                        review: review._id 
                    }
                });
                setIsFav(false);
                if (onFavoriteRemoved) {
                    onFavoriteRemoved(review._id);
                }
            } else {
               
                await axios.post("/api/favorites", {
                    userEmail: user.email,
                    review: review._id, // 
                });
                setIsFav(true);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message;

            if (errorMessage === 'Already in favorites') {
                console.warn("Attempted to re-add an existing favorite. State corrected.");
                setIsFav(true);
            } else {
                console.error("Error updating favorites:", err);
                alert(`Something went wrong! ${errorMessage || err.message}`);
            }
        } finally {
            setLoadingFav(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col h-full relative">
         
            <button
                onClick={handleFavorite}
                disabled={loadingFav}
                className="absolute top-3 right-3 text-2xl text-red-500 hover:scale-110 transition-transform"
                title={isFav ? "Remove from Favorites" : "Add to Favorites"}
            >
                {isFav ? <FaHeart /> : <FaRegHeart />}
            </button>

            <img
                src={review.photo}
                alt={review.foodName}
                className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="flex-grow">
                <h3 className="text-xl font-semibold text-green-600">{review.foodName}</h3>
                <p className="text-gray-500 text-sm mt-1">
                    {review.restaurantName} — {review.restaurantLocation}
                </p>
                {review.reviewText && (
                    <p className="text-gray-600 mt-2 text-sm line-clamp-3">{review.reviewText}</p>
                )}
            </div>
            <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-700">By {review.reviewerName}</div>
                <div className="text-sm font-medium bg-green-100 text-green-700 px-2 py-1 rounded">
                    ⭐ {review.rating}
                </div>
            </div>
            <Link
                to={`/reviews/${review._id}`}
                className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-center hover:bg-green-700 transition"
            >
                View Details
            </Link>
        </div>
    );
};

ReviewCard.defaultProps = {
    onFavoriteRemoved: null,
};

export default ReviewCard;