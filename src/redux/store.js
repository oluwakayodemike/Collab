import { configureStore } from "@reduxjs/toolkit/";
import HomeReducer from "./HomeSlice";

export const store = configureStore({
    reducer:{
        home: HomeReducer
    }
})