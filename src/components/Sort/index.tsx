import { setSort } from '../../redux/slices/filterSlice.js'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import SortIcon from './sortIcon.svg?react'
import styles from './Sort.module.scss'

const sortList = [
  { name: 'популярности (обратно)', sortProperty: 'rating', desc: true },
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене (обратно)', sortProperty: 'price', desc: true },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту (обратно)', sortProperty: 'name', desc: true },
  { name: 'алфавиту', sortProperty: 'name' },
]

export const Sort = () => {
  const dispatch = useDispatch()
  const { sortState } = useSelector((state) => state.filter)

  const [openSort, setOpenSort] = useState(false)
  const sortRef = useRef(null)

  useOutsideClick(sortRef, setOpenSort, openSort)

  return (
    <div ref={sortRef} className={styles.sort} onClick={() => ''}>
      <div className={styles.sortLabel}>
        <SortIcon
          className={openSort ? styles.sortIconActive : styles.sortIcon}
        />
        <b>Сортировка по:</b>
        <span onClick={() => setOpenSort(!openSort)}>{sortState.name}</span>
      </div>
      {openSort && (
        <div className={styles.sortPopup}>
          <ul>
            {sortList.map((sort, index) => (
              <li
                key={sort.name}
                onClick={() => {
                  dispatch(setSort(sort))
                  setOpenSort(false)
                }}
                className={
                  sortList[index].name === sortState.name ? styles.active : ''
                }
              >
                {sortList[index].name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
