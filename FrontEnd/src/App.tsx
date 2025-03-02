import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import BuyerLogin from './Pages/BuyerLogin';
import SellerLogin from './Pages/SellerLogin';

function App() {


  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/BuyerLogin" element={<BuyerLogin/>}/>
        <Route path="/SellerLogin" element={<SellerLogin/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
