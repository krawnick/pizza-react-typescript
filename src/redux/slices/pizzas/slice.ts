import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { IPizzaObject } from '../../../interface/Pizza.interface'
import { fetchParams } from '../../../utils/fetchParams'
import { RootState } from '../../store'

import { IPizzasState, StatusLoading } from './types'

export const fetchPizzas = createAsyncThunk<
  IPizzaObject[],
  void,
  { state: RootState }
>('pizzas/fetchPizzas', async (_, { getState }) => {
  return await fetch(
    import.meta.env.VITE_API_URL + '?' + fetchParams(getState())
  )
    .then((res) => {
      if (!res.ok) {
        if (res.url.includes('search' && 'sort')) {
          return []
        }
        throw new Error('Ошибка при получении всех данных')
      }
      return res.json()
    })

    .catch((error) => {
      alert(error)
      return []
    })
})

const initialState: IPizzasState = {
  items: [],
  status: StatusLoading.LOADING,
}

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    addPizza: (state, action: PayloadAction<IPizzaObject>) => {
      state.items.push(action.payload)
    },
    deletePizza: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((pizza) => {
        return action.payload !== Number(pizza.id)
      })
    },
    updatePizza: (state, action: PayloadAction<IPizzaObject>) => {
      state.items = state.items.map((item) => {
        return item.id === action.payload.id ? action.payload : item
      })
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchPizzas.pending, (state) => {
        state.items = []
        state.status = StatusLoading.LOADING
      })
      .addCase(
        fetchPizzas.fulfilled,
        (state, action: PayloadAction<IPizzaObject[]>) => {
          state.items = action.payload
          state.status = StatusLoading.SUCCESS
        }
      )
      .addCase(fetchPizzas.rejected, (state) => {
        state.items = []
        state.status = StatusLoading.ERROR
      })
  },
})

export const pizzasReducer = pizzasSlice.reducer
export const { addPizza, deletePizza, updatePizza } = pizzasSlice.actions
