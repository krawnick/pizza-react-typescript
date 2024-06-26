import { useEffect, useState } from 'react'

import { Button, Loader } from '..'
import { IPizzaObject } from '../../interface/Pizza.interface'
import {
  addItems,
  deleteItems,
  updateItem,
} from '../../redux/slices/admin/slice'
import { useAppDispatch } from '../../redux/store'

import styles from './Form.module.scss'

interface IFormProps {
  setShow: () => void
  edit?: true
  items?: IPizzaObject[]
}

interface ICheckboxes {
  [key: string]: number[]
}

interface IInputType {
  name: string
  price: string
  imageUrl: string
  rating: number
  category: string
  description: string
}

export const Form = ({ setShow, edit, items }: IFormProps) => {
  const dispatch = useAppDispatch()
  const [pizza, setPizza] = useState<IPizzaObject>()

  const [checkboxes, setCheckboxes] = useState<ICheckboxes>({
    types: [],
    sizes: [],
  })
  const [input, setInput] = useState<IInputType>({
    name: '',
    price: '',
    imageUrl: '',
    rating: 5,
    category: '',
    description: '',
  })

  useEffect(() => {
    if (items) {
      setPizza(items[0])
    }
  }, [])

  useEffect(() => {
    if (pizza) {
      setInput({
        name: pizza.name,
        price: pizza.price.toString(),
        imageUrl: pizza.imageUrl,
        rating: pizza.rating,
        category: pizza.category.toString(),
        description: pizza.description,
      })
      setCheckboxes({
        types: pizza.types,
        sizes: pizza.sizes,
      })
    }
  }, [pizza])

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
    let arr: number[] = [
      ...(checkboxes[name] as ICheckboxes['types' | 'sizes']),
    ]

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

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (items) {
      setPizza(items.find((el) => el.id! === event.target.value))
    }
  }

  const deletePizza = () => {
    if (pizza) {
      dispatch(deleteItems([Number(pizza.id)]))
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('submit')
    event.preventDefault()
    edit
      ? dispatch(
          updateItem({
            ...(checkboxes as ICheckboxes),
            ...(input as IInputType),
            id: pizza?.id,
          } as unknown as IPizzaObject)
        )
      : dispatch(
          addItems([{ ...checkboxes, ...input } as unknown as IPizzaObject])
        )
    setShow()
  }

  if (edit && !items) {
    return <Loader />
  }

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(event) => {
        if (event.code === 'Enter') event.preventDefault()
      }}
      className={styles.form}
    >
      <h1>{!edit ? 'Добавление данных' : 'Редактирование данных'}</h1>

      {edit && (
        <label>
          Выберите пиццу для редактирования
          <select
            className={styles.formSelectPizza}
            onChange={handleSelect}
            value={pizza?.id}
          >
            {items?.map((el) => {
              return (
                <option value={el.id} key={el.id}>
                  {el.name}
                </option>
              )
            })}
          </select>
        </label>
      )}

      <label className={styles.formText}>
        Название пиццы
        <input
          onChange={handleInputChange}
          name="name"
          type="text"
          value={input.name}
        />
      </label>
      <label className={styles.formText}>
        Цена за малый круг
        <input
          onChange={handleInputChange}
          name="price"
          type="number"
          max="2000"
          value={input.price}
        />
      </label>
      <label className={styles.formText}>
        Категория
        <input
          onChange={handleInputChange}
          name="category"
          type="text"
          value={input.category}
        />
      </label>

      <label className={styles.formText}>
        Ссылка на изображение
        <input
          onChange={handleInputChange}
          name="imageUrl"
          type="url"
          value={input.imageUrl}
        />
      </label>
      <label className={styles.formText}>
        Описание
        <textarea
          onChange={handleTextAreaChange}
          name="description"
          value={input.description}
        />
      </label>
      <label className={styles.formText}>
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
      <div className={styles.formCheckbox}>
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
      <div className={styles.formCheckbox}>
        <p>Размеры пиццы</p>
        <label>
          <input
            name="sizes"
            type="checkbox"
            onChange={handleCheckboxChange}
            value="26"
            checked={checkboxes.sizes.includes(26)}
          />
          <span>26</span>
        </label>
        <label>
          <input
            name="sizes"
            type="checkbox"
            onChange={handleCheckboxChange}
            value="30"
            checked={checkboxes.sizes.includes(30)}
          />
          <span>30</span>
        </label>
        <label>
          <input
            name="sizes"
            type="checkbox"
            onChange={handleCheckboxChange}
            value="40"
            checked={checkboxes.sizes.includes(40)}
          />
          <span>40</span>
        </label>
      </div>

      <div className={styles.formBottom}>
        {edit && (
          <Button type="button" onClick={deletePizza} appearance="default">
            Удалить пиццу
          </Button>
        )}

        <Button type="submit" appearance="default">
          Отправить
        </Button>
      </div>
    </form>
  )
}
