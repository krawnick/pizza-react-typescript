import { useEffect, useState } from 'react'

import { Button } from '..'
import { IPizzas } from '../../redux/slices/pizzas/types'

import styles from './FormUpdate.module.scss'

interface ICheckboxes {
  [index: string]: string[]
}

export const FormUpdate = () => {
  // const [checkForm, setCheckForm] = useState(false)
  const [data, setData] = useState<IPizzas[]>()
  const [selectData, setSelectData] = useState(0)
  console.log('selectData', selectData)

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL)
        const data = await res.json()
        setData(data)
        if (!res.ok) throw new Error('Ошибка загрузки')
      } catch (error) {
        alert(error)
      }
    }
    fetchPizzas()
  }, [])

  const [checkboxes, setCheckboxes] = useState<ICheckboxes>({
    types: [],
    sizes: [],
  })
  console.log('checkboxes', checkboxes)

  const handleSelectChange = (event) => {
    console.log(event.target)
    setSelectData(event.target.value)
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      checked,
      value,
    }: { name: string; checked: boolean; value: string } = event.target
    let arr: string[] = [...checkboxes[name]]

    if (checked) {
      arr.push(value)
    } else {
      arr = arr.filter((v) => {
        console.log('v', v)
        return v !== value
      })
    }

    setCheckboxes({
      ...checkboxes,
      [name]: arr.sort(),
    })
  }

  const [text, setText] = useState({
    name: '',
    price: '',
    rating: '',
    category: '',
  })

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setText({
      ...text,
      [name]: value,
    })
  }
  console.log('text', text)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  // const buildObject = () => {
  //   const types = []

  //   if ()

  //   return {
  //     types,
  //     sizes,
  //     name,
  //     price,
  //     rating,
  //     category,
  //   }
  // }

  // console.log('buildObject', buildObject())
  if (!data) {
    return 'Идет загрузка'
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formUpdate}>
      <h1>Обновление/добавление данных</h1>

      <label>
        <select onChange={handleSelectChange} value={selectData}>
          {data.map((el, index) => {
            return (
              <option value={index} key={el.id}>
                {el.name}
              </option>
            )
          })}
        </select>
      </label>

      <label className={styles.formUpdateText}>
        Название пиццы
        <input
          onChange={handleTextChange}
          name="name"
          type="text"
          value={data[selectData].name}
        />
      </label>
      <label className={styles.formUpdateText}>
        Цена за малый круг
        <input
          name="price"
          type="number"
          max="2000"
          value={data[selectData].price}
        />
      </label>
      <label className={styles.formUpdateText}>
        Категория
        <input name="category" type="text" value={data[selectData].category} />
      </label>
      <label className={styles.formUpdateText}>
        Рейтинг от 0 до 10
        <input
          name="rating"
          type="range"
          min="0"
          max="10"
          value={data[selectData].rating}
        />
      </label>
      <div className={styles.formUpdateCheckbox}>
        <p>Типы пиццы</p>
        <label>
          <input
            name="types"
            value="0"
            type="checkbox"
            onChange={handleCheckboxChange}
          />
          <span>Тонкое</span>
        </label>
        <label>
          <input
            name="types"
            value="1"
            type="checkbox"
            onChange={handleCheckboxChange}
          />
          <span>Традиционное</span>
        </label>
      </div>
      <div className={styles.formUpdateCheckbox}>
        <p>Размеры пиццы</p>
        <input
          name="sizes"
          type="checkbox"
          onChange={handleCheckboxChange}
          value="26"
        />
        <span>26</span>
        <input
          name="sizes"
          type="checkbox"
          onChange={handleCheckboxChange}
          value="30"
        />
        <span>30</span>
        <input
          name="sizes"
          type="checkbox"
          onChange={handleCheckboxChange}
          value="40"
        />
        <span>40</span>
      </div>

      <Button type="submit" appearance="default">
        Отправить
      </Button>
    </form>
  )
}
