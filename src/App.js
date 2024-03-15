import { PaceCalculator } from './components/PaceCalculator';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <div className="App">
      <main>
        <h1 className="mt-3 mb-4">
          <i className="bi bi-calculator"></i>
          Training Paces Calulator
        </h1>
        <PaceCalculator />
      </main>
    </div>
  );
}

export default App;
