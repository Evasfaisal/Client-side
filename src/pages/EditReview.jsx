
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
        image: "",
        restaurantName: "",
        location: "",
        rating: 0,
        reviewText: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`/api/reviews/${id}`)
            .then((res) => {
                if (res.data) {
                    setForm(res.data);
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) return toast.error("You must be logged in");

        axios
            .put(`/api/reviews/${id}`, form)
            .then(() => {
                toast.success("Review updated successfully!");
                navigate("/my-reviews");
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to update review");
            });
    };

    if (loading) return <p className="text-center py-10">Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-green-700 mb-6">Edit Review</h2>
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
                    Update Review
                </button>
            </form>
        </div>
    );
};

export default EditReview;
