"use client"
import Style from './home.module.css'
import { motion } from "framer-motion"
import Image from 'next/image';
import Link from 'next/link';
import { useState,useEffect } from 'react'

const categories = [
    { name: "Respiratory", image: "/categories/respiratory-system.jpg",linkRoute:`/medicine/categories/respiratory/?q=respiratory` },
    { name: "Digestive", image: "/categories/Digestive.jpg", linkRoute:"/medicine/categories/digestive/?q=digestive" },
    { name: "Skin Care", image: "/categories/skin_care_1.jpg",linkRoute:"/medicine/categories/skin_care/?q=skinCare" },
    { name: "Allergy", image: "/categories/Alergies.jpg",linkRoute:"/medicine/categories/allergy/?q=allergy" },
    { name: "Pain Relief", image:"/categories/back_pain.jpg",linkRoute:"/medicine/categories/pain_relief/?q=painRelief" },
    { name: "Immunity Boosters", image: "/categories/immunity_booster.png",linkRoute:"/medicine/categories/immunity_booster/?q=immunityBoosters" },
  ];

const HomePage = () => {
    const [search, setSearch] = useState("");

    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div className="">
                <div className=" mt-10 flex justify-center items-center">
                    <div className={`${Style.textAnimation} relative overflow-hidden w-fit`}>
                        <h1 className=''>Welcome to our shop</h1>
                     </div>
                </div>


                <div className=" mt-10 max-md:mt-5">

                 {/* Hero div */}
                    <motion.div
                        className=" text-center "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-extrabold text-primary mb-6 max-md:text-3xl">
                        Explore Our Medicine Categories
                        </h2>
                        <p className="text-lg text-warning mb-8 ">
                        Discover various homeopathic categories tailored to your needs.
                        </p>
                        <input
                        type="text"
                        placeholder="Search categories..."
                        className="input input-bordered w-full max-w-md mb-6"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        />
                    </motion.div>

                 {/* Category Cards div */}
                <motion.div
                    className=" md:my-10 mb-10"
                    initial="initial"
                    animate="animate"
                >
                    <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={{
                        initial: {},
                        animate: { transition: { staggerChildren: 0.2 } },
                    }}
                    >
                    {filteredCategories.map((category, index) => (
                        <motion.div
                        key={index}
                        className="card bg-base-100 shadow-xl transform hover:scale-105 transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        variants={{
                            initial: { opacity: 0, y: 20 },
                            animate: { opacity: 1, y: 0 },
                        }}
                        >
                        <figure className=' '>
                            <Image
                            src={category.image}
                            alt={category.name}
                            priority
                            width={500}
                            height={500}
                            className="  w-full object-cover md:h-[500px]"
                            />
                        </figure>
                        <div className="card-body">
                            <h3 className="card-title">{category.name}</h3>
                            <p>
                            Explore our {category.name} category for the best natural
                            remedies.
                            </p>
                            <Link href={category?.linkRoute} className="btn btn-primary btn-sm">
                                <button className=" w-full h-full">
                                    View Products
                                </button>
                            </Link>
                        </div>
                        </motion.div>
                    ))}
                    </motion.div>
                </motion.div>
            </div>

        </div>
    )
}

export default HomePage
