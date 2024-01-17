import styles from './Search.module.scss'
import cn from 'classnames'
import { useCallback, useRef, useState } from 'react'
import Cross from './icons/cross.svg?react'
import SearchIcon from './icons/search.svg?react'
import debounce from 'lodash.debounce'
import {
  setValueSearch,
  clearValueSearch,
} from '../../redux/slices/filterSlice'
import { useDispatch } from 'react-redux'
import { ISearchProps } from './Search.props'

export const Search = ({ className }: ISearchProps): JSX.Element => {
  const dispatch = useDispatch()

  const inputRef = useRef<HTMLInputElement>(null)
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
    inputRef.current?.focus()
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
