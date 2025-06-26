import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import uiReducer from "./slices/uiSlice";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
    ui: uiReducer,
  },
});

function StoreProvider(props) {
  return <Provider store={store}>{props.children}</Provider>;
}

export default StoreProvider;
