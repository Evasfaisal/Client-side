import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-green-700 text-white mt-10">
            <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
               
                <div>
                    <Link to="/" className="text-2xl font-bold flex items-center gap-2">
                        🍲 Local Food Lovers
                    </Link>
                    <p className="mt-3 text-sm text-gray-100 leading-relaxed">
                        Discover the best local restaurants and share your reviews with the community.
                        Eat local, support local!
                    </p>
                </div>

              
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-gray-100">
                        <li><Link to="/" className="hover:underline">Home</Link></li>
                        <li><Link to="/all-reviews" className="hover:underline">All Reviews</Link></li>
                        <li><Link to="/login" className="hover:underline">Login</Link></li>
                        <li><Link to="/register" className="hover:underline">Register</Link></li>
                    </ul>
                </div>

           
                <div>
                    <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
                    <div className="flex items-center gap-4">
                        <a href="#" aria-label="Facebook" className="hover:text-blue-300">
                            <Facebook />
                        </a>
                        <a href="#" aria-label="Instagram" className="hover:text-pink-300">
                            <Instagram />
                        </a>
                        <a href="#" aria-label="YouTube" className="hover:text-red-400">
                            <Youtube />
                        </a>
                        <a href="#" aria-label="LinkedIn" className="hover:text-blue-400">
                            <Linkedin />
                        </a>
                        <a href="#" aria-label="X (Twitter)" className="hover:text-gray-200">
                            <Twitter />
                        </a>
                    </div>
                </div>
            </div>

           
            <div className="border-t border-green-600 py-4 text-center text-sm text-gray-100">
                © {new Date().getFullYear()} 🍲 Local Food Lovers — All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
