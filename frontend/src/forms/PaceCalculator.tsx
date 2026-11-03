import { Loading } from '@/components/Loading';
import { PaceCalculatorFields } from './pace-calculator/PaceCalculatorFields';

import { useCurrentUser } from '@/hooks/useCurrentUser';

export const PaceCalculatorForm = () => {
  const { user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <PaceCalculatorFields
      defaultDistanceUnit={user?.settings.default_distance_unit ?? 'mi'}
    />
  );
};
