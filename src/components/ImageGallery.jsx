import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteImage,
  fetchImages,
  updateImage,
  updateImageOrder,
} from "../redux/thunks/imageThunk";
import { Skeleton } from "@/components/ui/skeleton";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
  MouseSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem"; // Create this component
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import toast from "react-hot-toast";
import EditImageModal from "./EditImageModal";

const ImageGallery = () => {
  const dispatch = useDispatch();
  const { images, status } = useSelector((state) => state.images);
  const [imageList, setImageList] = useState([]);
  const [deleteImg, setDeleteImg] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(null);
  const [render, setRender] = useState("")
  useEffect(() => {
    console.log("Dispatching fetchImages...");
    dispatch(fetchImages());
  }, [dispatch, render]);

  useEffect(() => {
    setImageList(images);
  }, [images]);

  const sensors = useSensors(
    // useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
        return newItems;
      });
    }
  };

  const handleEdit = (image) => {
    setEditingImage(image);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = ({ title, newImage }) => {
    if (editingImage) {
      const formData = new FormData();
      formData.append("title", title);
      if (newImage) {
        formData.append("image", newImage);
      }
      dispatch(updateImage({ id: editingImage.id, formData }))
        .unwrap()
        .then(() => {
          toast.success("Image updated successfully");
          setRender(`${editingImage.id} ${title} ${newImage}`)
          setIsEditModalOpen(false);
          setEditingImage(null);
        })
        .catch((error) => {
          toast.error("Failed to update image");
        });
    }
  };
  const handleDelete = (image) => {
    console.log("Delete image with id:", image.id);
    setDeleteImg(image);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteImg) {
      dispatch(deleteImage(deleteImg.id))
        .unwrap()
        .then(() => {
          toast.success("Image deleted successfully");
          setRender(`${deleteImage.id} deleted`)
          setIsDeleteModalOpen(false);
          setDeleteImg(null);
        })
        .catch(() => {
          toast.error("Failed to delete image");
        });
    }
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

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        closeModal={() => {
          setIsDeleteModalOpen(false);
          setDeleteImg(null);
        }}
        onConfirm={confirmDelete}
        imageName={deleteImg?.title}
      />

      <EditImageModal
        isOpen={isEditModalOpen}
        closeModal={() => {
          setIsEditModalOpen(false);
          setEditingImage(null);
        }}
        image={editingImage}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default ImageGallery;
