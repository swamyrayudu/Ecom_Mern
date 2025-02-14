import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addcart, fetchcartItems } from "@/store/shopslice/cartSlice";
import { fetchallfilteredproducts } from "@/store/shopslice/productSlice";
import { useToast } from "@/hooks/use-toast";
import Footer from "./Homepagefooter";
import { getfeatureimage } from "@/store/coomon";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function ShoppingHomePage() {
  const categories = [
    {
      id: "men",
      label: "Men",
      img: "https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: "women",
      label: "Women",
      img: "https://www.hdwallpapers.in/thumbs/2022/stunning_beauty_blue_eyes_girl_model_is_standing_in_blur_bokeh_background_wearing_blue_dress_4k_hd_girls-t2.jpg",
    },
    {
      id: "kids",
      label: "Kids",
      img: "https://images.pexels.com/photos/35188/child-childrens-baby-children-s.jpg",
    },
    {
      id: "accessories",
      label: "Accessories",
      img: "https://images.pexels.com/photos/1453008/pexels-photo-1453008.jpeg?cs=srgb&dl=pexels-martabranco-1453008.jpg&fm=jpg",
    },
    {
      id: "footwear",
      label: "Footwear",
      img: "https://images.pexels.com/photos/19090/pexels-photo.jpg?cs=srgb&dl=pexels-webdonut-19090.jpg&fm=jpg",
    },
  ];

  const brand = [
    {
      id: "nike",
      label: "Nike",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCF07fALS9izyM_nYQrW1aT3eyla7pyeYgMA&s",
    },
    {
      id: "adidas",
      label: "Adidas",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR4wLAWkt4KDjV0dOslfG6qKdY4NoN2Pb-ug&s",
    },
    {
      id: "puma",
      label: "Puma",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEl5TYBgbpIpf_qsUsVqWWOlSwofXEti1_ig&s",
    },
    {
      id: "levi",
      label: "Levi's",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqF0sv0nvEAWbugGdM3D9MOQyXLP3a8ZncOA&s",
    },
    {
      id: "zara",
      label: "Zara",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjcFfYqzt0nHHBpmSjJRxmSuIvR2OmyHWrg&s",
    },
    {
      id: "h&m",
      label: "H&M",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKHUuvyd9L6iS91FcQ0D51T4KNWU0BczBbPg&s",
    },
  ];

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopproducts);
  const { cartItems } = useSelector((state) => state.shoppingcart);
  const { user } = useSelector((state) => state.auth);
  const { featureImage } = useSelector((state) => state.image);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);

  const handelnavegatecategory = (section, getcuurentItem) => {
    sessionStorage.removeItem("filter");
    const currentfilter = {
      [section]: [getcuurentItem.id],
    };
    sessionStorage.setItem("filter", JSON.stringify(currentfilter));
    navigate("/shopping/listing");
  };

  const handleProductCart = (productId, getotalStock) => {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === productId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(addcart({ userId: user?.id, productId, quantity: 1 })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(fetchcartItems(user?.id));
          toast({
            title: "Product Added to Cart",
            description: "You can view it in your cart.",
            status: "success",
          });
        } else {
          toast({
            title: "Error",
            description: "Could not add the product to your cart. Try again.",
            status: "error",
          });
        }
      }
    );
  };

  useEffect(() => {
    dispatch(
      fetchallfilteredproducts({
        filterparams: {},
        sortparams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getfeatureimage());
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImage.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImage]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImage && featureImage.length > 0
          ? featureImage.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImage.length) % featureImage.length
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
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImage.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Shop By Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((item) => (
              <Card
                key={item.id}
                className="group cursor-pointer shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                onClick={() => handelnavegatecategory("category", item)}
              >
                <div className="flex flex-col items-center p-4">
                  <div className="relative h-28 w-28">
                    <img
                      src={item.img}
                      alt={item.label}
                      className="w-full h-full object-cover rounded-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-25 transition-opacity opacity-0 group-hover:opacity-50 rounded-full" />
                  </div>
                  <CardContent className="mt-4 text-center">
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                      {item.label}
                    </span>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Shop By Brand
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {brand.map((item) => (
              <Card
                key={item.id}
                className="group cursor-pointer shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                onClick={() => handelnavegatecategory("brand", item)}
              >
                <div className="flex flex-col items-center p-4">
                  <div className="relative h-28 w-28">
                    <img
                      src={item.img}
                      alt={item.label}
                      className="w-full h-full object-cover rounded-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-25 transition-opacity opacity-0 group-hover:opacity-50 rounded-full" />
                  </div>
                  <CardContent className="mt-4 text-center">
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                      {item.label}
                    </span>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productList &&
            productList.map((productItem, index) => (
              <ShoppingProductTile
                key={index}
                handleProductCart={handleProductCart}
                product={productItem}
              />
            ))}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
