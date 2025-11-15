import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ReviewDetails = () => {
    const { id } = useParams(); 
    const { user } = useAuth();
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);

  
    const bdTime = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short"
    });

    useEffect(() => {
        const fetchReview = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/reviews/${id}`); 
                setReview(res.data);
            } catch (err) {
                console.error("Error fetching review:", err);
                setReview(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchReview();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600"></div>
            </div>
        );
    }

    if (!review) {
        return (
            <div className="max-w-4xl mx-auto p-6 mt-10 text-center">
                <p className="text-xl text-red-600">Review not found!</p>
                <Link to="/allreviews" className="text-green-600 hover:underline">
                    ← Back to All Reviews
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 mt-10">

          
            <div className="bg-gradient-to-r from-green-50 to-white p-5 rounded-xl shadow-sm mb-8 border border-green-200">
                <div className="flex flex-col sm:flex-row justify-between items-center text-gray-700">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">Current time:</span>
                        <span className="font-mono text-green-700">{bdTime}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <span className="text-lg font-bold text-green-700">BD</span>
                    </div>
                </div>
            </div>

            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                    src={review.photo ||  review.foodImage}
                    alt={review.foodName}
                    className="w-full h-64 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-green-700">{review.foodName}</h1>
                    <p className="text-lg text-gray-600 mt-1">
                        {review.restaurantName} • {review.location}
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                        <span className="text-yellow-500 font-bold text-xl">
                            {review.rating}/5
                        </span>
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <span
                                    key={i}
                                    className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                    <p className="mt-5 text-gray-700 leading-relaxed">{review.reviewText}</p>

                    <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                src={review.userPhoto || "https://i.ibb.co/0j3PQZb/banner1.jpg"}
                                alt={review.userName}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-medium text-gray-800">{review.userName || "Anonymous"}</p>
                                <p className="text-xs text-gray-500">
                                    {new Date(review.postedDate).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    })}
                                </p>
                            </div>
                        </div>

                        {user && user.email === review.userEmail && (
                            <div className="flex gap-2">
                                <Link
                                    to={`/edit-review/${review._id}`}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={async () => {
                                        if (window.confirm("Delete this review?")) {
                                            try {
                                                await axios.delete(`/api/reviews/${review._id}`);
                                                window.location.href = "/my-reviews";
                                            } catch (err) {
                                                alert("Delete failed");
                                            }
                                        }
                                    }}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mt-6">
                        <Link
                            to="/allreviews"
                            className="text-green-600 hover:underline font-medium"
                        >
                            ← Back to All Reviews
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewDetails;