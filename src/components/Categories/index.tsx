import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryId } from '../../redux/slices/filterSlice'
import cn from 'classnames'
import styles from './Categories.module.scss'

export const Categories = ({ className }) => {
  const dispatch = useDispatch()

  const categoryState = useSelector((state) => state.filter.categoryState)
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
