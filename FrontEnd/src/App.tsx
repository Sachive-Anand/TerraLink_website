import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import BuyerLogin from './Pages/BuyerLogin';
import SellerLogin from './Pages/SellerLogin';
import Explore from './Pages/Explore';

function App() {


  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/buyerLogin" element={<BuyerLogin/>}/>
        <Route path="/sellerLogin" element={<SellerLogin/>}/>
        <Route path="/explore" element={<Explore/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
