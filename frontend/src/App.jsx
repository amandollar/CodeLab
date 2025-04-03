import React from 'react'
import { Routes, Route, Link ,BrowserRouter} from "react-router-dom";
import Landing from './Pages/Landing';
import SyncGridHome from './Pages/SyncGridHome';
import  Dashboard from './Pages/Dashboard'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Landing/>}/>
    <Route path='/home' element={<SyncGridHome/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
