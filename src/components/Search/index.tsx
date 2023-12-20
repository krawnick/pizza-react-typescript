import styles from './Search.module.scss'
import cn from 'classnames'
import { useContext } from 'react'
import { SearchContext } from '../../App'
import Cross from './icons/cross.svg?react'
import SearchIcon from './icons/search.svg?react'

export const Search = ({ className }) => {
  const { searchValue, setSearchValue } = useContext(SearchContext)
  return (
    <div className={cn(className, styles.root)}>
      <Cross
        onClick={() => {
          setSearchValue('')
        }}
        className={cn(
          styles.close,
          searchValue ? styles.active : styles.disable
        )}
      />
      <SearchIcon
        className={cn(
          styles.icon,
          !searchValue ? styles.active : styles.disable
        )}
      />
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.input}
        placeholder="Найти пиццу"
      />
    </div>
  )
}
