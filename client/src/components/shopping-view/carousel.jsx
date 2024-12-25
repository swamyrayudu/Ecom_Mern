import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

function Carousel({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {images && images.length > 0
        ? images.map((slide, index) => (
            <img
              src={slide?.image}
              key={index}
              className={`${
                index === currentSlide ? "opacity-100" : "opacity-0"
              } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
            />
          ))
        : null}
      <Button
        variant="outline"
        size="icon"
        onClick={() =>
          setCurrentSlide(
            (prevSlide) => (prevSlide - 1 + images.length) % images.length
          )
        }
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() =>
          setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length)
        }
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
      >
        <ChevronRightIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default Carousel;
