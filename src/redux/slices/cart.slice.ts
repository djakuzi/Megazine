import { createSlice, PayloadAction } from "@reduxjs/toolkit";




export interface CartDevices{
    id: number;
    memory: string;
    count: number;
}

interface arrCartDevices{
    cartDevices: CartDevices[]
}


const initialState: arrCartDevices ={
    cartDevices: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add( state, action: PayloadAction<{id: number; memory: string}>){
            
            const res = state.cartDevices.find( (el) => el.id === action.payload.id && el.memory === action.payload.memory)

            if(!res) state.cartDevices.push({id: action.payload.id, memory: action.payload.memory,count: 1}) 
            if (res) state.cartDevices.map((el) => (el.id === action.payload.id && el.memory === action.payload.memory) ? el.count += 1: el)

        }
    }
})


export default cartSlice.reducer
export const cartActions = cartSlice.actions