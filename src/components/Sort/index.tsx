import { memo, useRef, useState } from 'react'

import { useOutsideClick } from '../../hooks/useOutsideClick'
import { setSort } from '../../redux/slices/filter/slice'
import { useAppDispatch } from '../../redux/store'

import styles from './Sort.module.scss'
import { ReactComponent as SortIcon } from './sortIcon.svg'

export type TSortList = {
  name: string
  sortProperty: 'rating' | 'price' | 'name'
  desc?: boolean
}

const sortList: TSortList[] = [
  { name: 'популярности (обратно)', sortProperty: 'rating', desc: true },
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене (обратно)', sortProperty: 'price', desc: true },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту (обратно)', sortProperty: 'name', desc: true },
  { name: 'алфавиту', sortProperty: 'name' },
]

export const Sort = memo(
  ({ value }: { value: TSortList }): JSX.Element => {
    const dispatch = useAppDispatch()

    const [openSort, setOpenSort] = useState(false)
    const sortRef = useRef<HTMLDivElement>(null)

    useOutsideClick(sortRef, setOpenSort, openSort)

    return (
      <div ref={sortRef} className={styles.sort} onClick={() => ''}>
        <div className={styles.sortLabel}>
          <SortIcon
            className={openSort ? styles.sortIconActive : styles.sortIcon}
          />
          <b>Сортировка по:</b>
          <span onClick={() => setOpenSort(!openSort)}>{value.name}</span>
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
                    sortList[index].name === value.name ? styles.active : ''
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
  },
  (prevProps, nextProps) => {
    return nextProps.value.name !== prevProps.value.name ? false : true
  }
)
