import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import {
  usePaceResult,
  usePaceCalculator,
} from '../../../hooks/usePaceCalculator';

export function PaceResultTable() {
  const { data: result } = usePaceResult();
  const { reset } = usePaceCalculator();

  return (
    <Stack spacing={2} alignItems="center">
      <TableContainer sx={{ maxWidth: 600 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Percentage</TableCell>
              <TableCell>Pace</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{`${result?.percentage ?? 0}%`}</TableCell>
              <TableCell>{result?.calculated_pace}</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      {/* TODO: update the color on the typography to a grey */}
      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', fontWeight: 'fontWeightLight' }}
      >
        Calculated paces based on {result?.original_pace}
      </Typography>
      <Button onClick={reset} variant="contained">
        Reset
      </Button>
    </Stack>
  );
}
