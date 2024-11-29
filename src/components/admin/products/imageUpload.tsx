"use client";
import Image from "next/image";
import { IKUpload, ImageKitProvider } from "imagekitio-next";
import React, { useCallback, useRef, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useController, UseFormReturn } from "react-hook-form";
import { ProductFormData } from "./CreateNewProduct";
import { env } from "@/env";
import { authenticator } from "@/lib/ikUpload";
import {
  IKUploadResponse,
  UploadError,
} from "imagekitio-next/dist/types/components/IKUpload/props";
const publicKey = env.NEXT_PUBLIC_IMAGEKIT_KEY;
const urlEndPoint = env.NEXT_PUBLIC_IMGKIT_URL;

function ImageUpload({
  form,
}: {
  form: UseFormReturn<ProductFormData, any, undefined>;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const { field: mediaField } = useController({
    name: "images",
    control: form.control,
  });

  const ikUploadRef = useRef(null);
  const onError = (err: UploadError) => {
    console.log("Error", err.message);
  };

  const onSuccess = useCallback(
    async (res: IKUploadResponse) => {
      const url = res.url;
      mediaField.onChange([...mediaField.value, url]);
    },
    [mediaField]
  );
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndPoint}
      authenticator={authenticator}
    >
      <FormField
        control={form.control}
        name="images"
        render={() => (
          <FormItem>
            <FormLabel>Media</FormLabel>
            <FormControl>
              <div
                className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer   border-gray-300
                }`}
              >
                <IKUpload
                  fileName="test-upload.png"
                  onError={onError}
                  id="file-upload"
                  className="hidden"
                  onUploadProgress={() => setIsUploading(true)}
                  onSuccess={onSuccess}
                  useUniqueFileName={true}
                  ref={ikUploadRef}
                />

                <label
                  htmlFor="file-upload"
                  className={`cursor-pointer ${isUploading ? "" : ""} `}
                >
                  select files to upload
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
    </ImageKitProvider>
  );
}

export default ImageUpload;

/**
 * 
 *  const handleFileUpload = useCallback(
    async (files: FileList) => {
      setIsUploading(true);
      try {
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
 */
