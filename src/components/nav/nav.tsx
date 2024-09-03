"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TiAdjustBrightness } from "react-icons/ti";
import { motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { useSelector } from "react-redux";
const Nav = () => {
  const [themeFlag, setThemeFlag] = useState(false);
  const CartsData = useSelector((state: any) => state?.Slice.carts);
  const onTheme = () => {
    if (!themeFlag) {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  };

  useEffect(() => {
    onTheme();
  }, [themeFlag]);
  return (
    <nav className="  sticky top-0 z-50 border-b-2 h-20 flex items-center  backdrop:filter backdrop-blur-3xl">
      <section className=" ">
        <div className="navbar ">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className=""
            >
              <Link href={""} className=" text-xl max-sm:text-base">
                <span className=" text-warning">Roy</span> Homeopathy{" "}
                <span className=" text-warning">.</span>
              </Link>
            </motion.div>
          </div>
          <div className="flex-none">
            <div>
              <div>
                <Link href={"/admin/upload/medicine"}>admin</Link>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              {/* ---------------------------------- */}

              {/* ---------------------------------- */}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {CartsData?.length}
                  </span>
                </div>
              </div>
              {/* cart_start */}
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">
                    {CartsData?.length} Items
                  </span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
              {/* cart_end */}
            </div>
            {/* drop_down_profile_menu_start */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <Image
                    alt="Logo"
                    src="/logos/medicine_logo.jpg"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link href={"#"} className="">
                    <CgProfile
                      size={25}
                      className=" cursor-pointer select-none "
                    />
                    <div className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href={"#"}>
                    <CiSettings
                      size={25}
                      className=" cursor-pointer select-none "
                    />
                    <div className="">Settings</div>
                  </Link>
                </li>
                <li>
                  <div
                    onClick={() => setThemeFlag(!themeFlag)}
                    className=" w-full h-full"
                  >
                    <TiAdjustBrightness
                      size={25}
                      className=" cursor-pointer select-none "
                    />
                    <div className="">Theme</div>
                  </div>
                </li>
                <li>
                  <Link href={"#"}>
                    <IoIosLogOut
                      size={25}
                      className=" cursor-pointer select-none "
                    />
                    <div className="">Logout</div>
                  </Link>
                </li>
              </ul>
            </div>
            {/* drop_down_profile_end */}

            {/* ----------------- */}
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Nav;
