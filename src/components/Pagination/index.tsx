import cn from 'classnames'
import ReactPaginate from 'react-paginate'
import { useSelector } from 'react-redux'

import { selectorFilter } from '../../redux/slices/filter/selectors'

import styles from './Pagination.module.scss'

interface IPaginationProps {
  className: string
  onChangePage: (page: number) => void
}

export const Pagination = ({
  className,
  onChangePage,
}: IPaginationProps): JSX.Element => {
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
