import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
} from '@reduxjs/toolkit'

import { IPizzaObject } from '../../../interface/Pizza.interface'
import { addPizza, deletePizza, updatePizza } from '../pizzas/slice'
import { IPizzasState, StatusLoading } from '../pizzas/types'

export const getAllData = createAsyncThunk('admin/getAllData', async () => {
  return await fetch(import.meta.env.VITE_API_URL)
    .then((res) => {
      if (!res.ok) throw new Error('Ошибка при загрузке всех данных')
      return res.json()
    })
    .catch((error) => {
      alert(error)
      return []
    })
})

export const addItems = createAsyncThunk<void, IPizzaObject[]>(
  'admin/addItems',
  async (items, { dispatch }) => {
    return await new Promise((resolve) => {
      items.forEach(async (item, index) => {
        setTimeout(async () => {
          await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(item),
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error('Ошибка при добавлении продукта')
              }
              dispatch(addPizza(item))
              if (items.length - 1 === index) resolve()
            })
            .catch((error) => alert(error))
        }, index * 1000)
      })
    })
  }
)

export const deleteItems = createAsyncThunk<void, number[]>(
  'admin/deleteItems',
  async (ids, { dispatch }) => {
    return await new Promise((resolve) => {
      return ids.map((id, index) => {
        setTimeout(() => {
          fetch(import.meta.env.VITE_API_URL + '/' + id, { method: 'DELETE' })
            .then((res) => {
              if (!res.ok) throw new Error('Ошибка при удалении продукта')
              dispatch(deletePizza(id))
              if (index === ids.length - 1) resolve()
            })
            .catch((error) => {
              alert(error)
            })
        }, index * 1000)
      })
    })
  }
)

export const updateItem = createAsyncThunk<void, IPizzaObject>(
  'admin/updateItem',
  async (item, { dispatch }) => {
    fetch(import.meta.env.VITE_API_URL + '/' + item.id, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(item),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Ошибка при обновлении продукта')
        }
        dispatch(updatePizza(item))
      })
      .catch((error) => alert(error))
  }
)

const initialState: IPizzasState = {
  items: [],
  status: StatusLoading.LOADING,
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.pending, (state) => {
        state.items = []
        // state.status = StatusLoading.LOADING
      })
      .addCase(
        getAllData.fulfilled,
        (state, action: PayloadAction<IPizzaObject[]>) => {
          state.items = action.payload
        }
      )
      .addCase(getAllData.rejected, (state) => {
        state.status = StatusLoading.ERROR
        state.items = []
      })
      .addMatcher(isPending, (state) => {
        state.status = StatusLoading.LOADING
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = StatusLoading.SUCCESS
      })
  },
})

export const adminReducer = adminSlice.reducer
