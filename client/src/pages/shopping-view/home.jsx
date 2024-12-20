import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ShoppingHome() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    "https://img.freepik.com/free-psd/summer-sale-banner-template_23-2148622719.jpg?t=st=1734539604~exp=1734543204~hmac=169d60770908bdf516a0c1683072c9394869d6706320d5c2b21ed92175c467f4&w=2000",
    "https://img.freepik.com/free-psd/fashion-blogger-banner-template_23-2148972522.jpg?t=st=1734539661~exp=1734543261~hmac=23e86769ad79130f5137b663db655d8cda4d5bf4cb26d38d169ec1f878a93d95&w=2000",
    "https://img.freepik.com/free-psd/summer-sale-landing-banner-template_23-2148622704.jpg?t=st=1734539726~exp=1734543326~hmac=21675a597edec135be0dbcee3f61e54551439e8521f6d8508391c7392ea88073&w=2000",
  ];

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => {
          if (prevIndex === slides.length - 1) {
            return 0; // Jump directly to the first slide
          }
          return prevIndex + 1;
        });
      }, 3000); // 3-second interval
      return () => clearInterval(interval);
    }
  }, [isPaused, slides.length]);

  const handlePrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => {
      if (prevIndex === slides.length - 1) {
        return 0; // Jump directly to the first slide
      }
      return prevIndex + 1;
    });
  };

  return (
    <div className="w-full h-screen flex flex-col items-center bg-gray-50">
      {/* Carousel Container */}
      <div
        className="relative w-full h-[calc(50vh+50px)] overflow-hidden rounded-lg shadow-md mt-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 z-10"
          onClick={handlePrevious}
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 z-10"
          onClick={handleNext}
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === activeIndex ? "bg-blue-600" : "bg-gray-400"
              } transition-colors duration-300`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
