import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Main from './components/pages/Main';
import Login from "./components/pages/Login";
import ProductDetail from './components/pages/ProductDetail';
import Cart from "./components/pages/Cart";
import Profile from "./components/pages/Profile";
import Join from './components/pages/Join';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='detail/:id' element={<ProductDetail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
