import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async ({ category, sortBy, order, search, page }) => {
    const { data } = await axios.get(
      `https://6541fc13f0b8287df1ff3ff6.mockapi.io/pizzas?limit=4${page}${search}${category}${sortBy}${order}`
    )
    return data
  }
)

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
}

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  // reducers: {
  //   setItems: (state, { payload }) => {
  //     state.items = payload
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.items = []
        state.status = 'loading'
        console.log('pizasSlice:', state.status)
      })
      .addCase(fetchPizzas.fulfilled, (state, { payload }) => {
        state.items = payload
        state.status = 'success'
        console.log('pizasSlice:', state.status)
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.items = []
        state.status = 'error'
        console.log('pizasSlice:', state.status)
      })
  },
})

export const { setItems } = pizzasSlice.actions
export const pizzasReducer = pizzasSlice.reducer
