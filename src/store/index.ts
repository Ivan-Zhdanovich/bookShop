import { configureStore } from "@reduxjs/toolkit";
import { itbookApi } from "./itbook/itbook.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { itbookReducer } from "./itbook/itbook.slice";

export const store = configureStore ({
    reducer: {
       [itbookApi.reducerPath]: itbookApi.reducer,
       itbook: itbookReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(itbookApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>