import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

import { setCategoryId, selectorFilter } from '../../redux/slices/filterSlice'

import styles from './Categories.module.scss'
import { ICategoriesProps } from './Categories.props'

export const Categories = ({ className }: ICategoriesProps): JSX.Element => {
  const dispatch = useDispatch()
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
