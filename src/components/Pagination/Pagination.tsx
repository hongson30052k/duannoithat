import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";

export default function PaginationItem({
  currentPage,
  onPageChange,
  totalPages,
  limit,
}: any) {
  if (!totalPages) {
    console.error("totalPage is not defined or is invalid");
    return null;
  }
  const pageTotal = Math.ceil(totalPages / limit);
  const handlePageChange = (event: any, value: any) => {
    onPageChange(value);
  };

  return (
    <Stack
      spacing={1}
      alignItems={"center"}
      height={"100px"}
      justifyContent={"center"}
    >
      <Pagination
        count={pageTotal}
        color="secondary"
        size="large"
        shape="rounded"
        page={currentPage}
        onChange={handlePageChange}
        siblingCount={0}
        boundaryCount={1}
      />
    </Stack>
  );
}
