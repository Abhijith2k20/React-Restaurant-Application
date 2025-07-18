import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'
import Product from './Pages/Product'
import About from './Pages/About'




const Routers = () => {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/About'} element={<About/>}/>
        <Route path={'/Contact'} element={<Contact/>}/>
        <Route path={'/Product'} element={<Product/>}/>
        <Route path={'/Cart'} element={<Cart/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}
export default Routers
