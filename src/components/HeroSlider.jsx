
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSlider = () => {
    const slides = [
    
       "https://i.ibb.co.com/JRQ25w0H/Pizza-Best-Deals-Made-with-Poster-My-Wall.jpg",

        "https://i.ibb.co.com/j9SX6TDM/Burger-Discount-Voucher-Design-Template-Made-with-Poster-My-Wall-1.jpg",
       
        "https://i.ibb.co.com/tpLm3fvC/Restaurant-Postcard-Template-Made-with-Poster-My-Wall.jpg",
        
        "https://i.ibb.co.com/8LQTT5XG/Restaurant-Facebook-Shared-Post-Design-Made-with-Poster-My-Wall.jpg"
        
    ];

    return (
        <section className="w-full">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                autoplay={{ delay: 3000 }}
                navigation
                pagination={{ clickable: true }}
                loop
                className="w-full h-[250px] sm:h-[350px] md:h-[500px] lg:h-[700px]"
            >
                {slides.map((img, i) => (
                    <SwiperSlide key={i}>
                        <img
                            src={img}
                            alt={`Slide ${i + 1}`}
                            className="w-full h-auto  object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default HeroSlider;
