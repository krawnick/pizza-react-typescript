import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchState: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setValueSearch: (state, { payload }) => {
      state.searchState = payload
    },
    clearValueSearch: () => initialState,
  },
})

export const searchReducer = searchSlice.reducer
export const { setValueSearch, clearValueSearch } = searchSlice.actions
