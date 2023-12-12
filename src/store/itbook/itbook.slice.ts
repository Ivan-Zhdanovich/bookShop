import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const LS_FAV_KEY = 'rfk'

interface ItbookState {
    favourites: string[]
}

const initialState:  ItbookState = {
    favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]')
}

export const itbookSlice = createSlice( {
    name: 'itbook',
    initialState,
    reducers: {
        addFavourite(state, action: PayloadAction<string>) {
            state.favourites.push(action.payload)
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites))
        },
        removeFavourite(state, action: PayloadAction<string>) {
            state.favourites = state.favourites.filter(f => f !== action.payload)
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites))
        },
    }
})

export const itbookActions = itbookSlice.actions
export const itbookReducer = itbookSlice.reducer