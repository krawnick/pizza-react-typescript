import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: { searchState: 'пепперон' },
  reducers: {
    setValueSearch: (state, { payload }) => {
      state.searchState = payload
    },
    clearValueSearch: (state) => (state.searchState = initialState),
  },
})

export const searchReducer = searchSlice.reducer
export const { setValueSearch, clearValueSearch } = searchSlice.actions
