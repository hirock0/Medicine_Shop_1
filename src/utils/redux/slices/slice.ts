"use client";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type InitialState = {
  data: any;
  carts: any;
  isLoading: boolean;
  isError: boolean;
};

const initialState: InitialState = {
  data: [],
  carts: [],
  isLoading: false,
  isError: false,
};

export const AllApiHandler: any = createAsyncThunk(
  "AllApiHandler",
  async (data: any) => {
    try {
      const reqMedicines = await axios.get("/pages/api/upload");
      const loggedData = await axios.get("/pages/api/user/userToken");
      const loggedUser = loggedData?.data?.findUser;
      const medicines = reqMedicines?.data?.allMedicinesData;
      return { medicines, loggedUser };
    } catch (error: any) {
      return null;
    }
  }
);

export const Slice = createSlice({
  name: "Slice",
  initialState,
  reducers: {
    addMedicine: (state: any, action: PayloadAction<any>) => {
      const MedicineData = action.payload;
      state?.data.medicines.push(MedicineData);
    },
    deleteMedicine: (state: any, action: PayloadAction<any>) => {
      state.data.medicines = state?.data.medicines.filter(
        (item: any) => item?.image_public_id !== action.payload
      );
    },
    addCart: (state: any, action: PayloadAction<any>) => {
      const Cart = action.payload;
      state?.carts.push(Cart);
    },
    deleteCart: (state: any, action: PayloadAction<any>) => {},
  },

  extraReducers(builder) {
    builder.addCase(
      AllApiHandler.pending,
      (state: any, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    ),
      builder.addCase(
        AllApiHandler.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      ),
      builder.addCase(
        AllApiHandler.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.isError = true;
        }
      );
  },
});
export const { addMedicine, deleteMedicine, addCart, deleteCart } =
  Slice.actions;
export default Slice.reducer;
