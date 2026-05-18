import { Pagination, Stack } from '@mui/material';

function PaginationControls({ page, total, limit, onChange }) {
  const pageCount = Math.max(1, Math.ceil(total / limit));

  return (
    <Stack alignItems="center" sx={{ pt: 2 }}>
      <Pagination
        count={pageCount}
        page={page}
        onChange={(event, value) => onChange(value)}
        color="primary"
      />
    </Stack>
  );
}

export default PaginationControls;
