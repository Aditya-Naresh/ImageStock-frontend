import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export const SortableItem = ({ id, image, handleEdit, handleDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="shadow-lg rounded-lg"
    >
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
          <a href={image.image} target="_blank" rel="noopener noreferrer">
            View Image
          </a>
        </Button>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => handleEdit(image)}
            className="p-2"
          >
            <Edit size={16} />
          </Button>
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(image);
            }}
            className="p-2"
            data-no-dnd
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
