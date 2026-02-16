import type { FC } from "react";

import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as ShaPagination,
} from "@/shared/ui/shadcn";

type TProps = {
  page: number;
  totalPages: number;
  onChange: (v: number) => void;
};

export const Pagination: FC<TProps> = ({ totalPages, page, onChange }) => {
  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <ShaPagination className="w-full">
      <PaginationContent className="justify-center">
        <PaginationItem 
          onClick={() => canGoPrev && onChange(page - 1)}
          className={!canGoPrev ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        >
          <PaginationPrevious />
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationItem 
            key={index} 
            onClick={() => onChange(index + 1)}
            className="cursor-pointer"
          >
            <PaginationLink isActive={page === index + 1}>{index + 1}</PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem 
          onClick={() => canGoNext && onChange(page + 1)}
          className={!canGoNext ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </ShaPagination>
  );
};
