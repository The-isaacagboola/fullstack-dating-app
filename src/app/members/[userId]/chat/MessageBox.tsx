import { MessageDTO } from "@/lib/helpers";
import Image from "next/image";

export default function MessageBox({
  message,
  author,
}: {
  message: MessageDTO;
  author: boolean;
}) {
  return (
    <div className={`col-span-10 mb-1 `}>
      <div
        className={`flex w-full gap-x-1 ${
          author ? "flex-row-reverse" : " justify-items-start"
        }`}
      >
        <Image
          alt="chat image"
          src={message.senderImage || "/images/user.png"}
          loading="lazy"
          className="object-center aspect-square rounded-full h-fit self-end"
          width={30}
          height={30}
        />
        <div
          className={`max-w-[70%]  px-2 py-1 rounded-lg text-white ${
            author ? "bg-[#075e54]/30" : "bg-[#128c7e]/50"
          }`}
        >
          <div>
            <p className="flex gap-4 justify-between text-nowrap text-sm">
              <span className="font-semibold text-base">
                {message.senderName?.split(" ")[0]}
              </span>
              <span>{message.created}</span>
            </p>
            <p className="text-wrap text-base">{message.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
