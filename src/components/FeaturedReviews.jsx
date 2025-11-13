
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "./ReviewCard";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const FeaturedReviews = () => {
    const { user } = useAuth(); 
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("/api/reviews?limit=6&sort=rating_desc")
            .then((res) => {
                if (res.data && Array.isArray(res.data.reviews)) setReviews(res.data.reviews);
                else if (Array.isArray(res.data)) setReviews(res.data);
                else setReviews([]);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center py-10">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!reviews.length) return <p className="text-center py-10 text-gray-500">No reviews found.</p>;

    return (
        <section className="max-w-6xl mx-auto py-16 px-4">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-green-700">🌟 Featured Reviews</h2>
                <Link to="/allreviews" className="text-green-600 underline">Show All</Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {reviews.map((r) => (
                    <ReviewCard key={r._id} review={r} user={user} />
                ))}
            </div>
        </section>
    );
};

export default FeaturedReviews;
