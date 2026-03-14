import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { PageTitle } from '@/components/PageTitle';
import { usePaceResult } from '@/hooks/usePaceCalculator';
import { PaceResultTable } from './components/PaceResultTable';
import { PaceCalculatorForm } from './components/PaceCalculatorForm';

export function PaceCalculatorPage() {
  const { data: result } = usePaceResult();

  return (
    <>
      <PageTitle pageName="Pace Calculator" />
      <Stack spacing={4}>
        <Typography variant="h4">Pace Calculator</Typography>
        {result ? <PaceResultTable /> : <PaceCalculatorForm />}
      </Stack>
    </>
  );
}
