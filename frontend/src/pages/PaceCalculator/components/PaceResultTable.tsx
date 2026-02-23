import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import useSWR, { useSWRConfig } from 'swr';
import { type PaceCalculationResult } from '../../../hooks/usePaceCalculator';

export function PaceResultTable() {
  const { data: result } = useSWR<PaceCalculationResult>(
    '/api/v1/pace-calculator',
  );
  const { mutate } = useSWRConfig();

  return (
    <Stack spacing={2}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Percentage</TableCell>
              <TableCell>Pace</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>{result?.calculated_pace}</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <Typography variant="body2">
        Calculated paces based on {result?.original_pace}
      </Typography>
      <Button
        onClick={() => mutate('/api/v1/pace-calculator', null, false)}
        variant="contained"
      >
        Reset
      </Button>
    </Stack>
  );
}
