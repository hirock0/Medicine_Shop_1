"use client";
import React, { useEffect, useState } from "react";
import { IoMdShare } from "react-icons/io";
import toast from "react-hot-toast";
interface Props {
  item: object | any;
}

const CopyLinkBtn: React.FC<Props> = ({ item }) => {
  const [onCopyBtn, setOnCopyBtn] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const ShareLink = async (id: any) => {
    try {
      await navigator.clipboard.writeText(
        `https://medicine-shop-1.vercel.app/medicine/${id}`
      );
      setIsCopied(true);
      // Reset the copied state after 2 seconds
      toast.success("copy to clip-board");
      setTimeout(() => setIsCopied(false), 5000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };
  const windowClickingEvent = () => {
    window.addEventListener("click", () => {
      setOnCopyBtn(false);
    });
  };

  useEffect(() => {
    windowClickingEvent();
  }, []);

  return (
    <div onClick={(e) => e.stopPropagation()} className=" w-fit">
      <button
        onClick={() => setOnCopyBtn(!onCopyBtn)}
        className=" btn btn-ghost btn-circle avatar"
      >
        <IoMdShare className="w-5 h-5" />
      </button>

      <ul
        className={`${
          !onCopyBtn ? "hidden" : "block"
        } text-sm flex flex-col gap-2`}
      >
        <li
          onClick={() => ShareLink(item?._id)}
          className={`${
            !isCopied ? "" : "  text-accent"
          } cursor-pointer  hover:underline hover:underline-offset-4 active:text-warning select-none`}
        >
          Copy to clipboard
        </li>
        <li className=" cursor-pointer hover:underline hover:underline-offset-4 active:text-warning select-none">
          facebook
        </li>
        <li className=" cursor-pointer  hover:underline hover:underline-offset-4 active:text-warning select-none">
          twitter
        </li>
      </ul>
    </div>
  );
};

export default CopyLinkBtn;
