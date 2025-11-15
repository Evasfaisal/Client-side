
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const MyFavorites = () => {
    const { user, loading: authLoading } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [fetching, setFetching] = useState(true);

  
    const bdTime = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short"
    });

    useEffect(() => {
        if (!user?.email) return;

        const fetchFavorites = async () => {
            try {
                setFetching(true);
                const res = await axios.get(`/api/favorites?email=${user.email}`);
                console.log("API Response from /api/favorites:", res.data); 
                setFavorites(res.data);
            } catch (err) {
                console.error("Error fetching favorites:", err);
            } finally {
                setFetching(false);
            }
        };

        fetchFavorites();
    }, [user]);

  

    return (
        <div className="max-w-6xl mx-auto p-6 mt-10">
         
            <div className="bg-gradient-to-r from-green-50 to-white p-5 rounded-xl shadow-sm mb-8 border border-green-200">
                <div className="flex flex-col sm:flex-row justify-between items-center text-gray-700">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">Current time:</span>
                        <span className="font-mono text-green-700">{bdTime}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <span className="text-lg font-bold text-green-700">BD</span>
                    </div>
                </div>
            </div>

            <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">My Favorite Foods</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {favorites.map((fav) => {
                    console.log("Favorite item:", fav); 
                    console.log("Review ID:", fav.review?._id); 
                    const review = fav.review;
                    if (!review) return null;

                    return (
                        <div key={fav._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
                            <img
                                src={review.foodImage || "https://i.ibb.co/0j3PQZb/banner1.jpg"}
                                alt={review.foodName}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5">
                                <h2 className="text-xl font-bold text-green-700">{review.foodName}</h2>
                                <p className="text-gray-600 mt-1">{review.restaurantName}</p>
                                <p className="text-sm text-gray-500 mt-1">{review.location}</p>
                                <div className="flex items-center justify-between mt-3">
                                    <span className="text-yellow-500 font-bold text-lg">
                                        {review.rating}/5
                                    </span>
                                    <a
                                        href={`/reviewdetails/${review._id}`}
                                        className="text-green-600 hover:underline text-sm font-medium"
                                    >
                                        View Details
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyFavorites;