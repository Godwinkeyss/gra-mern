
import './App.css';
import Header from './components/Header';
// import Slider from './components/Slider';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomeScreen from './pages/HomeScreen';
// import Container from 'react-bootstrap/Container';
import ProductScreen from './pages/ProductScreen';
import CartScreen from './pages/CartScreen';
import SigninScreen from './pages/SigninScreen';
import SignupScreen from './pages/SignupScreen';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingAddressScreen from './pages/ShippingAddressScreen';
import { PaymentMethodScreen } from './pages/PaymentMethodScreen';
import PlaceOrderScreen from './pages/PlaceOrderScreen';
import OrderScreen from './pages/OrderScreen';
import OrderHistoryScreen from './pages/OrderHistoryScreen';
import ProfileScreen from './pages/ProfileScreen';

function App() {
  return (
    <BrowserRouter>
   
    <div className="site-container d-flex flex-column">
    <ToastContainer position="bottom-center" limit={1} />
      <header>
         <Header />
      </header>
      <main className='main'>
      
      <Routes>
       <Route path="/" element={<HomeScreen />} />
       <Route path="/product/:slug" element={<ProductScreen />}/>
       <Route path="/cart" element={<CartScreen />}/>
       <Route path="/signin" element={<SigninScreen />} />
       <Route path="/signup" element={<SignupScreen />} />
       <Route path="/profile" element={<ProfileScreen />} />
       <Route path="/shipping" element={<ShippingAddressScreen />} />
       <Route  path="/payment" element={<PaymentMethodScreen />} />
       <Route path="/placeorder" element={<PlaceOrderScreen />} />
       <Route path="/order/:id" element={<OrderScreen />} />
       <Route path="/orderhistory" element={<OrderHistoryScreen />} />
       </Routes>
      
      </main>
      <footer className="bg-dark mt-3" variant="dark">
         <div className="text-center text-white py-3">
          all right reserved &copy; {new Date().getFullYear()}
         </div>
      </footer>
    </div>
   
    </BrowserRouter>
  );
}

export default App;
