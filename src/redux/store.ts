import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/category.slice";
import cartReducer, {CART_DATA } from "./slices/cart.slice";
import userReducer, { Token, JWT_PERSONAL, Profile, USER_DATA } from "./slices/user.slice";
import { saveState } from "./helper/storage";



export const store = configureStore({
    reducer: {
        category: categoryReducer,
        cart: cartReducer,
        user: userReducer
    }
})


store.subscribe( () =>{
    saveState<Token>(JWT_PERSONAL, {token: store.getState().user.token}) 
    saveState<Profile>(USER_DATA, store.getState().user.profile as Profile )
    saveState(CART_DATA, store.getState().cart.cartDevices)
    
    console.log(store.getState().user)
})
// store.getState().user.profile

// {
//         id: store.getState().user?.profile?.id,
//         nameUser: store.getState().user?.profile.nameUser,
//         email: store.getState().user?.profile?.email,
//         cart: store.getState().user?.profile?.cart,
//         orders: store.getState().user?.profile?.orders
//     } 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


