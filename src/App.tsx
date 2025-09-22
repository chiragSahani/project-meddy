import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Dashboard } from './pages/Dashboard';
import { Highlights } from './pages/Highlights';

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/highlights" element={<Highlights />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;