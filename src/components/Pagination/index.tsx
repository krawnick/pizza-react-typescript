import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'
import cn from 'classnames'

export const Pagination = ({ className, onChangePage }) => {
  return (
    <ReactPaginate
      className={cn(styles.pagination, className)}
      breakLabel="..."
      nextLabel="Следующая >"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="< Предыдущая"
      renderOnZeroPageCount={null}
    />
  )
}
