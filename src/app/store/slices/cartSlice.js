import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalPrice: 0
    },
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(
                item => item.id === action.payload.id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    ...action.payload,
                    // Ensure price is a number
                    price: Number(action.payload.price),
                    quantity: 1
                });
            }
            // Calculate total with proper number conversion
            state.totalPrice = state.items.reduce(
                (total, item) => total + (Number(item.price) * item.quantity),
                0
            );
        },
        removeItem: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload);
            if (index !== -1) {
                if (state.items[index].quantity > 1) {
                    state.items[index].quantity -= 1;
                } else {
                    state.items.splice(index, 1);
                }
            }
            // Recalculate total
            state.totalPrice = state.items.reduce(
                (total, item) => total + (Number(item.price) * item.quantity),
                0
            );
        },
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
        }
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;