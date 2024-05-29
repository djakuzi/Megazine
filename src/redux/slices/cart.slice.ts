import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "../helper/storage";


export const CART_DATA = 'cartData'


export interface CartDevices{
    id: number;
    memory: string;
    count: number;
}

export interface arrCartDevices{
    cartDevices: CartDevices[]
}




const initialState: arrCartDevices = {
    cartDevices: loadState<CartDevices[]>(CART_DATA) ?? []
}



export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add( state, action: PayloadAction<{id: number; memory: string}>){
            
            const res = state.cartDevices.find( (el) => el.id === action.payload.id && el.memory === action.payload.memory)

            if(!res) state.cartDevices.push({id: action.payload.id, memory: action.payload.memory,count: 1}) 
            if (res) state.cartDevices.map((el) => (el.id === action.payload.id && el.memory === action.payload.memory) ? el.count += 1: el)

        },

        decrease(state, action: PayloadAction<{id: number; memory: string}>){

            const count = state.cartDevices.filter( (el) => el.id === action.payload.id && el.memory === action.payload.memory)[0]

            if (count.count > 1) {
                state.cartDevices.map((el) => (el.id === action.payload.id && el.memory === action.payload.memory) ? el.count -= 1: el)
                return
            }
            state.cartDevices = state.cartDevices.filter( el => el.id !== action.payload.id || el.memory !== action.payload.memory)

        },

        increase(state, action: PayloadAction<{id: number; memory: string}>){
            state.cartDevices.map( el => (el.id === action.payload.id && el.memory === action.payload.memory) ? el.count += 1: el)
        },

        clear(state){
            state.cartDevices = []
        },

        delete(state, action: PayloadAction<{id: number; memory: string}>){

            state.cartDevices = state.cartDevices.filter( el => el.id !== action.payload.id || el.memory !== action.payload.memory)

        }
    }
})

// state.cartDevices = state.cartDevices.filter( el => el.id !== action.payload.id && el.memory !== action.payload.memory)


export default cartSlice.reducer
export const cartActions = cartSlice.actions