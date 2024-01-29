import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { IPizzas, IPizzasState, StatusLoading } from './types'

export const fetchPizzas = createAsyncThunk<IPizzas[], Record<string, string>>(
  'pizzas/fetchPizzas',

  async ({ category, sortBy, order, search, page }, thunkAPI) => {
    try {
      const { data } = await axios.get<IPizzas[]>(
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
  status: StatusLoading.LOADING,
}

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.items = []
        state.status = StatusLoading.LOADING
        console.log('pizzasSlice:', state.status)
      })
      .addCase(
        fetchPizzas.fulfilled,
        (state, action: PayloadAction<IPizzas[]>) => {
          state.items = action.payload
          state.status = StatusLoading.SUCCESS
          console.log('pizzasSlice:', state.status)
        }
      )
      .addCase(fetchPizzas.rejected, (state, { payload }) => {
        state.items = []
        state.status = StatusLoading.ERROR
        console.log('pizzasSlice:', payload)
      })
  },
})

// Actions, reducer

export const pizzasReducer = pizzasSlice.reducer

// Selectors