"use client";
import onUpload from "@/lib/image-upload";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useController, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ProductFormData } from "./CreateNewProduct";

function ImageUpload({
  form,
}: {
  form: UseFormReturn<ProductFormData, any, undefined>;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { field: mediaField } = useController({
    name: "images",
    control: form.control,
  });

  const handleFileUpload = useCallback(
    async (files: FileList) => {
      setIsUploading(true);
      try {
        const uploadPromises = Array.from(files).map((file) => onUpload(file));
        const uploadedUrls = await Promise.all(uploadPromises);
        console.log(uploadedUrls);
        mediaField.onChange([...mediaField.value, ...uploadedUrls]);
        console.log(mediaField);
        setIsUploading(false);
      } catch (error) {
        console.error("Error uploading file:", error);
        setIsUploading(false);
      }
    },
    [mediaField]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileUpload(e.dataTransfer.files);
      }
    },
    [handleFileUpload]
  );
  console.log(mediaField.value);
  return (
    <FormField
      control={form.control}
      name="images"
      render={() => (
        <FormItem>
          <FormLabel>Media</FormLabel>
          <FormControl>
            <div
              className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onDragEnter={handleDragIn}
              onDragLeave={handleDragOut}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Input
                type="file"
                onChange={handleFileChange}
                multiple
                className="hidden"
                id="file-upload"
              />

              <label
                htmlFor="file-upload"
                className={`cursor-pointer ${isUploading ? "" : "hidden"} `}
              >
                Uploading
              </label>
              <label
                htmlFor="file-upload"
                className={`cursor-pointer ${isUploading ? "hidden" : ""} `}
              >
                {isDragging
                  ? "Drop the files here"
                  : "Drag & Drop files here or click to select"}
              </label>
            </div>
          </FormControl>
          {mediaField.value.length > 0 && (
            <div>
              Uploaded files:
              <ul className="flex justify-start items-center border p-2 rounded-md gap-4">
                {mediaField.value.map((url) => (
                  <Image
                    src={url}
                    key={url}
                    width={100}
                    height={100}
                    className="rounded-md object-center object-cover w-[100px] h-[100px]"
                    alt="uploaded-image"
                  />
                ))}
              </ul>
            </div>
          )}
        </FormItem>
      )}
    />
  );
}

export default ImageUpload;
