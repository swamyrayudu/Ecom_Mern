import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import Load from "@/components/loading/load";
import { getSearchResults, resetSearchResults } from "@/store/shopslice/searchSlice";


export default function Search() {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const { searchResults, isLoading } = useSelector((state) => state.search);

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim() !== "") {
      dispatch(getSearchResults(keyword));
    }
  };

  const handleReset = () => {
    setKeyword("");
    dispatch(resetSearchResults());
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Search Products</h1>
          <form onSubmit={handleSearch} className="flex items-center space-x-4">
            <Input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search for products..."
              className="flex-1"
            />
            <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Search
            </Button>
            <Button
              type="button"
              onClick={handleReset}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Reset
            </Button>
          </form>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <Load />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <ShoppingProductTile key={product._id} product={product} />
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">
                No products found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
