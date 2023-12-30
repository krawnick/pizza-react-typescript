import styles from './Search.module.scss'
import cn from 'classnames'
import { useCallback, useEffect, useRef, useState } from 'react'
// import { SearchContext } from '../../App'
import Cross from './icons/cross.svg?react'
import SearchIcon from './icons/search.svg?react'
import debounce from 'lodash.debounce'
import {
  setValueSearch,
  clearValueSearch,
} from '../../redux/slices/searchSlice'
import { useDispatch, useSelector } from 'react-redux'

export const Search = ({ className }) => {
  // const { searchValue, setSearchValue } = useContext(SearchContext)

  const dispatch = useDispatch()
  const searchState = useSelector((state) => state.search.searchState)

  const inputRef = useRef(null)
  const [value, setValue] = useState('')

  const debounceSearch = useCallback(
    debounce((value) => {
      dispatch(setValueSearch(value))
    }, 500),
    []
  )

  const onClearInput = () => {
    setValue('')
    dispatch(clearValueSearch())
    inputRef.current.focus()
    // setSearchValue('')
  }

  const onChangeInput = (value) => {
    setValue(value)
    debounceSearch(value)
  }

  return (
    <div className={cn(className, styles.root)}>
      <Cross
        onClick={() => onClearInput()}
        className={cn(styles.close, value ? styles.active : styles.disable)}
      />
      <SearchIcon
        className={cn(styles.icon, !value ? styles.active : styles.disable)}
      />
      <input
        ref={inputRef}
        // value={searchState}
        value={value}
        onChange={(event) => {
          onChangeInput(event.target.value)
        }}
        className={styles.input}
        placeholder="Найти пиццу"
      />
    </div>
  )
}
