import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function ShoppingHome() {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    "https://img.freepik.com/free-psd/summer-sale-banner-template_23-2148622719.jpg?t=st=1734539604~exp=1734543204~hmac=169d60770908bdf516a0c1683072c9394869d6706320d5c2b21ed92175c467f4&w=2000",
    "https://img.freepik.com/free-psd/fashion-blogger-banner-template_23-2148972522.jpg?t=st=1734539661~exp=1734543261~hmac=23e86769ad79130f5137b663db655d8cda4d5bf4cb26d38d169ec1f878a93d95&w=2000",
    "https://img.freepik.com/free-psd/summer-sale-landing-banner-template_23-2148622704.jpg?t=st=1734539726~exp=1734543326~hmac=21675a597edec135be0dbcee3f61e54551439e8521f6d8508391c7392ea88073&w=2000",
    "https://img.freepik.com/premium-vector/modern-fashion-sale-promotion-horizontal-banner_653934-2.jpg?w=1800",
    "https://img.freepik.com/premium-psd/psd-fashion-concept-banner-template-design_781017-251.jpg?w=1800",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slides every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handleSlideClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative overflow-hidden bg-gray-50">
      <Carousel className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] mt-10">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem
              key={index}
              className={index === activeIndex ? "block" : "hidden"}
            >
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover cursor-pointer rounded-lg"
                onClick={() => handleSlideClick(index)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Previous Button */}
        <button
          className="absolute top-1/2 left-2 sm:left-4 lg:left-8 transform -translate-y-1/2 bg-white p-2 sm:p-3 md:p-4 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 z-10"
          onClick={handlePrevious}
        >
          <ChevronLeft
            size={16} /* Small icon */
            className="sm:w-6 sm:h-6 lg:w-8 lg:h-8"
          />
        </button>

        {/* Next Button */}
        <button
          className="absolute top-1/2 right-2 sm:right-4 lg:right-8 transform -translate-y-1/2 bg-white p-2 sm:p-3 md:p-4 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 z-10"
          onClick={handleNext}
        >
          <ChevronRight
            size={16} /* Small icon */
            className="sm:w-6 sm:h-6 lg:w-8 lg:h-8"
          />
        </button>
      </Carousel>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 rounded-full ${
              index === activeIndex ? "bg-gray-800" : "bg-gray-400"
            } focus:outline-none hover:bg-gray-600 transition-colors duration-300`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
