import cn from 'classnames'
import debounce from 'lodash.debounce'
import { useCallback, useRef, useState } from 'react'

import { useDispatch } from 'react-redux'

import {
  setValueSearch,
  clearValueSearch,
} from '../../redux/slices/filterSlice'

import Cross from './icons/cross.svg'
import SearchIcon from './icons/search.svg'

import styles from './Search.module.scss'
import { ISearchProps, TElementEvent } from './Search.props'

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

  const onChangeInput = (event: TElementEvent) => {
    setLocalValueSearch(event.target.value)
    debounceSearch(event.target.value)
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
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Найти пиццу"
      />
    </div>
  )
}
