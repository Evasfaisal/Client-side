import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "../components/ReviewCard";
import { useAuth } from "../context/AuthContext";

const AllReviews = () => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get("/api/reviews?sort=date_desc");
                if (Array.isArray(res.data)) setReviews(res.data);
                else if (Array.isArray(res.data.reviews)) setReviews(res.data.reviews);
                else setReviews([]);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (loading) return <p className="text-center py-20 text-gray-500">Loading reviews...</p>;
    if (!reviews.length) return <p className="text-center py-20 text-gray-500">No reviews found.</p>;

    return (
        <section className="max-w-6xl mx-auto py-16 px-4">
            <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">All Reviews</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {reviews.map(review => (
                    <ReviewCard key={review._id} review={review} user={user} />
                ))}
            </div>
        </section>
    );
};

export default AllReviews;
