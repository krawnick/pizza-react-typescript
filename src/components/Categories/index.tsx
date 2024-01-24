import cn from 'classnames'
import { useSelector } from 'react-redux'

import { setCategoryId, selectorFilter } from '../../redux/slices/filterSlice'
import { useAppDispatch } from '../../redux/store'

import styles from './Categories.module.scss'

export interface ICategoriesProps {
  className: string
}

export const Categories = ({ className }: ICategoriesProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const { categoryState } = useSelector(selectorFilter)

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ]

  return (
    <div className={cn(className, styles.categories)}>
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              key={category}
              onClick={() => dispatch(setCategoryId(index))}
              className={categoryState === index ? styles.active : ''}
            >
              {category}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
