import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  paginationState: 1,
}

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage: (state, { payload }) => {
      state.paginationState = payload
    },
  },
})

export const paginationReducer = paginationSlice.reducer
export const { setPage } = paginationSlice.actions
