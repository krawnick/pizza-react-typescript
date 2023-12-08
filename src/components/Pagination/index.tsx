import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'
import cn from 'classnames'

export const Pagination = ({ className }) => {
  return (
    <ReactPaginate
      className={cn(styles.pagination, className)}
      breakLabel="..."
      nextLabel="Следущая >"
      onPageChange={(event) => console.log(event)}
      pageRangeDisplayed={5}
      pageCount={5}
      previousLabel="< Предыдущая"
      renderOnZeroPageCount={null}
    />
  )
}
