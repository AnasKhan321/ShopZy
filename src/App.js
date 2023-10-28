import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home'; 
import Footer from './Components/Footer'; 
import ProductView from './Components/ProductView'; 
import Login from './Components/Login'; 
import Signup from './Components/Signup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Addprod from './Components/Addprod.js'
import Tshirt from './Components/Tshirt.js'; 
import Mobile from './Components/Mobile'; 
import Laptop from './Components/Laptop'; 
import Myorder from './Components/Myorder';
import OrderDetail from './Components/OrderDetail'; 
import Myprofile from './Components/Myprofile'; 
import React ,{useState , useEffect} from 'react'; 
import Checkout from './Components/Checkout'
import SearchBar from './Components/SearchBar'
import Search from './Components/Search'

function App() {
  const [key, setkey] = useState('category')
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer/>
      <Routes>
          <Route exact path='/'  element={<Home key="home" />} /> 
          <Route  exact path='/product' element={<ProductView key="product" />} />
          <Route exact path='/login'  element={<Login  key="login" />}  />
          <Route exact path='/signup'  element={<Signup  key="signup" />} />
          <Route exact path='/addprod' element={<Addprod key="addprod" /> } /> 
          <Route exact path='/tshirt' element={<Tshirt key="tshirt" /> } /> 
          <Route exact path='/laptop' element={<Laptop key="laptop" /> } /> 
          <Route exact path='/mobile' element={<Mobile key="mobile" /> } /> 
          <Route exact path='/checkout' element={<Checkout key="checkout" /> } /> 
          <Route exact path='/myorder' element={<Myorder key="myorder" /> } /> 
          <Route exact path='/orderdetail' element={<OrderDetail key="orderdetail" /> } /> 
          <Route exact path='/myprofile' element={<Myprofile key="myprofile" /> } /> 
          <Route exact path='/search' element={<Search key="search" /> } /> 








      </Routes>

      <Footer/>

    </BrowserRouter>



  )
}

export default App;
