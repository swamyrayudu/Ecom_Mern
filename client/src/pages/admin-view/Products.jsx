import ImageUpload from "@/components/admin-view/image-upload";
import ProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/commen/form";
import { addProductFormElements } from "@/components/config";
import Load from "@/components/loading/load";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import {
  AddProduct,
  deleteproduct,
  Editproduct,
  fetchallproducts,
} from "@/store/adminslice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdminProducts() {
  const insitialformData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
  };
  const [openProducts, setProducts] = useState(false);
  const [formdata, setformdata] = useState(insitialformData);
  const [imageFile, setimageFile] = useState(null);
  const [uploadimageUrl, setuploadImageUrl] = useState("");
  const [imageload, setimageload] = useState(false);
  const [curentId, setcurrentId] = useState(null);
  const [isloading, setuseloading] = useState(true);

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminproduct);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchallproducts()).then(() => {
      setuseloading(false);
    });
  }, [dispatch]);

  if (isloading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Load />
      </div>
    );

  function handleDeleteProduct(getcurrentId) {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteproduct(getcurrentId)).then((data) => {
        if (data?.payload.success) {
          dispatch(fetchallproducts());
          toast({
            title: "Product deleted",
          });
        }
      });
    }
  }

  function isFormValid() {
    return Object.keys(formdata)
      .map((key) => formdata[key] !== "")
      .every((item) => item);
  }

  function onSubmit(event) {
    event.preventDefault();
    curentId !== null
      ? dispatch(
          Editproduct({
            id: curentId,
            formdata,
          })
        ).then((data) => {
          if (data?.payload.success) {
            dispatch(fetchallproducts());
            setcurrentId(null);
            setProducts(false);
            setformdata(insitialformData);
            toast({
              title: "Product Edited",
            });
          }
        })
      : dispatch(
          AddProduct({
            ...formdata,
            image: uploadimageUrl,
          })
        ).then((data) => {
          setimageFile(null);
          setformdata(insitialformData);
          setProducts(false);
          dispatch(fetchallproducts());
          if (data?.payload.success)
            toast({
              title: "Product added",
            });
        });
  }

  return (
    <div className="w-full h-[100%] overflow-hidden">
      <div>
        <div className="mb-5 flex justify-end w-full">
          <Button onClick={() => setProducts(true)}>Add new product</Button>
        </div>

        {/* Scrollable Product Grid with hidden scrollbar */}
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {productList && productList.length > 0
            ? productList.map((addproduct) => (
                <ProductTile
                  key={addproduct._id}
                  product={addproduct}
                  setcurrentId={setcurrentId}
                  setProducts={setProducts}
                  setformdata={setformdata}
                  handleDeleteProduct={handleDeleteProduct}
                />
              ))
            : null}
        </div>

        <Sheet
          open={openProducts}
          onOpenChange={() => {
            setProducts(false);
            setcurrentId(null);
            setformdata(insitialformData);
          }}
        >
          <SheetContent className="overflow-auto" side="right">
            <SheetHeader>
              <SheetTitle>
                {curentId !== null ? "Edit product" : "Add new product"}
              </SheetTitle>
            </SheetHeader>
            <SheetDescription></SheetDescription>
            <div className="py-4">
              <ImageUpload
                imageFile={imageFile}
                setimageFile={setimageFile}
                uploadimageUrl={uploadimageUrl}
                setuploadImageUrl={setuploadImageUrl}
                setimageload={setimageload}
                imageload={imageload}
                isEditmode={curentId !== null}
              />
              <CommonForm
                formcontrols={addProductFormElements}
                onSubmit={onSubmit}
                setformdata={setformdata}
                formdata={formdata}
                buttonText={curentId !== null ? "Edit" : "Add"}
                isdiseble={!isFormValid()}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
