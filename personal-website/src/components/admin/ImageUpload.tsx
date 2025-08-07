import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface ImageUploadProps {
  onImageSelect: (imageUrl: string) => void;
  currentImage?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageSelect, 
  currentImage, 
  className = "" 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setTimeout(() => {
        onImageSelect(result);
        setIsUploading(false);
      }, 1000);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      <motion.div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragOver 
            ? 'border-accent-yellow bg-yellow-500/10' 
            : 'border-gray-600 hover:border-gray-500'
        }`}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isUploading ? (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-yellow mx-auto"></div>
            <p className="text-gray-300">Uploading image...</p>
          </div>
        ) : currentImage ? (
          <div className="space-y-4">
            <img 
              src={currentImage} 
              alt="Preview" 
              className="max-w-full h-32 object-cover rounded mx-auto"
            />
            <p className="text-gray-300 text-sm">Click to change image</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-4xl">📷</div>
            <div>
              <p className="text-gray-300 font-medium">Upload Image</p>
              <p className="text-gray-500 text-sm">Drag and drop or click to select</p>
            </div>
          </div>
        )}
      </motion.div>

      {currentImage && (
        <motion.button
          onClick={() => onImageSelect('')}
          className="mt-2 px-3 py-1 bg-accent-red text-white rounded text-sm hover:bg-red-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Remove Image
        </motion.button>
      )}
    </div>
  );
};

export default ImageUpload;