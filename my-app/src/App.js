
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './Componenets/Pages/Signin';
import Login from './Componenets/Pages/Login';
import Home from './Componenets/Pages/Home';
import Contact from './Componenets/Compnt/Contact';
import Homes from './Componenets/Compnt/Homes';

function App() {
 
  return (
    <div className="App">
  <BrowserRouter>
  <Routes>
  <Route path='/' element={<Home/>}>
  <Route path='/contactform' element={<Contact/>}/>
  </Route>
  <Route path='/home' element={<Homes/>}/>
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/login' element={<Login/>}/>

  </Routes>
  </BrowserRouter>
   
    
    </div>
  );
}

export default App;
