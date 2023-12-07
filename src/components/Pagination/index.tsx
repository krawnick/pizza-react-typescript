import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

export const Pagination = ({ className }) => {
  return (<ReactPaginate
    className={styles.pagination}
    breakLabel="..."
    nextLabel="Следущая >"
    onPageChange={(event) => console.log(event)}
    pageRangeDisplayed={5}
    pageCount={5}
    previousLabel="< Предыдущая"
    renderOnZeroPageCount={null}
  />)
}