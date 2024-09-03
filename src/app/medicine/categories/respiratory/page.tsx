"use client";

import DrugDetails from "@/components/medicines/medicineDetails/drugDetails";
import { addCart, AllApiHandler } from "@/utils/redux/slices/slice";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect,useState } from "react";

import { useSelector, useDispatch } from "react-redux";


import LikeBtn from "@/components/medicines/likes/likeBtn";
import CommentBtn from "@/components/medicines/comments/commentBtn";
import toast from "react-hot-toast";


import CopyLinkBtn from "@/components/medicines/copyLinkBtn/copyLinkBtn";


const RespiratoryPage = (props:any) => {

  const dispatch = useDispatch();
  const allMedicines = useSelector((state: any) => state?.Slice.data);
  const medicines = allMedicines?.medicines;





  useEffect(() => {
    dispatch(AllApiHandler());

  }, []);
  return (
    <main className=" py-10">
      <section>
        <div className="">
          <h1 className="text-4xl font-bold text-center">
            {
              props?.searchParams.q.toUpperCase() || ""
            }
          </h1>
          <div className=" flex items-center justify-center mt-10 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {medicines?.map((item: any, index: any) => (
               
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
                    <div className="mt-4 flex justify-between max-sm:flex-col max-sm:items-center gap-5 ">
                    <button
                      className="btn btn-primary w-2/5 max-sm:w-1/2   "
                      onClick={() => dispatch(addCart(item))}
                    >
                      Add to Cart
                    </button>
                      <DrugDetails item={item}/>
                    </div>

                  {/* ----------------------- */}
                  <div className=" mt-5">
                      <div className=" flex items-center justify-between max-sm:flex-col gap-3 max-sm:gap-5 ">
                            {/* ----------------------- */}

                              <LikeBtn item={item}/>


                            {/* ---------------------------- */}
                              <CommentBtn item={item}/>
                          {/* --------------------------------------- */}
                      </div>

                  </div>
                  {/* ------------- */}
                  <div className=" mt-5">


                  <CopyLinkBtn item={item}/>
                  </div>
                  {/* ----------------------- */}
                  </div>

                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RespiratoryPage;
