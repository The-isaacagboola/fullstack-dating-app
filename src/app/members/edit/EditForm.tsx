"use client";
import { updateMemberProfile } from "@/app/actions/editActions";
import { EditProfileType, memberEditSchema } from "@/lib/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Member } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Props = {
  member: Member;
};
const EditProfileForm = ({ member }: Props) => {
  const defaultValues = {
    name: member.name,
    description: member.description,
    city: member.city,
    country: member.country,
  };
  const {
    formState: { isDirty, isValid, isSubmitting, errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: zodResolver(memberEditSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: EditProfileType) => {
    try {
      const isNameChanged = data.name !== member.name;
      console.log("Update:::", data, isNameChanged);
      await updateMemberProfile(data, isNameChanged);
      toast.success("Profile updated successfully.");
      router.refresh();
    } catch (e) {
      console.log(e);
      toast.error("Error updating profile. Try again");
    }
  };

  const router = useRouter();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 mb-4"
    >
      <div className="border-gray-500 border-2 p-2 rounded-lg">
        <label htmlFor="name" className="block text-sm opacity-80">
          Name:
        </label>
        <input
          type="text"
          {...register("name")}
          className="border-none outline-none"
        />
        {errors.name && <p>Name is required</p>}
      </div>

      <div className="border-gray-500 border-2 p-2 rounded-lg">
        <label htmlFor="description" className="block text-sm opacity-80">
          Description:
        </label>
        <textarea
          {...register("description")}
          className="border-none outline-none w-full h-[150px] no-scrollbar"
        />
        {errors.description && <p>Description is required</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="border-gray-500 border-2 p-2 rounded-lg w-full">
          <label htmlFor="city" className="block text-sm opacity-80">
            City:
          </label>
          <input
            type="text"
            {...register("city")}
            className="border-none outline-none"
          />
          {errors.city && <p>City is required</p>}
        </div>

        <div className="border-gray-500 border-2 p-2 rounded-lg w-full">
          <label htmlFor="country" className="block text-sm opacity-80">
            Country:
          </label>
          <input
            type="text"
            {...register("country")}
            className="border-none outline-none"
          />
          {errors.country && <p>Country is required</p>}
        </div>
      </div>

      <button
        className="flex self-end bg-red-500/80 disabled:opacity-60 px-3 py-2 rounded-lg cursor-pointer disabled:cursor-no-dropS mt-5 transition-all"
        disabled={!isDirty || !isValid}
        type="submit"
      >
        {isSubmitting ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
};

export default EditProfileForm;
