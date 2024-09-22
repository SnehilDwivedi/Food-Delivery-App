import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from './components/ContextReducer.js';

// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css'; // Optional for dark mode
import MyOrder from './screens/MyOrder.js';

function App() {
  // The parent return statement should contain only one root element, which is <CartProvider> here
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Define routes and components */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createuser" element={<Signup />} />
          <Route exact path="/myOrder" element={<MyOrder />} />
       
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
