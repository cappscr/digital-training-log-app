import Table from 'react-bootstrap/Table';

import { trainingPercentages } from '../lib/constants';

export const PacesTable = ({ trainingPaces }) => {
  const percentagesToRender = [];

  trainingPercentages.forEach((percentage) => {
    if (trainingPaces.percentages[percentage])
      percentagesToRender.push(parseFloat(percentage));
  });

  const paceRows = percentagesToRender.map((trainingPace) => {
    console.log('trainingPace: ', trainingPace);
    console.log('paceData: ', trainingPaces.pace.calcPercentage(trainingPace));
    return (
      <tr key={`${trainingPace}-pace`}>
        <td>{trainingPace}</td>
        <td>{trainingPaces.pace.calcPercentage(trainingPace).display()}</td>
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