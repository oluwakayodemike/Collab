import './App.css'
import Home from './components/Home/Home';
import Room from './components/Room/Room';
import { Routes, Route } from 'react-router-dom';

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Room />} />
      </Routes>
    </div>
  );
};

export default App
