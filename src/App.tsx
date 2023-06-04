import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BabylonCanvas } from './Babylon/BabylonCanvas/BabylonCanvas';
import { Home } from './pages/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/basic-scene' element={<BabylonCanvas/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
