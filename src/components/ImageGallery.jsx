import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages, updateImageOrder } from "../redux/thunks/imageThunk";
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
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem"; // Create this component

const ImageGallery = () => {
  const dispatch = useDispatch();
  const { images, status } = useSelector((state) => state.images);
  const [imageList, setImageList] = useState([]);
  const [deleteImg, setDeleteImg] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    console.log("Dispatching fetchImages...");
    dispatch(fetchImages());
  }, [dispatch]);

  useEffect(() => {
    setImageList(images); // Sync Redux state with local state for drag-and-drop
  }, [images]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setImageList((prevImages) => {
        const oldIndex = prevImages.findIndex((img) => img.id === active.id);
        const newIndex = prevImages.findIndex((img) => img.id === over.id);

        const newItems = arrayMove(prevImages, oldIndex, newIndex);
        dispatch(
          updateImageOrder(
            newItems.map((img, index) => ({
              id: img.id,
              order: index,
            }))
          )
        );
        return newItems
      });
    }
  };

  const handleEdit = (id) => {
    console.log("Edit image with id:", id);
    // Implement edit functionality here
  };

  const handleDelete = (image) => {
    console.log("Delete image with id:", image.id);
    setDeleteImg(image);
    setIsDeleteModalOpen(true);
  };

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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Image Gallery</h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={imageList.map((image) => image.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {imageList.map((image) => (
              <SortableItem
                key={image.id}
                id={image.id}
                image={image}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ImageGallery;
