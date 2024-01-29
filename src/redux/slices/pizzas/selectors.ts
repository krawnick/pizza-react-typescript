import { RootState } from '../../store'

export const selectorPizzas = (state: RootState) => state.pizzas.items
export const selectorPizzasStatus = (state: RootState) => state.pizzas.status
