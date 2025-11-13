import React from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
     <>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>

     </>
    );
};

export default MainLayout;