"use client";

import { addCart, AllApiHandler } from "@/utils/redux/slices/slice";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

const RespiratoryPage = () => {
  const dispatch = useDispatch();
  const allMedicines = useSelector((state: any) => state?.Slice.data);
  const medicines = allMedicines?.medicines;

  useEffect(() => {
    dispatch(AllApiHandler());
  }, []);
  return (
    <main>
      <section>
        <div className=" p-6">
          <h1 className="text-4xl font-bold text-center my-8">Our Medicines</h1>
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {medicines?.map((item: any, index: any) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className=" flex items-center justify-center">
                    <div className="w-52 h-52 ">
                      <Image
                        src={item?.medicineImage}
                        alt={item?.medicineName}
                        width={500}
                        height={500}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  <div className="p-4">
                    <h2 className="text-2xl font-semibold">
                      {item?.medicineName} {item?.medicinePotency}
                    </h2>
                    <p className="text-gray-600 my-2 hidden">
                      {item?.descriptions}{" "}
                    </p>
                    <p className="text-lg font-bold">
                      {item?.medicinePrice} TK
                    </p>
                    <button
                      className="btn btn-primary mt-4"
                      onClick={() => dispatch(addCart(item))}
                    >
                      Add to Cart
                    </button>
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
