"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TiAdjustBrightness } from "react-icons/ti";
import { motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { AllApiHandler } from "@/utils/redux/slices/slice";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
const Nav = () => {
  const NextAuthSession = useSession();

  const [themeFlag, setThemeFlag] = useState(false);
  const [cartsFlag, setCartsFlag] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const AllReqData = useSelector((state: any) => state?.Slice);
  const loggedUser = AllReqData?.data?.loggedUser;
  const CartsData = AllReqData?.data?.AllCarts;
  const total = CartsData?.reduce(
    (acc: any, item: any) => acc + Number(item.medicinePrice),
    0
  );

  const onTheme = () => {
    if (!themeFlag) {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  };
  const logOut = async () => {
    try {
      if (NextAuthSession?.status == "authenticated") {
        signOut({ redirect: true, callbackUrl: "/ " });
        toast.success("auth Logout successful!");
      } else {
        const logout = await axios.get("/pages/api/user/logout");
        if (logout?.data.success) {
          toast.success("Logout successful!");
          router.push("/");
          router.refresh();
        } else {
          toast.success("Logout not successful!");
        }
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const windowClickingEvent = () => {
    window.addEventListener("click", () => {
      setCartsFlag(false);
    });
  };

  useEffect(() => {
    dispatch(AllApiHandler());
    onTheme();
    windowClickingEvent();
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
                onClick={(e) => e.stopPropagation()}
              >
                <div className="card-body">
                  <span className="text-lg font-bold">
                    {CartsData?.length} Items
                  </span>
                  <span className="text-info">Subtotal: ${total}</span>
                  <div className="card-actions">
                    <button
                      onClick={(e) => setCartsFlag(!cartsFlag)}
                      className="btn btn-primary btn-block"
                    >
                      View cart
                    </button>
                  </div>
                </div>
                <div
                  className={`${
                    !cartsFlag ? "hidden" : "block"
                  } overflow-y-scroll p-2 h-96 `}
                >
                  <div className=" flex flex-col items-center gap-4">
                    {CartsData?.map((item: any, index: any) => (
                      <div
                        key={index}
                        className=" bg-base-300 flex flex-col items-center rounded-md p-2"
                      >
                        <Image
                          src={item?.medicineImage}
                          alt="img"
                          width={500}
                          height={500}
                        />
                        <h2 className=" text-center flex items-center gap-1">
                          {item?.medicineName}
                          <span>{item?.medicinePotency}</span>
                        </h2>
                        <div className=" flex items-center gap-2 w-full mt-2">
                          <Link
                            href={`/medicine/details/${item?.medicineId}`}
                            className=" w-full  "
                          >
                            <button className=" bg-accent w-full rounded-md text-xs py-2 ">
                              details
                            </button>
                          </Link>
                          <button className=" w-full bg-warning rounded-md text-xs py-2  ">
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
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
                className="btn btn-ghost btn-circle "
              >
                {loggedUser ? (
                  <div
                    className={` w-10 flex items-center justify-center relative rounded-full`}
                  >
                    <div className=" loading loading-ring loading-lg"></div>
                    <Image
                      alt="Logo"
                      src={loggedUser?.userImageUrl.toString()}
                      width={500}
                      height={500}
                      className=" w-5 h-5 absolute rounded-full"
                    />
                  </div>
                ) : (
                  <div className="">login</div>
                )}
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
                {!loggedUser ? (
                  <li>
                    <Link href={"/user/login"}>
                      <CiLogin
                        size={25}
                        className=" cursor-pointer select-none "
                      />
                      <div className="">Login</div>
                    </Link>
                  </li>
                ) : null}
                {loggedUser ? (
                  <li
                    onClick={() => {
                      logOut();
                    }}
                  >
                    <button>
                      <IoIosLogOut size={25} className=" " />
                      <div className="">Logout</div>
                    </button>
                  </li>
                ) : null}
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
