import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    isAddItem: false,
    isUpdateItem: false,
    shipping: {},
    payment: {},
    customer: {},
    cartOrders: [],
    makeOrders: {},
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.product === action.payload.product
      );
      if (itemInCart) {
        itemInCart.quantity = action.payload.quantity;
        itemInCart.total = itemInCart.quantity * itemInCart.price;
        state.isAddItem = false;
        state.isUpdateItem = true;
      } else {
        state.cart.push(action.payload);
        state.isAddItem = true;
        state.isUpdateItem = false;
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.product !== action.payload
      );
      state.cart = removeItem;
    },

    addShipping: (state, action) => {
      state.shipping = action.payload;
    },
    resetShipping: (state) => {
      state.shipping = {};
    },
    addPayment: (state, action) => {
      state.payment = action.payload;
    },
    resetPayment: (state) => {
      state.payment = {};
    },

    addCustomer: (state, action) => {
      state.customer = action.payload;
    },

    addOrders: (state, action) => {
      state.cartOrders.push(action.payload);
    },
    addMakeOrders: (state, action) => {
      state.makeOrders = action.payload;
      state.cart = [];
      state.shipping = {};
      state.payment = {};
      state.customer = {};
    },
  },
});
export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  addShipping,
  resetShipping,
  addPayment,
  resetPayment,
  addCustomer,
  addOrders,
  addMakeOrders,
} = cartSlice.actions;
