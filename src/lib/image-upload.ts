import { getSignedUrlAction } from "@/actions/image-upload.actions";
import axios from "axios";
import { toast } from "sonner";
const onUpload = (file: File) => {
  const promise = getSignedUrlAction({
    filename: file.name,
    size: file.size,
    type: file.type,
  });
  return new Promise((resolve, reject) => {
    toast.promise(
      promise.then(async (result) => {
        const [response, error] = result;
        if (error) throw new Error(error.message);
        const { imageUrl, presignedUrl } = response;
        await axios
          .put(presignedUrl, file, {
            headers: {
              "Content-Type": file.type,
            },
          })
          .catch((e) => {
            console.log(e);
            throw new Error("Error uploading image. Please try again.");
          });
        const image = new Image();
        image.src = imageUrl;
        image.onload = () => {
          resolve(imageUrl);
        };
      }),
      {
        loading: "Uploading image...",
        success: "Image uploaded successfully.",
        error: (e) => {
          reject(e);
          return e.message;
        },
      }
    );
  });
};

export default onUpload;
