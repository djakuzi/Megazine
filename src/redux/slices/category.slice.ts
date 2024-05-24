import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface CategoryState{
    id: number;
    title: string[];

}

const initialState: CategoryState = {
    id: 0,
    title: ['Все девайсы', 'Айфоны', "Макбуки"]
}


export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        changeCategory: (state, action: PayloadAction<number>) => {
           state.id = action.payload
        }
    }
})


export default categorySlice.reducer
export const cartActions = categorySlice.actions

