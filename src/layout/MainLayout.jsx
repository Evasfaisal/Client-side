import React from 'react';
import NavBar from '../compnent/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../compnent/Footer';

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