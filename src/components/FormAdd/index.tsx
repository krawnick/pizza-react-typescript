import { useState } from 'react'

import { Button } from '..'
import { selectorFilter } from '../../redux/slices/filter/selectors'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchWithParams } from '../../utils/fetchWithParams'

import styles from './FormAdd.module.scss'

interface IFormAddProps {
  setOpen: () => void
}

interface ICheckboxes {
  [index: string]: number[]
}

export const FormAdd = ({ setOpen }: IFormAddProps) => {
  const dispatch = useAppDispatch()
  const { paginationState, searchState, categoryState, sortState } =
    useAppSelector(selectorFilter)

  const [checkboxes, setCheckboxes] = useState<ICheckboxes>({
    types: [],
    sizes: [],
  })
  const [input, setInput] = useState({
    name: '',
    price: '',
    imageUrl: '',
    rating: 5,
    category: '',
    description: '',
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInput({
      ...input,
      [name]: value,
    })
  }

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setInput({
      ...input,
      [name]: value,
    })
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      checked,
      value,
    }: { name: string; checked: boolean; value: string } = event.target
    let arr: number[] = [...checkboxes[name]]

    if (checked) {
      arr.push(Number(value))
    } else {
      arr = arr.filter((v) => {
        return v !== Number(value)
      })
    }

    setCheckboxes({
      ...checkboxes,
      [name]: arr.sort(),
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const updateData = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            ...input,
            ...checkboxes,
          }),
        })

        if (!res.ok) {
          throw new Error('Произошла ошибка при отправке данных')
        }

        alert('Данные успешно отправлены')

        dispatch(
          fetchWithParams({
            paginationState,
            searchState,
            categoryState,
            sortState,
          })
        )
      } catch (error) {
        alert(error)
      } finally {
        setOpen()
      }
    }
    updateData()
  }

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(event) => {
        if (event.code === 'Enter') event.preventDefault()
      }}
      className={styles.formAdd}
    >
      <h1>Добавление данных</h1>

      <label className={styles.formAddText}>
        Название пиццы
        <input
          onChange={handleInputChange}
          name="name"
          type="text"
          value={input.name}
        />
      </label>
      <label className={styles.formAddText}>
        Цена за малый круг
        <input
          onChange={handleInputChange}
          name="price"
          type="number"
          max="2000"
          value={input.price}
        />
      </label>
      <label className={styles.formAddText}>
        Категория
        <input
          onChange={handleInputChange}
          name="category"
          type="text"
          value={input.category}
        />
      </label>

      <label className={styles.formAddText}>
        Ссылка на изображение
        <input
          onChange={handleInputChange}
          name="imageUrl"
          type="url"
          value={input.imageUrl}
        />
      </label>
      <label className={styles.formAddText}>
        Описание
        <textarea
          onChange={handleTextAreaChange}
          name="description"
          value={input.description}
        />
      </label>
      <label className={styles.formAddText}>
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
      <div className={styles.formAddCheckbox}>
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
      <div className={styles.formAddCheckbox}>
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

      <Button type="submit" appearance="default">
        Отправить
      </Button>
    </form>
  )
}
