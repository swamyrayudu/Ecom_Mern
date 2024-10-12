import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileImage, Upload, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

export default function ImageUpload({
  imageFile,
  setimageFile,
  uploadimageUrl,
  setuploadImageUrl,
  setimageload,
  imageload,
  isEditmode,
}) {
  const inputRef = useRef("");
  function handleimagefilechange(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setimageFile(selectedFile);
  }

  function handledrag(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const dropedFile = event.dataTransfer.files?.[0];
    if (dropedFile) setimageFile(dropedFile);
  }

  function handleRemoveImage() {
    setimageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  async function uploadimageUrl() {
    setimageload(true);
    const data = new FormData();
    data.append("my_files", imageFile);
    const response = await axios.post(
      "http://localhost:9001/api/admin/products/upload-image",
      data
    );
    console.log(response, "response");
    if (response?.data?.success) {
      setuploadImageUrl(response.data.result.url);
      setimageload(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadimageUrl();
  }, [imageFile]);

  return (
    <>
      <div
        onDragOver={handledrag}
        onDrop={handleDrop}
        className="w-full max-w-md mx-auto mt-4"
      >
        <Label className="text-lg font-semibold mb-3 block">Upload Image</Label>
        <div
          className={`${
            isEditmode ? "opacity-40" : ""
          } border-2 border-dashed rounded-lg p-4`}
        >
          <Input
            type="file"
            id="image-upload"
            ref={inputRef}
            onChange={handleimagefilechange}
            className="hidden"
            disabled={isEditmode}
          />
          {!imageFile ? (
            <Label
              htmlFor="image-upload"
              className={`${
                isEditmode ? "cursor-not-allowed" : ""
              } flex flex-col items-center justify-center h-32 cursor-pointer`}
            >
              <Upload className="w-10 h-10 text-muted-foreground mb-2" />
              <span>drag & Drop or click to upload image </span>
            </Label>
          ) : imageload ? (
            <Skeleton className="w-7 h-7" />
          ) : (
            <div className="flex items-center justify-between overflow-auto">
              <div className="flex items-center">
                <FileImage className="w-8 h-8 text-primary mr-2" />
              </div>
              <p className="text-sm font-medium">{imageFile.name}</p>
              <Button
                variant="ghost"
                size="icon"
                className=" text-muted-foreground hover:text-foreground"
                onClick={handleRemoveImage}
              >
                <XIcon className="w-4 h-4" />
                <span className="sr-only">Remove File</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
