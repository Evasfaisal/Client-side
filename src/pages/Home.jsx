
import React from "react";
import HeroSlider from "../components/HeroSlider";
import FeaturedReviews from "../components/FeaturedReviews";
import RecentReviews from "../components/RecentReviews";
import TopRestaurants from "../components/TopRestaurants";

const Home = () => {
    return (
        <div>
     
            <HeroSlider />

        
            <FeaturedReviews />

        
            <RecentReviews />

            <TopRestaurants />

        
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h3 className="text-2xl font-bold text-green-700 mb-4">How It Works</h3>
                    <p className="text-gray-600 mb-8">Search → Read reviews → Share your experience</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                            <h4 className="font-semibold mb-2">Search local food</h4>
                            <p className="text-gray-600 text-sm">Discover the best local spots in your city.</p>
                        </div>
                        <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                            <h4 className="font-semibold mb-2">Read honest reviews</h4>
                            <p className="text-gray-600 text-sm">Learn from the experiences of other food lovers.</p>
                        </div>
                        <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                            <h4 className="font-semibold mb-2">Share your favorites</h4>
                            <p className="text-gray-600 text-sm">Post your own reviews and photos to guide others.</p>
                        </div>
                    </div>
                </div>
            </section>

       
            <section className="py-16 bg-green-50">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h3 className="text-2xl font-bold text-green-700 mb-4">Popular Cuisines</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {["Biryani", "Street Food", "Desserts", "Fast Food"].map((c, i) => (
                            <div
                                key={i}
                                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
                            >
                                {c}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;


