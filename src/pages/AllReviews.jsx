import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewCard from "../components/ReviewCard";
import { useAuth } from "../context/AuthContext";

const AllReviews = () => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");


    const bdTime = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZoneName: "short"
    });

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const res = await axios.get("/api/reviews", {
                    params: { search } 
                });
                setReviews(res.data);
            } catch (err) {
                console.error(err);
                setReviews([]);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [search]);

    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <div className="max-w-7xl mx-auto p-4 mt-10 min-h-screen">

      
            <div className="bg-gradient-to-r from-green-50 to-white p-5 rounded-xl shadow-sm mb-8 border border-green-200">
                <div className="flex flex-col sm:flex-row justify-between items-center text-gray-700">
                    <div className="flex items-center gap-2 text-sm sm:text-base">
                        <span className="font-semibold">Current time:</span>
                        <span className="font-mono text-green-700">{bdTime}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0 text-lg">
                        <span className="font-bold text-green-700">BD</span>
                    </div>
                </div>
            </div>

            <h2 className="text-4xl font-bold text-green-700 mb-8 text-center">
                All Reviews (Public)
            </h2>

        
            <form onSubmit={handleSearch} className="mb-10 max-w-2xl mx-auto">
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Search by food name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-600 shadow-sm text-base"
                    />
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-7 py-3 rounded-xl hover:bg-green-700 transition font-medium whitespace-nowrap"
                    >
                        Search
                    </button>
                </div>
            </form>

       
            {loading && (
                <div className="flex justify-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600"></div>
                </div>
            )}

        
            {!loading && reviews.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-xl text-gray-500">No reviews found.</p>
                </div>
            )}

            {!loading && reviews.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <ReviewCard key={review._id} review={review} user={user} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllReviews;