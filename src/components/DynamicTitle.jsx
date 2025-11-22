import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TITLES = {
    "/": "Food-lover",
    "/home": "Food-lover",
    "/login": "Login",
    "/register": "Register",
    "/allreviews": "All Reviews",
    "/add-review": "Add Review",
    "/my-reviews": "My Reviews",
    "/my-favorites": "My Favorites",
    "/404": "Not Found"
};

export default function DynamicTitle() {
    const location = useLocation();
    useEffect(() => {
        const path = location.pathname.toLowerCase();
        let title = TITLES[path] || "Food-lover";
        if (path.startsWith("/edit-review")) title = "Edit Review";
        if (path.startsWith("/reviewdetails")) title = "Review Details";
        document.title = title;
    }, [location.pathname]);
    return null;
}
