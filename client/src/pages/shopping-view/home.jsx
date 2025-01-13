import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addcart, fetchcartItems } from "@/store/shopslice/cartSlice";
import { fetchallfilteredproducts } from "@/store/shopslice/productSlice";
import { useToast } from "@/hooks/use-toast";
import Footer from "./Homepagefooter";

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
  const { user } = useSelector((state) => state.auth);
  const {toast} = useToast()
  const navigate = useNavigate();

  const handelnavegatecategory = (section, getcuurentItem) => {
    sessionStorage.removeItem("filter");
    const currentfilter = {
      [section]: [getcuurentItem.id],
    };
    sessionStorage.setItem("filter", JSON.stringify(currentfilter));
    navigate("/shopping/listing");
  };

  const handleProductCart = (productId) => {
    dispatch(addcart({ userId: user?.id, productId, quantity: 1 })).then((data) => {
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
    });
  };

  useEffect(() => {
    dispatch(
      fetchallfilteredproducts({
        filterparams: {},
        sortparams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full overflow-hidden sm:h-[300px] md:h-[400px] lg:h-[500px]">
        <img
          src="https://raw.githubusercontent.com/sangammukherjee/mern-ecommerce-2024/refs/heads/master/client/src/assets/banner-1.webp"
          alt="Banner"
          className="w-full sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
        />
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
        <Footer/>
      </div>
    </div>
  );
}
