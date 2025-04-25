"use client";
import { createMessage } from "@/app/actions/messageActions";
import { MessageSChema, messageSchema } from "@/lib/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ImSpinner3 } from "react-icons/im";
import { IoSendSharp } from "react-icons/io5";
import { toast } from "react-toastify";

export default function ChatForm({ recipientId }: { recipientId: string }) {
  const {
    register,
    reset,
    formState: { isSubmitting, isValid },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(messageSchema),
    mode: "onSubmit",
  });

  const router = useRouter();
  const submitMessage = async (text: MessageSChema) => {
    try {
      const message = await createMessage(recipientId, text);
      reset({ text: "" });
      router.refresh();
      if (!message.success) {
        toast.error("Unable to send message");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className="flex gap-4 " onSubmit={handleSubmit(submitMessage)}>
      <input
        type="text"
        placeholder="Enter your message here"
        className="w-full h-fit py-1 px-3 rounded-lg border border-gray-500 no-scrollbar outline-none"
        {...register("text")}
      />
      <button
        disabled={!isValid}
        title="Send Message"
        type="submit"
        className="flex p-2 h-full aspect-square items-center justify-between rounded-full bg-gray-500 cursor-pointer disabled:opacity-50 transition-all"
      >
        {!isSubmitting ? (
          <IoSendSharp className="ml-1" />
        ) : (
          <ImSpinner3 size={20} fill="#fff" className="spin-item" />
        )}
      </button>
    </form>
  );
}
