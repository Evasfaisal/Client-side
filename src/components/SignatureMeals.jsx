import React from "react";

const images = [
    // এখানে আপনার ইমেজ লিংকগুলো বসাবেন
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
    "https://example.com/image4.jpg",
    "https://example.com/image5.jpg",
];

export default function SignatureMeals() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-5xl mx-auto px-4 text-center">
                <h3 className="text-2xl font-bold text-green-700 mb-8">Signature Meals</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {images.map((img, i) => (
                        <div key={i} className="bg-green-50 rounded-lg shadow p-4 flex flex-col items-center">
                            <img
                                src={img}
                                alt={`Signature Meal ${i + 1}`}
                                className="w-full h-48 object-cover rounded mb-4"
                                loading="lazy"
                            />
                            <p className="text-green-700 font-semibold">Signature Meal {i + 1}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
