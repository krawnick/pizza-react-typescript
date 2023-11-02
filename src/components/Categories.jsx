import React from 'react'

export const Categories = ({ value, onChangeCategory }) => {

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ]

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => {
          return (
            <li
              key={category}
              onClick={() => onChangeCategory(i)}
              className={value === i ? 'active' : ''}
            >
              {category}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
