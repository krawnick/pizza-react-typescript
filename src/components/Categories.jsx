import React from 'react'

export const Categories = () => {
  const [activeCategory, setActiveCategory] = React.useState(0)

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
              onClick={() => setActiveCategory(i)}
              className={activeCategory === i ? 'active' : ''}
            >
              {category}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
