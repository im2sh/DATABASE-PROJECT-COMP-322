import styled from "styled-components";

const MAX_VISIBLE_PAGES = 3;

const Pagination = ({ totalPages, currentPage, changePage }) => {
  const getPaginationRange = () => {
    const totalVisiblePages = Math.min(MAX_VISIBLE_PAGES, totalPages);
    let start = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
    let end = start + totalVisiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - totalVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  };

  if (totalPages <= 1) return null;

  const paginationRange = getPaginationRange();
  const shouldShowFirstPage = paginationRange[0] > 1;
  const shouldShowLastPage =
    paginationRange[paginationRange.length - 1] < totalPages;

  return (
    <PaginationContainer>
      {shouldShowFirstPage && (
        <PageNumber onClick={() => changePage(1)} active={currentPage === 1}>
          1
        </PageNumber>
      )}
      {shouldShowFirstPage && paginationRange[0] > 2 && (
        <Ellipsis>...</Ellipsis>
      )}
      {paginationRange.map((pageNumber) => (
        <PageNumber
          key={pageNumber}
          onClick={() => changePage(pageNumber)}
          active={currentPage === pageNumber}
        >
          {pageNumber}
        </PageNumber>
      ))}
      {shouldShowLastPage &&
        paginationRange[paginationRange.length - 1] < totalPages - 1 && (
          <Ellipsis>...</Ellipsis>
        )}
      {shouldShowLastPage && (
        <PageNumber
          onClick={() => changePage(totalPages)}
          active={currentPage === totalPages}
        >
          {totalPages}
        </PageNumber>
      )}
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const PageNumber = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background: ${({ active }) => (active ? "#ff6b6b" : "transparent")};
  border: ${({ active }) => (active ? "none" : "1px solid #ddd")};
  color: ${({ active }) => (active ? "white" : "#333")};
  cursor: pointer;
`;

const Ellipsis = styled.span`
  margin: 0 5px;
  padding: 5px 10px;
`;

export default Pagination;
