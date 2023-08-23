import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../src/screens/Home";

export interface IProductInfo {
  product: Product;
  condition: boolean;
}

export const initialState: IProductInfo = {
  product: {},
  condition: false,
};

export const productSlice = createSlice({
  name: "productInfo",
  initialState: initialState as IProductInfo,
  reducers: {
    setProduct: (state, action: PayloadAction<Product>) => {
        state.product = action.payload
      },
    toggleCondition: (state) => {
        state.condition = !state.condition;
      },

  },
});