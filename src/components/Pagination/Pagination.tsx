import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';
import { PaginationProps } from './Pagination.props';

export default function Pagination({setCurrentPage, metaDevice}:PaginationProps){ //{setCurrentPage, metaDevice}:PaginationProps

    return(
        <ReactPaginate
                className={styles.paginate}
                breakLabel="..."
                nextLabel=">"
                onPageChange={(event) => setCurrentPage(event.selected + 1)}
                pageRangeDisplayed={6}
                pageCount={(metaDevice?.total_pages) ? metaDevice?.total_pages: 1}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
    )
}