import cn from 'classnames'
import { memo } from 'react'

import { setCategoryId } from '../../redux/slices/filter/slice'
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
    return nextProps.value !== prevProps.value ? false : true
  }
)
