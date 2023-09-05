"use client";

import React, { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

import { Button } from "./ui/button";
import { ImagePlusIcon, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isStarted, setIsStarted] = useState(false);
  useEffect(() => {
    setIsStarted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isStarted) {
    return null;
  }
  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="absolute top-2 right-2 z-10">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => onRemove(url)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
            <Image fill src={url} alt="Image" className="object-cover" />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="e_commerce">
        {({ open }) => {
          const handleClick = (e: any) => {
            e.preventDefault();
            open();
          };
          return (
            <Button
              onClick={handleClick}
              variant="secondary"
              type="button"
              disabled={disabled}
            >
              <ImagePlusIcon className="w-4 h-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUploader;
// relative w-[200px] h-[200px] rounded-md overflow-hidden
