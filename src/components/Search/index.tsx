import styles from './Search.module.scss'
import cn from 'classnames'
import { useCallback, useRef, useState } from 'react'
// import { SearchContext } from '../../App'
import Cross from './icons/cross.svg?react'
import SearchIcon from './icons/search.svg?react'
import debounce from 'lodash.debounce'
import {
  setValueSearch,
  clearValueSearch,
} from '../../redux/slices/filterSlice'
import { useDispatch, useSelector } from 'react-redux'

export const Search = ({ className }) => {
  // const { searchValue, setSearchValue } = useContext(SearchContext)

  const dispatch = useDispatch()

  const inputRef = useRef(null)
  const [localValueSearch, setLocalValueSearch] = useState('')

  const debounceSearch = useCallback(
    debounce((value) => {
      dispatch(setValueSearch(value))
    }, 500),
    []
  )

  const onClearInput = () => {
    setLocalValueSearch('')
    dispatch(clearValueSearch())
    inputRef.current.focus()
    // setSearchValue('')
  }

  const onChangeInput = (value) => {
    setLocalValueSearch(value)
    debounceSearch(value)
  }

  return (
    <div className={cn(className, styles.root)}>
      <Cross
        onClick={() => onClearInput()}
        className={cn(
          styles.close,
          localValueSearch ? styles.active : styles.disable
        )}
      />
      <SearchIcon
        className={cn(
          styles.icon,
          !localValueSearch ? styles.active : styles.disable
        )}
      />
      <input
        ref={inputRef}
        // value={searchState}
        value={localValueSearch}
        onChange={(event) => {
          onChangeInput(event.target.value)
        }}
        className={styles.input}
        placeholder="Найти пиццу"
      />
    </div>
  )
}
