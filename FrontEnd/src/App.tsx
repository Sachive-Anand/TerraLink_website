import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import BuyerLogin from './Pages/BuyerLogin';
import SellerLogin from './Pages/SellerLogin';
import Explore from './Pages/Explore';
import BuyerLanding from './Pages/BuyerLanding';
import ExploreBuyer from './Pages/ExploreBuyer';
import Favourites from './Pages/Favourites';

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
        <Route path="/buyerlanding" element={<BuyerLanding/>}/>
        <Route path="/explorebuyer" element={<ExploreBuyer/>}/>
        <Route path="/favorites" element={<Favourites/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
