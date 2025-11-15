import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const EditReview = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        foodName: "",
        foodImage: "",
        restaurantName: "",
        location: "",
        rating: 0,
        reviewText: "",
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

  
    useEffect(() => {
        const fetchReview = async () => {
            try {
                const res = await axios.get(`/api/reviews/${id}`);
                const data = res.data;

         
                setForm({
                    foodName: data.foodName || "",
                    foodImage: data.foodImage || "",
                    restaurantName: data.restaurantName || "",
                    location: data.location || "",
                    rating: data.rating || 0,
                    reviewText: data.reviewText || "",
                });
            } catch (err) {
                toast.error("Failed to load review");
                navigate("/my-reviews");
            } finally {
                setLoading(false);
            }
        };

        fetchReview();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("You must be logged in");
            return;
        }

      
        if (!form.foodName || !form.foodImage || !form.restaurantName || !form.location || !form.reviewText || form.rating < 1) {
            toast.error("Please fill all fields and give a rating");
            return;
        }

        const payload = {
            ...form,
            userEmail: user.email,
            userName: user.displayName || "Anonymous",
            userPhoto: user.photoURL || "",
        };

        try {
            setSubmitting(true);
            await axios.put(`/api/reviews/${id}`, payload);
            toast.success("Review updated successfully!");
            navigate("/my-reviews");
        } catch (err) {
            console.error("Update error:", err);
            toast.error(err.response?.data?.message || "Failed to update review");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Edit Review</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Food Name</label>
                    <input
                        name="foodName"
                        type="text"
                        value={form.foodName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Food Image URL</label>
                    <input
                        name="foodImage"
                        type="url"
                        value={form.foodImage}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
                    <input
                        name="restaurantName"
                        type="text"
                        value={form.restaurantName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                        name="location"
                        type="text"
                        value={form.location}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                    <input
                        name="rating"
                        type="number"
                        min="1"
                        max="5"
                        value={form.rating}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                    <textarea
                        name="reviewText"
                        rows="5"
                        value={form.reviewText}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        required
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {submitting ? "Updating..." : "Update Review"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/my-reviews")}
                        className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditReview;