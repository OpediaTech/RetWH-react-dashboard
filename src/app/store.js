import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { cartReducer } from "./features/cartSlice";
import { cartsApi } from "./services/cartsApi";
import { dashboardApi } from "./services/dashboardApi";
import { departmentsApi } from "./services/departmentsApi";
import { posApi } from "./services/posApi";
import { productsApi } from "./services/productsApi";
import { reportsApi } from "./services/reportsApi";
import { requestsApi } from "./services/requestApi";
import { shopsApi } from "./services/shopsApi";
import { usersApi } from "./services/usersApi";

// store configure
export const store = configureStore({
  // reducers
  reducer: {
    [shopsApi.reducerPath]: shopsApi.reducer,
    [departmentsApi.reducerPath]: departmentsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [reportsApi.reducerPath]: reportsApi.reducer,
    [cartsApi.reducerPath]: cartsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [requestsApi.reducerPath]: requestsApi.reducer,
    [posApi.reducerPath]: posApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,

    auth: authReducer,
    cart: cartReducer,
  },

  // middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      shopsApi.middleware,
      departmentsApi.middleware,
      productsApi.middleware,
      reportsApi.middleware,
      cartsApi.middleware,
      usersApi.middleware,
      requestsApi.middleware,
      posApi.middleware,
      dashboardApi.middleware,
    ]),
});
