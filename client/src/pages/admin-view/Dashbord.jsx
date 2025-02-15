import ImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addfetureimage, getfeatureimage, deleteFeatureImage } from "@/store/coomon";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";

export default function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [imageLoad, setImageLoad] = useState(false);
  const dispatch = useDispatch();
  const { featureImage } = useSelector((state) => state.image);

  useEffect(() => {
    dispatch(getfeatureimage());
  }, [dispatch]);

  function handleuploadfeatureImage() {
    dispatch(addfetureimage(uploadImageUrl)).then((data) => {
      if (data.payload.success) {
        dispatch(getfeatureimage());
      }
    });
  }

  function handleDeleteFeatureImage(id) {
    dispatch(deleteFeatureImage(id)).then((data) => {
      if (data.payload.success) {
        dispatch(getfeatureimage());
      }
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <div className="w-full max-w-6xl bg-white p-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center uppercase">
          Admin Dashboard
        </h1>

        {/* Image Upload Section */}
        <div className="mb-8 bg-gray-50 p-6 rounded-xl shadow-md">
          <ImageUpload
            imageFile={imageFile}
            setimageFile={setImageFile}
            uploadimageUrl={uploadImageUrl}
            setuploadImageUrl={setUploadImageUrl}
            setimageload={setImageLoad}
            imageload={imageLoad}
          />
          <div className="flex justify-center mt-6">
            <Button
              onClick={handleuploadfeatureImage}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl text-lg shadow-lg"
            >
              Upload
            </Button>
          </div>
        </div>

        {/* Display Uploaded Feature Images */}
        {featureImage && featureImage.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureImage.map((image, index) => (
              <div key={index} className="relative bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={image.image}
                  alt="Feature Preview"
                  className="w-full h-60 object-cover rounded-xl"
                />
                <Button
                  onClick={() => handleDeleteFeatureImage(image._id)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}