import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const CustomPagination = ({ resPerPage, filteredProductsCount }) => {
  // const [currentPage, setCurrentPage] = useState();

  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get('page')) || 1;

  // useEffect(() => {
  //   setCurrentPage(page);
  // }, [page]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;

    if (searchParams.has('page')) {
      searchParams.set('page', selectedPage);
    } else {
      searchParams.append('page', selectedPage);
    }

    // searchParams.set('page', selectedPage);
    const path = `${window.location.pathname}?${searchParams.toString()}`;
    navigate(path);
  };

  return (
    <div>
      {filteredProductsCount > resPerPage && (
        <ReactPaginate
          containerClassName='paginate'
          pageCount={Math.ceil(filteredProductsCount / resPerPage)}
          forcePage={page - 1}
          renderOnZeroPageCount={null}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          nextLabel='Next >'
          previousLabel='< Prev'
          pageClassName='page-li'
          pageLinkClassName='page-link'
          activeLinkClassName='active-page'
          previousLinkClassName='prev-link'
          nextLinkClassName='next-link'
        />
      )}
    </div>
  );
};
export default CustomPagination;
