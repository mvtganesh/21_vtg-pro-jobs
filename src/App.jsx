import React, { useEffect } from 'react'
import logo from "./assets/01.png";
// importing home,about,me,notifications to navigation to particular page we use it in header place
import Home from './components/Home'
import Logo from "./components/Logo"
import About from './components/About'
import LoginRegister from './components/LoginRegister'
import WishList from './components/WishList'
import MoreInfo from './pages/MoreInfo'
import AppliedJobs from './components/AppliedJobs';
import Profile from './components/Profile'
import Landing from './pages/Landing'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from "./pages/Error"
import "./App.css"
export default function App() {

useEffect(() => {
  document.title = "VTG Pro Jobs";
  document.querySelector("link[rel='icon']").href = logo;
}, [])

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/home' element={<Home/>} />
                <Route path='/about' element={<About/>}/>
                <Route path='/loginregister' element={<LoginRegister/>}/>
                <Route path='/wishlist' element={<WishList/>}/>
                <Route path='/moreInfo/:useParamJobId' element={<MoreInfo/>}/>
                <Route path='/appliedjobs' element={<AppliedJobs/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/logopage' element={<Logo/>}/>
                <Route path='*' element={<Error/>}/>
                <Route path='/' element={<Landing/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}
