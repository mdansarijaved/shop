import {
  IKUploadResponse,
  UploadError,
} from "imagekitio-next/dist/types/components/IKUpload/props";

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    if (error instanceof Error)
      throw new Error(`Authentication request failed: ${error.message}`);
    throw new Error("something is wrong");
  }
};
const onError = (err: UploadError) => {
  console.log("Error", err.message);
};

const onSuccess = (res: IKUploadResponse) => {
  console.log("Success", res);
};

export { authenticator, onError, onSuccess };
