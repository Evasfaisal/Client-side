import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ReviewCard = ({ review, user }) => {
    const [isFav, setIsFav] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleFavorite = async () => {
        if (!user?.email) {
            alert("Please login to add favorites!");
            return;
        }

        setLoading(true);
        try {
            await axios.post("/api/favorites", {
                userEmail: user.email,
                reviewId: review._id,
            });
            setIsFav(true);
        } catch (err) {
            console.error("Error adding to favorites:", err);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col h-full relative">
          
            <button
                onClick={handleFavorite}
                disabled={loading}
                className="absolute top-3 right-3 text-2xl text-red-500 hover:scale-110 transition-transform"
                title={isFav ? "Added to Favorites" : "Add to Favorites"}
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
                <p className="text-gray-600 mt-2 text-sm line-clamp-3">{review.reviewText}</p>
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

export default ReviewCard;
