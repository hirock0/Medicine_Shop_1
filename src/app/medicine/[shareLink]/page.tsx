"use client";

import { AllApiHandler } from "@/utils/redux/slices/slice";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { motion } from "framer-motion";
import LikeBtn from "@/components/medicines/likes/likeBtn";
import CommentBtn from "@/components/medicines/comments/commentBtn";
import toast from "react-hot-toast";
import { IoMdShare } from "react-icons/io";
import Link from "next/link";

const MedicineLinkShare = (props: any) => {
  const [isCopied, setIsCopied] = useState(false);
  const id = props?.params?.shareLink.toString();
  const dispatch = useDispatch();
  const allMedicine = useSelector((state: any) => state?.Slice?.data);
  const medicines = allMedicine?.medicines;
  const filterMedicine = medicines?.filter((item: any) => item._id == id);

  const ShareLink = async (id: any) => {
    try {
      await navigator.clipboard.writeText(
        `https://medicine-shop-1.vercel.app/medicine/${id}`
      );

      toast.success("copy to clip-board");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  useEffect(() => {
    dispatch(AllApiHandler());
  }, []);
  return (
    <main className=" py-10 ">
      <section className=" flex items-center justify-center">
        {filterMedicine !== undefined ? (
          <div className=" w-4/6 max-md:w-5/6 max-sm:w-full lg:w-1/2">
            {filterMedicine?.map((item: any, index: any) => (
              <motion.div
                key={index}
                className="bg-base-100 p-5 max-sm:p-2 rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className=" flex items-center justify-center">
                  <div className="  w-52 h-52 ">
                    <Image
                      src={item?.medicineImage}
                      alt={item?.medicineName}
                      priority
                      width={500}
                      height={500}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                <div className="">
                  <h2 className="text-2xl max-sm:text-base font-semibold text-center">
                    {item?.medicineName} {item?.medicinePotency}
                  </h2>
                  <p className="text-gray-600 my-2 hidden">
                    {item?.descriptions}{" "}
                  </p>
                  <h2 className=" font-bold text-center">
                    {item?.medicinePrice} TK
                  </h2>
                  <Link
                    href={`/medicine/details/${id}`}
                    className="  w-2/5 max-sm:w-1/2"
                  >
                    <button className=" btn btn-accent w-full ">details</button>
                  </Link>

                  {/* ----------------------- */}
                  <div className=" mt-5">
                    <div className=" flex items-center justify-between max-md:flex-col gap-3 max-sm:gap-5 ">
                      {/* ----------------------- */}

                      <LikeBtn item={item} />

                      {/* ---------------------------- */}
                      <CommentBtn item={item} />
                      {/* --------------------------------------- */}
                    </div>
                    <div className=" mt-5">
                      <div className="dropdown dropdown-end">
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn btn-ghost btn-circle avatar"
                        >
                          <button
                            className=""
                            onClick={() => ShareLink(item?._id)}
                          >
                            <IoMdShare className="w-5 h-5" />
                          </button>
                        </div>
                        <ul
                          tabIndex={0}
                          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                          <li>
                            <a className="justify-between">
                              Profile
                              <span className="badge">New</span>
                            </a>
                          </li>
                          <li>
                            <a>Settings</a>
                          </li>
                          <li>
                            <a>Logout</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* ----------------------- */}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className=" h-[90vh]  flex items-center justify-center">
            <div className="">
              <span className="  loading loading-dots loading-lg  "></span>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default MedicineLinkShare;
