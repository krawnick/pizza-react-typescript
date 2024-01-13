import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'
import cn from 'classnames'
import { useSelector } from 'react-redux'
import { selectorFilter } from '../../redux/slices/filterSlice'

export const Pagination = ({ className, onChangePage }) => {
  const { paginationState } = useSelector(selectorFilter)

  return (
    <ReactPaginate
      className={cn(styles.pagination, className)}
      breakLabel="..."
      forcePage={paginationState - 1}
      nextLabel="Следующая >"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="< Предыдущая"
      renderOnZeroPageCount={null}
    />
  )
}
