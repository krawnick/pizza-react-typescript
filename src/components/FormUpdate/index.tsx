import { useEffect, useState } from 'react'

import { Button } from '..'
import { selectorFilter } from '../../redux/slices/filter/selectors'
import { IPizzas } from '../../redux/slices/pizzas/types'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchWithParams } from '../../utils/fetchWithParams'

import styles from './FormUpdate.module.scss'

interface IFormUpdateProps {
  data: IExtendPizzas[]
  setOpen: () => void
}

interface ICheckboxes {
  [index: string]: number[]
}

interface IExtendPizzas extends IPizzas {
  category: string
}

export const FormUpdate = ({ data, setOpen }: IFormUpdateProps) => {
  const dispatch = useAppDispatch()
  const { paginationState, searchState, categoryState, sortState } =
    useAppSelector(selectorFilter)

  const [selectData, setSelectData] = useState(0)
  const [checkboxes, setCheckboxes] = useState<ICheckboxes>({
    types: [],
    sizes: [],
  })
  const [input, setInput] = useState({
    name: '',
    price: '',
    rating: '',
    category: '',
  })

  const refreshForm = (data: IExtendPizzas[]) => {
    if (data) {
      setInput({
        name: data[selectData].name,
        price: data[selectData].price.toString(),
        rating: data[selectData].rating.toString(),
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
      if (data) {
        try {
          const res = await fetch(
            import.meta.env.VITE_API_URL + '/' + data[selectData].id,
            {
              method: 'PUT',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
                ...input,
                ...checkboxes,
              }),
            }
          )

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
    }
    updateData()
  }

  const deletePizza = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_API_URL + '/' + data[selectData].id,
        { method: 'DELETE' }
      )

      if (!res.ok) {
        throw new Error('Произошла ошибка при удалении данных')
      }
      alert('Данные успешно удалены')

      dispatch(
        fetchWithParams({
          paginationState,
          searchState,
          categoryState,
          sortState,
        })
      )
      setOpen()
    } catch (error) {
      alert(error)
    }
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
