import React, { useEffect, useState } from "react";
import api from "../api/axios";
import ReviewCard from "./ReviewCard";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { getFavoriteIds } from "../api/localFavorites";

const FeaturedReviews = () => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [loading, setLoading] = useState(true);

    const updateFavoriteOptimistically = (reviewId, isAdding) => {
        if (isAdding) {
            setFavoriteIds(prevIds => [...prevIds, reviewId]);
        } else {
            setFavoriteIds(prevIds => prevIds.filter(id => id !== reviewId));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const reviewsRes = await api.get("/api/reviews/top");
                setReviews(Array.isArray(reviewsRes.data) ? reviewsRes.data : []);
                const ids = user?.email ? getFavoriteIds(user.email) : [];
                setFavoriteIds(ids);
            } catch (e) {
                console.error(e);
                toast.error("Failed to load data");
                setReviews([]);
                setFavoriteIds([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    if (loading) {
        return (
            <section className="max-w-6xl mx-auto py-16 px-4">
                <h2 className="text-3xl font-bold text-green-700 text-center mb-10">
                    Featured Reviews
                </h2>
                <div className="flex justify-center py-10">
                    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </section>
        );
    }

    if (!reviews.length) {
        return (
            <section className="max-w-6xl mx-auto py-16 px-4">
                <h2 className="text-3xl font-bold text-green-700 text-center mb-10">
                    Featured Reviews
                </h2>
                <p className="text-center text-gray-500 py-10">No reviews yet.</p>
            </section>
        );
    }

    return (
        <section className="max-w-6xl mx-auto py-16 px-4">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-green-700">Featured Reviews</h2>
                <Link to="/allreviews" className="text-green-600 hover:underline font-medium">
                    Show All
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {reviews.map((review) => (
                    <ReviewCard
                        key={review._id}
                        review={review}
                        initialFavorite={favoriteIds.includes(review._id)}
                        updateFavoriteOptimistically={updateFavoriteOptimistically}
                    />
                ))}
            </div>
        </section>
    );
};

export default FeaturedReviews;