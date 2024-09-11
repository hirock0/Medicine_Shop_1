"use client";
import { AllApiHandler } from "@/utils/redux/slices/slice";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "@/utils/redux/slices/slice";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  item: object | any;
}

const Carts: React.FC<Props> = ({ item }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const reqApi = useSelector((state: any) => state?.Slice);
  const loggedUser = reqApi?.data.loggedUser;

  const CartsData = {
    medicineImage: item?.medicineImage,
    medicineId: item?._id,
    userId: loggedUser?._id,
    medicineName: item?.medicineName,
    medicinePotency: item?.medicinePotency,
    medicinePrice: item?.medicinePrice,
    recentDate: new Date().toLocaleDateString(),
  };

  const onCarts = async () => {
    try {
      const response = await axios.post("/pages/api/carts", CartsData);
      if (response?.data.success) {
        toast.success("You have added medicine to cart.");
      } else {
        toast.success("something went wrong!");
      }
    } catch (error: any) {
      throw new Error(error);
    }
    dispatch(AllApiHandler());
  };

  return (
    <>
      {loggedUser !== undefined ? (
        <button
          className="btn btn-primary w-2/5 max-sm:w-1/2   "
          onClick={() => {
            onCarts(), dispatch(addCart(CartsData));
          }}
        >
          Add to Cart
        </button>
      ) : (
        <button
          className="btn btn-primary w-2/5 max-sm:w-1/2   "
          onClick={() => {
            toast.success("Please login first"),
              setTimeout(() => {
                router.push("/user/login");
              }, 1000);
          }}
        >
          Add to Cart
        </button>
      )}
    </>
  );
};

export default Carts;
