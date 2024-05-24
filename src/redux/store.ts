import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/category.slice";
import cartReducer from "./slices/cart.slice";


export const store = configureStore({
    reducer: {
        category: categoryReducer,
        cart: cartReducer
    }
})


store.subscribe( () =>{
    console.log(store.getState().cart)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


