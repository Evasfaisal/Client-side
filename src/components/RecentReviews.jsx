import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "./ReviewCard";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { getFavoriteIds } from "../api/localFavorites";

const RecentReviews = () => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favoriteIds, setFavoriteIds] = useState([]);

    useEffect(() => {
        const fetchRecentReviews = async () => {
            try {
                setLoading(true);
                console.log("Fetching recent reviews from: /api/reviews/recent");
                const res = await axios.get("/api/reviews/recent");
                console.log("Recent reviews data:", res.data);
                setReviews(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Recent Reviews API Error:", err.response || err);
                toast.error("Failed to load recent reviews");
                setReviews([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentReviews();
    }, []);

    useEffect(() => {
        setFavoriteIds(getFavoriteIds(user?.email));
    }, [user]);


    if (loading) {
        return (
            <section className="max-w-6xl mx-auto py-16 px-4 bg-gray-50">
                <h2 className="text-3xl font-bold text-green-700 text-center mb-10">
                    Recent Reviews
                </h2>
                <div className="flex justify-center py-10">
                    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </section>
        );
    }


    if (!reviews.length) {
        return (
            <section className="max-w-6xl mx-auto py-16 px-4 bg-gray-50">
                <h2 className="text-3xl font-bold text-green-700 text-center mb-10">
                    Recent Reviews
                </h2>
                <p className="text-center text-gray-500 py-8 text-lg">
                    No recent reviews yet. Be the first to share!
                </p>
                <div className="text-center">
                    <Link
                        to="/add-review"
                        className="inline-block bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition font-medium"
                    >
                        Add Your Review
                    </Link>
                </div>
            </section>
        );
    }


    return (
        <section className="max-w-6xl mx-auto py-16 px-4 bg-gray-50">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-green-700">Recent Reviews</h2>
                <Link
                    to="/allreviews"
                    className="text-green-600 hover:underline font-medium text-lg"
                >
                    View All →
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {reviews.map((review) => (
                    <ReviewCard
                        key={review._id}
                        review={review}
                        user={user}
                        initialFavorite={favoriteIds.includes(review._id)}
                    />
                ))}
            </div>
        </section>
    );
};

export default RecentReviews;