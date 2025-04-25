"use client";
import { FaInbox } from "react-icons/fa";
import { MdOutbox } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function MessageSideBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const container = searchParams.get("container");
  console.log(container);

  const handleChangeContainer = (key: string) => {
    router.replace(`${pathname}?container=${key}`);
  };
  return (
    <div className="col-span-3 space-y-4 ">
      <div
        onClick={() => handleChangeContainer("inbox")}
        className={`flex justify-between px-4 py-3 shadow-lg rounded-xl border border-gray-700/60 ${
          container === "inbox" ? "bg-gray-700/60" : ""
        } items-center cursor-pointer`}
      >
        <div className="space-x-2 text-xl flex items-center">
          <FaInbox size={28} />
          <button>Inbox</button>
        </div>

        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-700">
          2
        </span>
      </div>

      <div
        onClick={() => handleChangeContainer("outbox")}
        className={`flex justify-between px-4 py-3 shadow-lg rounded-xl border border-gray-700/60 ${
          container === "outbox" ? "bg-gray-700/60" : ""
        }  items-center cursor-pointer`}
      >
        <div className="space-x-2 text-xl flex items-center">
          <MdOutbox size={28} />
          <button>Outbox</button>
        </div>

        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-700">
          7
        </span>
      </div>
    </div>
  );
}
