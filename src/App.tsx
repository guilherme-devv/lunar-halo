import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Driver } from './pages/Driver';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/driver" element={<Driver />} />
    </Routes>
  );
}

export default App;
