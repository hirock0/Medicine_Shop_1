"use client";

import { AllApiHandler } from "@/utils/redux/slices/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "@/utils/redux/slices/slice";

interface Props {
  item: object | any;
}

const Carts: React.FC<Props> = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <button
      className="btn btn-primary w-2/5 max-sm:w-1/2   "
      onClick={() => dispatch(addCart(item))}
    >
      Add to Cart
    </button>
  );
};

export default Carts;
