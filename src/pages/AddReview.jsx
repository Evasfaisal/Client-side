
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddReview = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        foodName: "",
        image: "",
        restaurantName: "",
        location: "",
        rating: 0,
        reviewText: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) return toast.error("You must be logged in");

        const payload = {
            ...form,
            email: user.email,
            date: new Date().toISOString(),
        };

        axios
            .post("/api/reviews", payload)
            .then(() => {
                toast.success("Review added successfully!");
                navigate("/my-reviews");
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to add review");
            });
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-green-700 mb-6">Add Review</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="foodName"
                    placeholder="Food Name"
                    value={form.foodName}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Food Image URL"
                    value={form.image}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="restaurantName"
                    placeholder="Restaurant Name"
                    value={form.restaurantName}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    required
                />
                <input
                    type="number"
                    name="rating"
                    min="0"
                    max="5"
                    placeholder="Star Rating"
                    value={form.rating}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    required
                />
                <textarea
                    name="reviewText"
                    placeholder="Review Text"
                    value={form.reviewText}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default AddReview;
