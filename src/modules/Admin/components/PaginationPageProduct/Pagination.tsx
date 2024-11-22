import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationPageProduct({
  currentPage,
  onPageChange,
  totalPages,
  limit,
}: any) {
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
