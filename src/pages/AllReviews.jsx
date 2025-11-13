
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "../components/ReviewCard";

const AllReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get("/api/reviews?sort=date_desc");
                if (Array.isArray(res.data)) {
                    setReviews(res.data);
                } else if (Array.isArray(res.data.reviews)) {
                    setReviews(res.data.reviews);
                } else {
                    setReviews([]);
                }
            } catch (err) {
                console.error(err);
                setError("Failed to fetch reviews. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (loading)
        return (
            <div className="text-center py-20 text-gray-500 text-lg">
                Loading reviews...
            </div>
        );

    if (error)
        return (
            <div className="text-center py-20 text-red-500 text-lg">
                {error}
            </div>
        );

    if (!reviews.length)
        return (
            <div className="text-center py-20 text-gray-500 text-lg">
                No reviews found.
            </div>
        );

    return (
        <section className="max-w-6xl mx-auto py-16 px-4">
            <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
                All Reviews
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {reviews.map((review) => (
                    <ReviewCard key={review._id || review.id} review={review} />
                ))}
            </div>
        </section>
    );
};

export default AllReviews;
