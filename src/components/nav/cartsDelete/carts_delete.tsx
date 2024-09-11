"use client";

import { deleteCart } from "@/utils/redux/slices/slice";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
interface Props {
  itemId: string;
}

const Carts_delete: React.FC<Props> = ({ itemId }) => {
  const dispatch = useDispatch();

  const onCartsDelete = async () => {
    try {
      const deleteCart = await axios.get(`/pages/api/carts/${itemId}`);
      if (deleteCart?.data.success) {
        toast.success("Cart medicine deleted!");
      } else {
        toast.success("something went wrong!");
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <button
      onClick={() => {
        onCartsDelete(), dispatch(deleteCart(itemId));
      }}
      className=" w-full bg-warning rounded-md text-xs py-2  "
    >
      Delete
    </button>
  );
};

export default Carts_delete;
