import { TextField, MenuItem, Stack, Button } from '@mui/material';

const priorities = ['all', 'critical', 'high', 'medium', 'normal'];
const statuses = ['all', 'viewed', 'unviewed'];

function FilterBar({ filters, onChange, onReset }) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" sx={{ mb: 3 }}>
      <TextField
        select
        label="Status"
        value={filters.status}
        onChange={(event) => onChange({ ...filters, status: event.target.value })}
        sx={{ minWidth: 140 }}
      >
        {statuses.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Priority"
        value={filters.priority}
        onChange={(event) => onChange({ ...filters, priority: event.target.value })}
        sx={{ minWidth: 140 }}
      >
        {priorities.map((option) => (
          <MenuItem key={option} value={option === 'all' ? '' : option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="outlined" onClick={onReset}>
        Reset
      </Button>
    </Stack>
  );
}

export default FilterBar;
