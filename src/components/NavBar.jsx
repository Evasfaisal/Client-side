import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GiForkKnifeSpoon } from "react-icons/gi";

const NavBar = () => {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/allreviews", label: "All Reviews" },
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLinkClick = () => {
        setDropdownOpen(false); 
        setMobileMenuOpen(false); 
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/90 shadow-md backdrop-blur-md text-gray-800"
                : "bg-transparent text-white"
                }`}
        >
            <div className="px-4 md:px-8 py-4 flex items-center justify-between">

                <Link
                    to="/"
                    className={`flex items-center gap-2 text-xl md:text-2xl font-bold transition-colors duration-300 ${isScrolled ? "text-green-700" : "text-white"
                        }`}
                >
                    <GiForkKnifeSpoon
                        className={`text-4xl ${isScrolled ? "text-orange-500" : "text-yellow-400"
                            }`}
                    />
                    <span className="tracking-wide">Local Food Lovers</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map(({ path, label }) => (
                        <NavLink
                            key={path}
                            to={path}
                            className={({ isActive }) =>
                                `text-lg font-semibold transition-colors duration-300 ${isActive
                                    ? "text-green-500"
                                    : isScrolled
                                        ? "text-gray-800 hover:text-green-600"
                                        : "text-white hover:text-green-500"
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}

                    {!user ? (
                        <div className="flex gap-3">
                            <NavLink
                                to="/login"
                                className="px-5 py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 text-lg"
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                className="px-5 py-2 rounded-lg font-medium border border-green-600 text-green-600 hover:bg-green-50 text-lg"
                            >
                                Register
                            </NavLink>
                        </div>
                    ) : (
                        <div className="relative">
                            <img
                                src={
                                    user.photoURL ||
                                    "https://i.ibb.co/2yP0kzH/profile.png"
                                }
                                alt="User"
                                className="w-10 h-10 rounded-full cursor-pointer border-2 border-green-500"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            />
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 py-2 z-50">
                                    <Link
                                        to="/add-review"
                                        className="block px-4 py-2 text-gray-700 hover:bg-green-50"
                                        onClick={handleLinkClick}
                                    >
                                        Add Review
                                    </Link>
                                    <Link
                                        to="/my-reviews"
                                        className="block px-4 py-2 text-gray-700 hover:bg-green-50"
                                        onClick={handleLinkClick}
                                    >
                                        My Reviews
                                    </Link>

                                 
                                    <Link
                                        to="/my-favorites"
                                        className="block px-4 py-2 text-gray-700 hover:bg-green-50 font-bold"
                                        onClick={handleLinkClick}
                                    >
                                        My Favorites 
                                    </Link>

                                    <hr className="my-1" />
                                    <button
                                        onClick={() => {
                                            logout();
                                            setDropdownOpen(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex md:hidden items-center gap-2">
                  
                    {user && (
                        <img
                            src={user.photoURL || "https://i.ibb.co/2yP0kzH/profile.png"}
                            alt="User"
                            className="w-8 h-8 rounded-full cursor-pointer border-2 border-green-500 mr-2"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        />
                    )}

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`focus:outline-none ${isScrolled ? "text-gray-700" : "text-white"
                            }`}
                    >
                        <svg
                            className="w-7 h-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={
                                    mobileMenuOpen
                                        ? "M6 18L18 6M6 6l12 12"
                                        : "M4 6h16M4 12h16M4 18h16"
                                }
                            />
                        </svg>
                    </button>
                </div>
            </div>


         
            {mobileMenuOpen && (
                <div className="md:hidden transition bg-white/90 backdrop-blur-md shadow-lg text-gray-800">
                    {navLinks.map(({ path, label }) => (
                        <NavLink
                            key={path}
                            to={path}
                            className="block px-4 py-3 font-semibold text-lg hover:bg-green-50"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {label}
                        </NavLink>
                    ))}

                 
                    {user && (
                        <>
                            <hr className="my-0" />
                            <Link
                                to="/add-review"
                                className="block px-4 py-3 font-semibold text-lg hover:bg-green-50"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Add Review
                            </Link>
                            <Link
                                to="/my-reviews"
                                className="block px-4 py-3 font-semibold text-lg hover:bg-green-50"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                My Reviews
                            </Link>
                           
                            <Link
                                to="/my-favorites"
                                className="block px-4 py-3 font-semibold text-lg hover:bg-green-50 text-green-600"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                My Favorites 
                            </Link>
                            <hr className="my-0" />
                        </>
                    )}


                    {!user ? (
                        <div className="flex flex-col gap-2 px-4 py-3">
                            <NavLink
                                to="/login"
                                className="px-4 py-2 bg-green-600 text-white rounded-lg text-center text-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                className="px-4 py-2 border border-green-600 text-green-600 rounded-lg text-center text-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Register
                            </NavLink>
                        </div>
                    ) : (
                        <button
                            onClick={() => {
                                logout();
                                setMobileMenuOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 text-lg"
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default NavBar;