import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from "./components/layout/Header";
import ProductDetails from './components/products/ProductDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <div className='container  container-fluid'>
          <Routes>
            <Route path='/' element={<Home/>} exact/>
            <Route path='/search/:keyword' element={<Home/>} />
            <Route path='/product/:id' element={<ProductDetails/>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
