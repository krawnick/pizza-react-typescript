import cn from 'classnames'
import { memo } from 'react'

import { setCategoryId } from '../../redux/slices/filterSlice'
import { useAppDispatch } from '../../redux/store'

import styles from './Categories.module.scss'

export interface ICategoriesProps {
  className: string
  value: number
}

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
]

export const Categories = memo(
  ({ className, value }: ICategoriesProps): JSX.Element => {
    console.log('render Categories')
    const dispatch = useAppDispatch()

    return (
      <div className={cn(className, styles.categories)}>
        <ul>
          {categories.map((category, index) => {
            return (
              <li
                key={category}
                onClick={() => dispatch(setCategoryId(index))}
                className={value === index ? styles.active : ''}
              >
                {category}
              </li>
            )
          })}
        </ul>
      </div>
    )
  },
  (prevProps, nextProps) => {
    if (nextProps.value !== prevProps.value) {
      return false
    } else {
      return true
    }
  }
)
