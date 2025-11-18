import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ReviewCard from "../components/ReviewCard";
import { toast } from "react-hot-toast";
import { getFavoriteReviews, clearFavorites } from "../api/localFavorites";



export default MyFavorites;