import styles from './Search.module.scss'
import cn from 'classnames'
import { useRef } from 'react'
// import { SearchContext } from '../../App'
import Cross from './icons/cross.svg?react'
import SearchIcon from './icons/search.svg?react'
import debounce from 'lodash.debounce'
import { setValueSearch } from '../../redux/slices/searchSlice'
import { useDispatch, useSelector } from 'react-redux'

const test = debounce(() => {
  console.log('debounce')
}, 1500)

export const Search = ({ className }) => {
  // const { searchValue, setSearchValue } = useContext(SearchContext)
  const dispatch = useDispatch()
  const searchState = useSelector((state) => {
    state.search
    console.log(state)
  })

  console.log(searchState)

  const inputRef = useRef(null)

  const onClearInput = () => {
    inputRef.current.focus()
    // setSearchValue('')
  }
  return (
    <div className={cn(className, styles.root)}>
      <Cross
        onClick={() => {
          onClearInput()
          test()
        }}
        className={cn(
          styles.close,
          searchState ? styles.active : styles.disable
        )}
      />
      <SearchIcon
        className={cn(
          styles.icon,
          !searchState ? styles.active : styles.disable
        )}
      />
      <input
        ref={inputRef}
        value={searchState}
        onChange={(event) => dispatch(setValueSearch(event.target.value))}
        className={styles.input}
        placeholder="Найти пиццу"
      />
    </div>
  )
}
