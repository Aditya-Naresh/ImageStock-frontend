import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages } from "../redux/thunks/imageThunk";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react"; // Import icons

const ImageGallery = () => {
  const dispatch = useDispatch();
  const { images, status } = useSelector((state) => state.images);

  useEffect(() => {
    console.log("Dispatching fetchImages...");
    dispatch(fetchImages());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton className="w-32 h-32" />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>Error loading images. Please try again later.</p>
      </div>
    );
  }

  // If images array is empty, show a message
  if (images.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-semibold mb-6">Image Gallery</h1>
        <div className="flex justify-center items-center w-screen text-gray-500">
          <p>Empty gallery. Add images to get started.</p>
        </div>
      </div>
    );
  }

  const handleEdit = (id) => {
    console.log("Edit image with id:", id);
    // Implement edit functionality here
  };

  const handleDelete = (id) => {
    console.log("Delete image with id:", id);
    // Implement delete functionality here
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Image Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <Card key={image.id} className="shadow-lg rounded-lg">
            <CardHeader>
              <img
                src={image.image}
                alt={image.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{image.title}</CardTitle>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button variant="outline" className="w-full">
                View Image
              </Button>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handleEdit(image.id)}
                  className="p-2"
                >
                  <Edit size={16} />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDelete(image.id)}
                  className="p-2"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
