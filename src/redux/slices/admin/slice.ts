import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { IPizzaObject } from '../../../interface/Pizza.interface'
import { deletePizza } from '../pizzas/slice'
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

export const deleteItem = createAsyncThunk<void, number>(
  'admin/deleteItem',
  async (id, { dispatch }) => {
    return await fetch(import.meta.env.VITE_API_URL + '/' + id, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Ошибка при удалении данных')
      })
      .then(() => {
        dispatch(deletePizza(id))
      })
      .catch((error) => {
        alert(error)
      })
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
        state.status = StatusLoading.LOADING
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
  },
})

export const adminReducer = adminSlice.reducer
