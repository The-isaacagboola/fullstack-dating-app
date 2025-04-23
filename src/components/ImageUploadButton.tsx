"use client";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { GoFileSubmodule } from "react-icons/go";

type Props = {
  onUploadImage: (result: CloudinaryUploadWidgetResults) => Promise<void>;
};
const ImageUploadButton = ({ onUploadImage }: Props) => {
  return (
    <CldUploadButton
      options={{ maxFiles: 1 }}
      onSuccess={onUploadImage}
      signatureEndpoint="/api/sign-image"
      uploadPreset={
        (process.env.CLOUDINARY_UPLOAD_PRESET_NAME as string) || "matchme-demo"
      }
      className="flex gap-2 px-3 py-2 mb-4 rounded-lg cursor-pointer border border-gray-500"
    >
      <GoFileSubmodule size={28} />
      <p>Upload new image</p>
    </CldUploadButton>
  );
};

export default ImageUploadButton;
