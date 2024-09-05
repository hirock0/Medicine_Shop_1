"use client"
import { useEffect,useState } from "react"
import React from "react"
import { useSelector,useDispatch } from "react-redux"
import { motion } from "framer-motion"
import Image from "next/image"
import { AllApiHandler } from "@/utils/redux/slices/slice"
interface Props{
    params:object | any
}
const Details:React.FC<Props> = ({params}) => {
    const id = params?.dets || ""
    const dispatch = useDispatch()
    const allMedicine = useSelector((state:any)=>state?.Slice?.data)
    const medicines =  allMedicine?.medicines
    const filterMedicine = medicines?.filter((item:any)=>item._id == id)

    useEffect(()=>{
      dispatch(AllApiHandler())
    },[])

    return (
        <main className=" py-10 ">
            <section className=" flex items-center justify-center">
              {
                filterMedicine !== undefined?(
        <div className=" ">
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
                        className=" drop-shadow-2xl object-cover w-full h-full"
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
                    <div className="mt-4 flex justify-center items-center ">
                    <button
                      className="btn btn-primary w-2/5 max-sm:w-1/2   "
                      
                    >
                      Buy Now
                    </button>
                    </div>
                    {/* ------------------- */}

                    <div className="mt-5">
                                <div className="">
                                    <h1 className=" text-start text-accent text-xl">Descriptions:</h1>
                                    <p className="mt-2 leading-8 ">{item?.descriptions}</p>
                                </div>
                                <div className=" mt-5">
                                    <h1 className=" text-start text-accent text-xl">Effect:</h1>
                                    <p className="mt-2 leading-8 ">{item?.effect}</p>
                                </div>
                                <div className=" mt-5">
                                    <h1 className=" text-start text-accent text-xl">Side Effect:</h1>
                                    <p className="mt-2 leading-8 ">{item?.sideEffect}</p>
                                </div>
                                <div className=" mt-5">
                                    <h1 className=" text-start text-accent text-xl">Doses:</h1>
                                    <p className="mt-2 leading-8 ">{item?.doses}</p>
                                </div>
                    </div>

                  </div>
                  

                </motion.div>
              ))}
        </div>
        ):(

          <div className=" h-[90vh]  flex items-center justify-center">
            <div className="">
             <span className="  loading loading-dots loading-lg  "></span>
          </div>
         </div>
        )
      }

        </section>
        </main>
    )
}

export default Details
