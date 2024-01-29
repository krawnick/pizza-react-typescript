import { IPizzaBlockProps } from '../../../components/PizzaBlock'

export interface IPizzas extends IPizzaBlockProps {
  rating: number
}
export enum StatusLoading {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IPizzasState {
  items: IPizzas[]
  status: StatusLoading
}
