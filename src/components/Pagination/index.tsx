import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

export const Pagination = () => {
  return (<ReactPaginate
    className={styles.pagination}
    breakLabel="..."
    nextLabel=">"
    onPageChange={(event) => console.log(event)}
    pageRangeDisplayed={5}
    pageCount={5}
    previousLabel="<"
    renderOnZeroPageCount={null}
  />)
}