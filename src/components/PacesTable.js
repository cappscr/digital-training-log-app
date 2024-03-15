import Table from 'react-bootstrap/Table';

import { Pace } from '../lib/pace';
import { trainingPercentages } from '../lib/constants';

export const PacesTable = ({ trainingPaces }) => {
  const paceData = {
    pace: new Pace(
      trainingPaces.get('pace-min'),
      trainingPaces.get('pace-sec'),
      trainingPaces.get('pace-units'),
    ),
    percentages: [],
  };
  trainingPercentages.forEach((percentage) => {
    if (trainingPaces.get(percentage) === 'on')
      paceData.percentages.push(parseFloat(percentage));
  });

  const paceRows = paceData.percentages.map((trainingPace) => {
    console.log('trainingPace: ', trainingPace);
    console.log('paceData: ', paceData.pace.calcPercentage(trainingPace));
    return (
      <tr key={`${trainingPace}-pace`}>
        <td>{trainingPace}</td>
        <td>{paceData.pace.calcPercentage(trainingPace).display()}</td>
      </tr>
    );
  });

  console.log('paceRows', paceRows);

  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>Percentage</th>
          <th>Pace</th>
        </tr>
      </thead>
      <tbody>{paceRows}</tbody>
    </Table>
  );
}