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

  const setCategory = (index) => {
    setActiveCategory(index)
  }

  return (
    <div className="categories">
      <ul>
        {
          categories.map((category, i) => {
            return (<li key={category} onClick={() => setCategory(i)} className={activeCategory === i ? 'active' : ''} >{category}</li>)
          })
        }
      </ul>
    </div>
  )
}
