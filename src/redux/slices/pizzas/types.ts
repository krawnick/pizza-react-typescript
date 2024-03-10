import { IPizzaObject } from '../../../interface/Pizza.interface'

export enum StatusLoading {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IPizzasState {
  items: IPizzaObject[]
  status: StatusLoading
}
