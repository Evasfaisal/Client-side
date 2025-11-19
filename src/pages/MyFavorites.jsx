import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ReviewCard from "../components/ReviewCard";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";

const MyFavorites = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            if (!user?.email) {
                if (!cancelled) {
                    setFavorites([]);
                    setLoading(false);
                }
                return;
            }
            try {
                
                let res;
                try {
                    res = await axios.get('/api/favorites/reviews');
                } catch {
                 
                    res = await axios.get('/api/favorites', { params: { mode: 'reviews' } });
                }

                const raw = res?.data;
             
                const arr = Array.isArray(raw) ? raw : [];

             
                const normalized = arr.map(favItem => ({
                    _id: favItem._id,
                    review: favItem.review 
                }));

                if (import.meta.env.DEV) {
                    try {
                        console.log('[MyFavorites] raw favorites response:', raw);
                        console.log('[MyFavorites] normalized favorites:', normalized);
                    } catch { void 0; }
                }

                if (!cancelled) setFavorites(normalized);
            } catch (e) {
                console.error('Failed to load favorites', e);
                const msg = e?.response?.data?.message || e?.message || 'Failed to load favorites';
                if (!cancelled) {
                    setError(msg);
                    toast.error(msg);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        load();
        return () => { cancelled = true; };
    }, [user?.email]);

  

    if (!user) return <div className="text-center py-20">Please login to see your favorites.</div>;
    if (loading) return (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600"></div>
        </div>
    );
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
    if (!favorites.length) return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">No favorites yet</h2>
            <p className="text-gray-500">Start adding your favorite food reviews!</p>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-6 mt-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-green-700">My Favorites</h1>
                <button
                    onClick={async () => {
                        if (!user) return;
    
                        const ids = favorites.map(f => f._id).filter(Boolean);
                        if (ids.length) {
                            const results = await Promise.allSettled(ids.map(id => axios.delete(`/api/favorites/${id}`)));
                            const rejected = results.find(r => r.status === 'rejected');
                            if (rejected) {
                                const err = rejected.reason;
                                const msg = err?.response?.data?.message || err?.message || 'Server sync failed';
                                toast.error(msg);
                            }
                        }
                        setFavorites([]);
                        toast.success("All favorites cleared");
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                    Clear All
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {favorites.map(fav => (
                    <div key={fav._id} className="relative group">
                        {fav.review ? (
                 
                            <ReviewCard
                                review={fav.review}
                                initialFavorite={true}
                            />
                        ) : (
                         
                            <div className="border rounded-lg shadow-lg p-4 h-full flex flex-col justify-between bg-gray-100">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-500 mb-2">Review No Longer Available</h3>
                                    <p className="text-sm text-gray-400">The original review for this item was deleted.</p>
                                </div>
                                <div className="mt-4 text-right">
                                    <span className="text-xs text-gray-400">Favorite ID: {fav._id}</span>
                                </div>
                            </div>
                        )}
                        <button
                            onClick={async () => {
                              
                                const id = fav._id;
                                if (!id || !user) return;
                                try {
                                    await axios.delete(`/api/favorites/${id}`);
                                    setFavorites(prev => prev.filter(f => f._id !== id));
                                    toast.success("Removed");
                                } catch (e) {
                                    const msg = e?.response?.data?.message || e?.message || 'Server sync failed';
                                    toast.error(msg);
                                }
                            }}
                            title="Remove from favorites"
                            className="absolute top-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:scale-110"
                        >
                            <FiTrash2 className="text-red-600 text-xl" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyFavorites;