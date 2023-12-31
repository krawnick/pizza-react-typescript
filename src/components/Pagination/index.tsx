import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'
import cn from 'classnames'
import { useSelector } from 'react-redux'

export const Pagination = ({ className, onChangePage, onPageActive }) => {
  const { paginationState } = useSelector((state) => state.filter)

  return (
    <ReactPaginate
      className={cn(styles.pagination, className)}
      breakLabel="..."
      forcePage={paginationState - 1}
      initialPage={paginationState - 1}
      nextLabel="Следующая >"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="< Предыдущая"
      renderOnZeroPageCount={null}
    />
  )
}
