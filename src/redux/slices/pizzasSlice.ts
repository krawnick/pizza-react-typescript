import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { RootState } from '../store'

type THomeProps = {
  category: string
  sortBy: string
  order: string
  search: string
  page: string
}

interface IItemPizza {
  id: string
  price: number
  imageUrl: string
  name: string
  sizes: number[]
  types: number[]
  rating: number
}

interface IPizzasState {
  items: IItemPizza[]
  status: 'loading' | 'success' | 'error'
}

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',

  async ({ category, sortBy, order, search, page }: THomeProps, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `https://6541fc13f0b8287df1ff3ff6.mockapi.io/pizzas?limit=4${page}${search}${category}${sortBy}${order}`
      )

      if (data.length === 0) {
        return thunkAPI.rejectWithValue('Not pizzas')
      }

      return data
    } catch (error) {
      console.log('error', error)
      return []
    }
  }
)

const initialState: IPizzasState = {
  items: [],
  status: 'loading', // loading | success | error
}

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.items = []
        state.status = 'loading'
        console.log('pizzasSlice:', state.status)
      })
      .addCase(fetchPizzas.fulfilled, (state, { payload }) => {
        state.items = payload
        state.status = 'success'
        console.log('pizzasSlice:', state.status)
      })
      .addCase(fetchPizzas.rejected, (state, { payload }) => {
        state.items = []
        state.status = 'error'
        console.log('pizzasSlice:', payload)
      })
  },
})

// Actions, reducer

export const { setItems } = pizzasSlice.actions
export const pizzasReducer = pizzasSlice.reducer

// Selectors

export const selectorPizzas = (state: RootState) => state.pizzas
