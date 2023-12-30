import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'
import cn from 'classnames'
import { useSelector } from 'react-redux'

export const Pagination = ({ className, onChangePage }) => {
  const paginationState = useSelector(
    (state) => state.pagination.paginationState
  )

  console.log('state', paginationState)

  return (
    <ReactPaginate
      className={cn(styles.pagination, className)}
      breakLabel="..."
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
