import React from 'react';
import { ReactNode } from 'react';
import { useSelector } from "react-redux";
import type { RootState } from '../store'

interface PaginationProps  {
  children?: ReactNode | undefined;
  currentPage: number;
  [props: string]: any;
}


function Pagination(props: PaginationProps) {
  const { children, currentPage, ...rest } = props;

  const { totalPages } = useSelector((state: RootState) => state.pages);

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }


  return (
    <div className="Pagination flex justify-end">
      <span>Pages:</span>
      {pages.map((page, index) => {
        return <div key={index}>{page}</div>;
      })}
    </div>
  );
}

export default Pagination;