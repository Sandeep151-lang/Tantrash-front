import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter ,Routes, Route} from 'react-router-dom'
import SupplierData from './components/SupplierData';
import 'react-toastify/dist/ReactToastify.css';
import Suppliers from './components/Suppliers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/supplier" element={<Suppliers/>}/>
        <Route exact path="/" element={<SupplierData/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
