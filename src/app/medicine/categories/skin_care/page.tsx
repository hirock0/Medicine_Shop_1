"use client";

import { addCart, AllApiHandler } from "@/utils/redux/slices/slice";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LikeBtn from "@/components/medicines/likes/likeBtn";
import CommentBtn from "@/components/medicines/comments/commentBtn";
import CopyLinkBtn from "@/components/medicines/copyLinkBtn/copyLinkBtn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { CiSearch } from "react-icons/ci";
const Skin_carePage = (props: any) => {
  const searchRoute = props?.searchParams.q || "";
  const search = props?.searchParams.search || "";
  const router = useRouter();
  const pathname = usePathname();
  const [searchData, setSearchData] = useState<string>("");
  const dispatch = useDispatch();
  const allMedicines = useSelector((state: any) => state?.Slice.data);
  const medicines = allMedicines?.medicines;

  const onSearch = () => {
    const newUrl = new URLSearchParams(window.location.search);
    newUrl.set("search", searchData);
    router.replace(`${pathname}?${newUrl}`);
  };

  const onSearchData = (data: any) => {
    const newUrl = new URLSearchParams(window.location.search);
    if (data == "") {
      newUrl.delete("search");
    }
    router.replace(`${pathname}?${newUrl}`);
    setSearchData(data);
  };

  // ------------------------------
  const onRefreshDeleteRoute = () => {
    const newUrl = new URLSearchParams(window.location.search);
    if (searchData == "") {
      newUrl.delete("search");
    }
    router.replace(`${pathname}?${newUrl}`);
  };
  // ---------------------------

  const handleKeyPress = (event: any) => {
    if (event.key == "Enter") {
      setTimeout(() => {
        onSearch();
      }, 1000);
    }
  };

  // -------------------------------------

  const searchMedicines = medicines?.filter((item: any) =>
    item.medicineName.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    dispatch(AllApiHandler());
    setTimeout(() => {
      onRefreshDeleteRoute();
    }, 1000);
  }, []);
  return (
    <main className=" py-10">
      <section>
        <div className=" ">
          <h1 className="text-3xl max-md:text-2xl max-sm:text-xl font-bold text-center">
            {searchRoute.toUpperCase() || ""}
          </h1>

          <div className=" flex justify-center items-center mt-5 ">
            <div className=" bg-white relative flex items-center max-md:w-5/6 h-10 w-1/2 rounded-full overflow-hidden border border-base-300 ">
              <input
                onKeyPress={handleKeyPress}
                value={searchData}
                onChange={(e) => onSearchData(e.target.value)}
                type="text"
                name="search"
                id="search"
                placeholder=" Search"
                className=" bg-white  rounded-full  w-full h-full pl-5 outline-none text-black "
              />
              <button
                onClick={() =>
                  setTimeout(() => {
                    onSearch();
                  }, 1000)
                }
                className=" bg-slate-300 absolute right-0 h-full w-12 flex items-center justify-center hover:bg-slate-400 active:bg-slate-500 select-none"
              >
                <CiSearch className="w-5 h-5 text-white  " />
              </button>
            </div>
          </div>
          <div className=" flex items-center justify-center mt-10 max-md:mt-5 ">
            {
              medicines !== undefined ? (
                <>
                  {searchMedicines?.length !== 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                      {searchMedicines?.map((item: any, index: any) => (
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
                                className="drop-shadow-2xl object-cover w-full h-full"
                              />
                            </div>
                          </div>

                          <div className="">
                            <h2 className="text-2xl max-sm:text-base font-semibold text-center">
                              {item?.medicineName} {item?.medicinePotency}
                            </h2>
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
                              <Link
                                href={`/medicine/details/${item?._id}`}
                                className="  w-2/5 max-sm:w-1/2"
                              >
                                <button className=" btn btn-accent w-full ">
                                  details
                                </button>
                              </Link>
                            </div>

                            {/* ----------------------- */}
                            <div className=" mt-5">
                              <div className=" flex items-center justify-between max-sm:flex-col gap-3 max-sm:gap-5 ">
                                {/* ----------------------- */}

                                <LikeBtn item={item} />

                                {/* ---------------------------- */}
                                <CommentBtn item={item} />
                                {/* --------------------------------------- */}
                              </div>
                            </div>
                            {/* ------------- */}
                            <div className=" mt-5">
                              <CopyLinkBtn item={item} />
                            </div>
                            {/* ----------------------- */}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className=" h-screen">
                      <h2>Medicine not available!</h2>
                    </div>
                  )}
                </>
              ) : (
                // loading_part_start
                <div className=" h-[90vh]  flex items-center justify-center">
                  <div className="">
                    <span className="  loading loading-dots loading-lg  "></span>
                  </div>
                </div>
              )

              // loading_part_end
            }
          </div>
        </div>
      </section>
    </main>
  );
};

export default Skin_carePage;







