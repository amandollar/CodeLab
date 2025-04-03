import React from 'react'
import { Routes, Route, Link ,BrowserRouter} from "react-router-dom";
import Landing from './Pages/Landing';
import SyncGridHome from './Pages/SyncGridHome';
import  Dashboard from './Pages/Dashboard'
import SyncGridSetup from './Pages/SyncGridSetUp'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Landing/>}/>
    <Route path='/home' element={<SyncGridHome/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/addSync' element={<SyncGridSetup/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
