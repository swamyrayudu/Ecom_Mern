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

  useEffect(() => {
    dispatch(getfeatureimage());
  }, [dispatch]);

  return (
    <div className="bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          Admin Dashboard
        </h1>

        {/* Image Upload Section */}
        <div className="mb-6">
          <ImageUpload
            imageFile={imageFile}
            setimageFile={setImageFile}
            uploadimageUrl={uploadImageUrl}
            setuploadImageUrl={setUploadImageUrl}
            setimageload={setImageLoad}
            imageload={imageLoad}
          />
        </div>

        {/* Display Uploaded Feature Image */}
        {featureImage && featureImage.length > 0
          ? featureImage.map((image, index) => (
              <div key={index} className="flex justify-center mt-4 relative">
                <img
                  src={image.image}
                  alt="Feature Preview"
                  className="w-full max-w-md rounded-lg shadow-lg"
                />
                <Button
                  onClick={() => handleDeleteFeatureImage(image._id)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))
          : null}

        {/* Upload Button */}
        <div className="flex justify-center mt-6">
          <Button
            onClick={handleuploadfeatureImage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md"
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
}
