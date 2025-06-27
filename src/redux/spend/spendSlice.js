import { createSlice } from "@reduxjs/toolkit";
import productListData from '../../products.json'

export const spendSlice = createSlice({
    name: 'spend',
    initialState: {
        value: 100000000000,
        items: productListData.items,
        purchasedProducts: [],

    },
    reducers: {
        buy: (state, action) => {
            const { itemId} = action.payload;
            const product = state.items.find(item => item.id === itemId);
            state.value -= product.price;
            product.piece += 1;
        },
      
        sell: (state, action) => {
            const { itemId} = action.payload;
            const product = state.items.find(item => item.id === itemId);
            state.value += product.price
            product.piece -= 1;
    
        },
        updateTotalPrice: (state, action) => {
            const { itemId, quantity } = action.payload;
            const product = state.items.find(item => item.id === itemId);
            
            if (product && quantity > 0) {
              const totalPrice = product.price * quantity;
              if (totalPrice <= state.value) {
                state.value -= totalPrice;
                product.piece += quantity;
                state.purchasedProducts.push({ itemId, quantity });
              } else {
                console.log("Yetersiz bakiye");
              }
            }
        },
        updateInput: (state, action) => {
          const { itemId, quantity } = action.payload;
          const product = state.items.find(item => item.id === itemId);
          
          if (product && quantity > 0) {
            const totalPrice = product.price * quantity;
            if (totalPrice <= state.value) {
              state.value += totalPrice;
              product.piece += quantity;
              state.purchasedProducts.push({ itemId, quantity });
            } else {
              console.log("Yetersiz bakiye");
            }
          }
      },

    },
});

export const productList = (state) => state.spend.items

export const { buy, sell, updateTotalPrice, updateInput } = spendSlice.actions;
export default spendSlice.reducer;