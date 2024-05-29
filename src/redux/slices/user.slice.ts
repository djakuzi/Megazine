import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";
import PREFIX from "../../helper/PREFIX";
import { loadState } from "../helper/storage";


export const JWT_PERSONAL = 'userToken'
export const USER_DATA = 'userData'

export interface Token{
    token: string | null;
}

export interface OrderItems{
    id: number;
    name: string;
    memory: string;
    count: number;
    price: number;
    image: string;
}

export interface Order{
    idOrder: number;
    idUser: number
    date: string;
    order: OrderItems[];
    calculator: {
        quantity: number, 
        price: number
    }
}

export interface Profile{
    id: number;
    nameUser: string
    email: string;
    orders: Order[];
}

export interface User{
    token: string | null;
    profile: Profile | null;
    errorLoginMessage?: string;
    errorRegiserMessage?: string;
    errorChangeMessage?: string;
    errorOrdersMessage?: string;
    
    
}


const initialState: User = {
    token: loadState<Token>(JWT_PERSONAL)?.token || null,
    profile: loadState<Profile>(USER_DATA) || null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addJwt(state, action:PayloadAction<string>){
            state.token = action.payload
        },
        logOut(state){
            state.token = null
            state.profile = null
        }
    },
    extraReducers(builder) {
        builder.addCase(axiosAuth.fulfilled, (state, action) =>{
            state.token = action.payload.token
            state.profile = action.payload.data
            state.errorLoginMessage = ''
        }),
        builder.addCase(axiosAuth.rejected, (state, action) =>{
            state.errorLoginMessage = action.error.message
           
        }),
        builder.addCase(axiosRegister.fulfilled, (state, action) =>{
            state.token = action.payload.token
            state.profile = action.payload.data
            state.errorLoginMessage = ''
        }),
        builder.addCase(axiosRegister.rejected, (state, action) =>{
            state.errorLoginMessage = action.error.message
           
        }),
        builder.addCase(axiosChangeProfile.fulfilled, (state, action) =>{
            if(state.profile != null && action.payload != null){
                state.profile.nameUser = action.payload.nameUser 
                state.profile.email = action.payload.email
            }
        
        })
        builder.addCase(axiosSendOrders.fulfilled, (state, action) =>{
            if(state.profile != null && action.payload != null){
                 state.profile.orders = action.payload
            }
           
        }),
        builder.addCase(axiosSendOrders.rejected, (state, action) =>{
            state.errorOrdersMessage = action.error.message
        })
            
    },
})

//   Async Thunk

export const axiosAuth = createAsyncThunk('user/axiosAuth', async (params: {email:string, password: string})=> {

    try {
        const {data} = await axios.post(PREFIX + '/auth', {
            email: params.email,
            password: params.password
        })
        console.log(data)
        return data
    } catch (e) {
        if(e instanceof AxiosError){
            throw new Error (e.response?.data.message);
        }
    }
    
}
)

export const axiosRegister = createAsyncThunk('user/axiosUser', async (params: {email:string, password: string, nameUser: string})=> {

    try {
        const {data} = await axios.post(PREFIX + '/register', {
            email: params.email,
            password: params.password,
            nameUser: params.nameUser,
            cart: [],
            orders:[]
        })

        return data
    } catch (e) {
        if(e instanceof AxiosError){
            throw new Error (e.response?.data.message);
        }
    }
    
}
)

export const axiosChangeProfile = createAsyncThunk('user/axiosGetProfile', async (params:{id: number, token?: string, email: string, password?: string, nameUser: string})=>{
    
    try {

        if(params.password){

            await axios.patch(PREFIX + '/users/' + params.id, {
                email: params.email,
                password: params.password,
                nameUser: params.nameUser,
            })
           
           
        } else {
            await axios.patch(PREFIX + '/users/' + params.id, {
                email: params.email,
                nameUser: params.nameUser,
            })

        }


         return {email: params.email, nameUser: params.nameUser}

    } catch (e) {
        if(e instanceof AxiosError){
            throw new Error (e.response?.data.message);
        }
    }

    
})

// export const axiosChangeCart  = createAsyncThunk('user/axiosChangeCart', async(params:{cart: CartDevices[], id: number})=>{
//     try {

//         await axios.patch(PREFIX + '/users/' + params.id, {
//             cart: params.cart
//         })
    
//          return params.cart

//     } catch (e) {
//         if(e instanceof AxiosError){
//             throw new Error (e.response?.data.message);
//         }
//     }
// })

export const axiosSendOrders = createAsyncThunk("user/axiosSendOrders", async(params:Order) =>{

    try {
        // const id = store.getState().user.profile?.id
        const {data} =  await axios.get<Profile>(PREFIX + '/users/' + params.idUser)
        const pastOrders = data.orders

        pastOrders.push(params)

        await axios.patch(PREFIX + '/users/' + params.idUser, {
            orders: pastOrders
        })

        return pastOrders
        
    } catch (e) {
         if(e instanceof AxiosError){
            throw new Error (e.response?.data.message);
        }
    }
    

})




export default userSlice.reducer
export const userActions = userSlice.actions