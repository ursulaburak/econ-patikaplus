import { configureStore } from "@reduxjs/toolkit";

import spendSlice from "./spend/spendSlice";

export const store = configureStore({
    reducer: {
        spend: spendSlice,
    },
});