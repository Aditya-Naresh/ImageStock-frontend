import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const EditImageModal = ({ isOpen, closeModal, image, onSave }) => {
  const [title, setTitle] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      if (image) {
        setTitle(image.title || '');
      }
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen, image]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, newImage });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  if (!isOpen && !isVisible) return null;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogTrigger />
      <DialogContent className="max-w-lg p-6 bg-white rounded-lg">
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-600 text-lg mb-2">
              Title:
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-600 text-lg mb-2">
              Change Image:
            </label>
            <input
              id="image"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <DialogFooter className="flex justify-between gap-4">
            <Button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
              Save Changes
            </Button>
            <Button type="button" onClick={closeModal} className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-lg shadow-md hover:bg-gray-200 focus:ring-2 focus:ring-gray-300">
              <X />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditImageModal;
