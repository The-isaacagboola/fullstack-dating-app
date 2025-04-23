"use client";
import { addImage } from "@/app/actions/userActions";
import ImageUploadButton from "@/components/ImageUploadButton";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const MemberPhotoUpload = () => {
  const router = useRouter();

  const onAddImage = async (result: CloudinaryUploadWidgetResults) => {
    console.log(result); // worling fine
    if (result.info && typeof result.info === "object") {
      try {
        await addImage(result.info.secure_url, result.info.public_id);
        toast.success("Image uploaded!");
        router.refresh();
      } catch (error) {
        console.log(error);
        toast.error("Error uploading image. Try again");
      }
    } else {
      toast.error("Problem adding image");
    }
  };

  return (
    <div>
      <ImageUploadButton onUploadImage={onAddImage} />
    </div>
  );
};

export default MemberPhotoUpload;
