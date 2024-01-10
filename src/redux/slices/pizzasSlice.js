import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async ({ category, sortBy, order, search, page }) => {
    const { data } = await axios.get(
      `https://6541fc13f0b8287df1ff3ff6.mockapi.io/pizzas?limit=4${page}${search}${category}${sortBy}${order}`
    )
    console.lof(123)
    return data
  }
)

const initialState = {
  items: [],
}

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems: (state, { payload }) => {
      state.items = payload
    },
  },
})

export const { setItems } = pizzasSlice.actions
export const pizzasReducer = pizzasSlice.reducer
