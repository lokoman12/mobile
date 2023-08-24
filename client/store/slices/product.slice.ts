import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../src/screens/Home";

export interface IProductInfo {
  product: Product;
  condition: boolean;
  cartProduct: Array<Product>;
  favoriteProduct: Array<Product>;
}

export const initialState: IProductInfo = {
  product: {},
  condition: false,
  cartProduct: [],
  favoriteProduct: [],
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
    setCartProduct: (state, action: PayloadAction<Product>) => {
      state.cartProduct.push(action.payload);
    }, 
    setFavoriteProduct: (state, action: PayloadAction<Product>) => {
      state.favoriteProduct.push(action.payload);
    },   
  },
});