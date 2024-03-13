import { useEffect, useState } from 'react'

import { Button } from '..'
import { IPizzaObject } from '../../interface/Pizza.interface'
import { deleteItems, updateItem } from '../../redux/slices/admin/slice'
import { useAppDispatch } from '../../redux/store'

import styles from './FormUpdate.module.scss'

interface IFormUpdateProps {
  data: IPizzaObject[]
  setOpen: () => void
}
type TName = 'types' | 'sizes'

export const FormUpdate = ({ data }: IFormUpdateProps) => {
  const dispatch = useAppDispatch()

  const [selectData, setSelectData] = useState(0)
  const [checkboxes, setCheckboxes] = useState<
    Pick<IPizzaObject, 'sizes' | 'types'>
  >({
    types: [],
    sizes: [],
  })
  const [input, setInput] = useState<
    Omit<IPizzaObject, 'sizes' | 'types' | 'id'>
  >({
    name: '',
    price: 0,
    rating: 0,
    description: '',
    imageUrl: '',
    category: 0,
  })

  const refreshForm = (data: IPizzaObject[]) => {
    if (data) {
      setInput({
        name: data[selectData].name,
        price: data[selectData].price,
        description: data[selectData].description.toString(),
        rating: data[selectData].rating,
        imageUrl: data[selectData].imageUrl.toString(),
        category: data[selectData].category,
      })
      setCheckboxes({
        types: data[selectData].types,
        sizes: data[selectData].sizes,
      })
    }
  }

  useEffect(() => {
    if (data) refreshForm(data)
  }, [selectData])

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectData(Number(event.target.value))
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInput({
      ...input,
      [name]: value,
    })
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = event.target

    checked
      ? checkboxes[name as TName].push(Number(value))
      : (checkboxes[name as TName] = checkboxes[name as TName].filter(
          (v) => v !== Number(value)
        ))

    setCheckboxes({
      ...checkboxes,
      [name]: [...checkboxes[name as TName]].sort(),
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    dispatch(
      updateItem({
        id: data[selectData].id.toString(),
        ...checkboxes,
        ...input,
      })
    )
  }

  const deletePizza = () => {
    dispatch(deleteItems([Number(data[selectData].id)]))
  }

  if (!data) {
    return 'Идет загрузка...'
  }

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(event) => {
        if (event.code === 'Enter') event.preventDefault()
      }}
      className={styles.formUpdate}
    >
      <h1>Обновление данных</h1>

      <label>
        Выберите пиццу для редактирования
        <select
          className={styles.formUpdateSelectPizza}
          onChange={handleSelectChange}
          value={selectData}
        >
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
          onChange={handleInputChange}
          name="name"
          type="text"
          value={input.name}
        />
      </label>
      <label className={styles.formUpdateText}>
        Цена за малый круг
        <input
          onChange={handleInputChange}
          name="price"
          type="number"
          max="2000"
          value={input.price}
        />
      </label>
      <label className={styles.formUpdateText}>
        Категория
        <input
          onChange={handleInputChange}
          name="category"
          type="text"
          value={input.category}
        />
      </label>
      <label className={styles.formUpdateText}>
        {`Рейтинг: ${input.rating}`}
        <input
          onChange={handleInputChange}
          name="rating"
          type="range"
          min="0"
          max="10"
          value={input.rating}
        />
      </label>
      <div className={styles.formUpdateCheckbox}>
        <p>Типы пиццы</p>
        <label>
          <input
            name="types"
            value="0"
            type="checkbox"
            checked={checkboxes.types.includes(0)}
            onChange={handleCheckboxChange}
          />
          <span>Тонкое</span>
        </label>
        <label>
          <input
            name="types"
            value="1"
            type="checkbox"
            checked={checkboxes.types.includes(1)}
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
          checked={checkboxes.sizes.includes(26)}
        />
        <span>26</span>
        <input
          name="sizes"
          type="checkbox"
          onChange={handleCheckboxChange}
          value="30"
          checked={checkboxes.sizes.includes(30)}
        />
        <span>30</span>
        <input
          name="sizes"
          type="checkbox"
          onChange={handleCheckboxChange}
          value="40"
          checked={checkboxes.sizes.includes(40)}
        />
        <span>40</span>
      </div>

      <div className={styles.formUpdateBottom}>
        <Button type="button" onClick={deletePizza} appearance="default">
          Удалить пиццу
        </Button>

        <Button type="submit" appearance="default">
          Отправить
        </Button>
      </div>
    </form>
  )
}
