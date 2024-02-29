import { useState } from 'react'

import { Button } from '..'

import styles from './FormUpdate.module.scss'

export const FormUpdate = () => {
  const [name, setName] = useState('')
  const [types, setTypes] = useState('')
  const [sizes, setSizes] = useState('')
  const [price, setPrice] = useState('')
  const [rating, setRating] = useState('')
  const [category, setCategory] = useState('')

  const [checkboxes, setCheckboxes] = useState({
    types0: false,
    types1: false,
    sizes0: false,
    sizes1: false,
    sizes2: false,
  })
  console.log('checkboxes', checkboxes)

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target
    setCheckboxes({
      ...checkboxes,
      [name]: checked,
    })
  }

  return (
    <form className={styles.formUpdate}>
      <h1>Обновление/добавление данных</h1>
      <label className={styles.formUpdateText}>
        Название пиццы
        <input name="name" type="text" />
      </label>
      <label className={styles.formUpdateText}>
        Цена за малый круг
        <input name="price" type="text" />
      </label>
      <label className={styles.formUpdateText}>
        Рейтинг от 0 до 10
        <input name="rating" type="text" />
      </label>
      <label className={styles.formUpdateText}>
        Категория
        <input name="category" type="text" />
      </label>
      <label className={styles.formUpdateCheckbox}>
        <p>Типы пиццы</p>

        <input
          name="types0"
          type="checkbox"
          checked={checkboxes.types0}
          onChange={handleCheckboxChange}
        />
        <span>Тонкое</span>

        <input
          name="types1"
          type="checkbox"
          checked={checkboxes.types1}
          onChange={handleCheckboxChange}
        />
        <span>Традиционное</span>
      </label>
      <label className={styles.formUpdateCheckbox}>
        <p>Размеры пиццы</p>
        <input
          name="sizes0"
          type="checkbox"
          checked={checkboxes.sizes0}
          onChange={handleCheckboxChange}
        />
        <span>26</span>
        <input
          name="sizes1"
          type="checkbox"
          checked={checkboxes.sizes1}
          onChange={handleCheckboxChange}
        />
        <span>30</span>
        <input
          name="sizes2"
          type="checkbox"
          checked={checkboxes.sizes2}
          onChange={handleCheckboxChange}
        />
        <span>40</span>
      </label>
      <Button type="submit" appearance="default">
        Отправить
      </Button>
    </form>
  )
}

// const MultipleCheckboxesExample = () => {
//   const [checkboxes, setCheckboxes] = useState({
//     checkbox1: false,
//     checkbox2: false,
//     checkbox3: false,
//   });

//   const handleCheckboxChange = (event) => {
//     const { name, checked } = event.target;
//     setCheckboxes({
//       ...checkboxes,
//       [name]: checked,
//     });
//   };

//   return (
//     <div>
//       <label>
//         <input
//           type="checkbox"
//           name="checkbox1"
//           checked={checkboxes.checkbox1}
//           onChange={handleCheckboxChange}
//         />
//         Checkbox 1
//       </label>
//       <label>
//         <input
//           type="checkbox"
//           name="checkbox2"
//           checked={checkboxes.checkbox2}
//           onChange={handleCheckboxChange}
//         />
//         Checkbox 2
//       </label>
//       <label>
//         <input
//           type="checkbox"
//           name="checkbox3"
//           checked={checkboxes.checkbox3}
//           onChange={handleCheckboxChange}
//         />
//         Checkbox 3
//       </label>
//       <p>Checked checkboxes: {Object.keys(checkboxes).filter(key => checkboxes[key]).join(', ')}</p>
//     </div>
//   );
// };

// export default MultipleCheckboxesExample;
