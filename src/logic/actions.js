import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        productsAmz: [],
        productsMl: [],
        productsAlie: [],
    },
    reducers: {
        fetchAmzSuccess: (state, action) => {
            state.productsAmz = action.payload
        },
        fetchMlSuccess: (state, action) => {
            state.productsMl = action.payload
        },
        fetchAlieSuccess: (state, action) =>{
            state.productsAlie = action.payload
        }
    },
})

const store = configureStore({
    reducer: productsSlice.reducer,
})

export default store