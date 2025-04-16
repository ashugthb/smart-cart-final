// app/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: cartReducer,
        },
        devTools: process.env.NODE_ENV !== 'production',
    });
};