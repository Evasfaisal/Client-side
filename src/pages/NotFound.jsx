
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
            <img
                src="https://i.ibb.co/0j3PQZb/funny-404.png" 
                alt="404"
                className="w-64 mb-6"
            />
            <h1 className="text-4xl font-bold text-green-700 mb-2">Oops! Page Not Found</h1>
            <p className="text-gray-600 mb-6">We couldn't find what you were looking for.</p>
            <Link
                to="/"
                className="bg-green-600 text-white px-6 py-2  hover:bg-green-700 transition"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
