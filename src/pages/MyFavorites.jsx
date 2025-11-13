
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import ReviewCard from "../components/ReviewCard";

const MyFavorites = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFavorites = async () => {
        if (!user?.email) return;
        setLoading(true);
        try {
            const res = await axios.get(`/api/favorites?email=${user.email}`);

         
            setFavorites(res.data
                .filter(f => f.review)
                .map(f => f.review)
            );
        } catch (err) {
            console.error("Error fetching favorites:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFavorite = (reviewId) => {
     
        setFavorites(prevFavorites =>
            prevFavorites.filter(review => review._id !== reviewId)
        );
      
    };

    useEffect(() => {
        if (user) {
            fetchFavorites();
        }
    }, [user]);

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (!favorites.length) return <p className="text-center py-10">No favorites found.</p>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-green-700 mb-6"> My Favorite Reviews</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {favorites.map(review => (
                    review && <ReviewCard
                        key={review._id}
                        review={review}
                        user={user}
                        onFavoriteRemoved={handleRemoveFavorite}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyFavorites;