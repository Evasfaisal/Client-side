
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-hot-toast";

const MyReviews = () => {
    const { user, loading: authLoading } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        axios
            .get(`/api/reviews?email=${user.email}&sort=date_desc`)
            .then((res) => {
               
                if (res.data && Array.isArray(res.data.reviews)) {
                    setReviews(res.data.reviews);
                } else if (Array.isArray(res.data)) {
                    setReviews(res.data);
                } else {
                    setReviews([]);
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [user]);

    const handleDelete = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this review?");
        if (!confirmed) return;

        axios
            .delete(`/api/reviews/${id}`)
            .then(() => {
                toast.success("Review deleted successfully!");
                setReviews(reviews.filter((r) => r._id !== id));
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to delete review.");
            });
    };

    if (authLoading || loading) return <p className="text-center py-10">Loading...</p>;

    if (!reviews.length)
        return <p className="text-center py-10 text-gray-500">You haven't added any reviews yet.</p>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-green-700 mb-4">My Reviews</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead className="bg-green-50">
                        <tr>
                            <th className="px-4 py-2">Food Image</th>
                            <th className="px-4 py-2">Food Name</th>
                            <th className="px-4 py-2">Restaurant</th>
                            <th className="px-4 py-2">Posted Date</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((r) => (
                            <tr key={r._id} className="border-t">
                                <td className="px-4 py-2">
                                    <img src={r.image} alt={r.foodName} className="w-16 h-16 object-cover rounded" />
                                </td>
                                <td className="px-4 py-2">{r.foodName}</td>
                                <td className="px-4 py-2">{r.restaurantName}</td>
                                <td className="px-4 py-2">{new Date(r.date).toLocaleDateString()}</td>
                                <td className="px-4 py-2 flex gap-2">
                                    <button
                                        onClick={() => handleDelete(r._id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                    <a
                                        href={`/edit-review/${r._id}`}
                                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Edit
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyReviews;
