import Container from 'react-bootstrap/Container';
import { PaceCalculator } from './components/PaceCalculator';

import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <div className="App">
      <main>
        <Container className="d-flex justify-content-center">
          <h1 className="mt-3 mb-4">
            <i className="bi bi-calculator"></i>
            Training Paces Calulator
          </h1>
        </Container>
        <Container className="d-flex align-items-center">
          <PaceCalculator />
        </Container>
      </main>
    </div>
  );
}

export default App;
