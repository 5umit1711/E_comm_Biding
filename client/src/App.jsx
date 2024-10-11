import React from "react"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import Protected from "./components/Protected"
import Spinner from "./components/Spinner"
import Profile from "./components/Profile"
import { useSelector } from "react-redux"
import Admin from "./components/Admin"
import ProductInfo from "./components/ProductInfo"

const App  = ()=> {
  const loading = useSelector(state => state.loader.loading);
  return (
    <div>
      {loading && <Spinner/>}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Protected> <Home/> </Protected>} />
          <Route path="/profile" element={<Protected> <Profile/> </Protected>} />
          <Route path="/admin" element={<Protected> <Admin/> </Protected>} />
          <Route path="/product/:id" element={<Protected> <ProductInfo/> </Protected>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
