import { Route, Routes } from 'react-router'
import Home from './Component/Home.jsx'
import Office from './Component/Office.jsx'
import LibraryLogin from './Component/LibraryLogin.jsx'
import './App.css'


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LibraryLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/office" element={<Office />} />
        <Route path="*" element={<LibraryLogin />} />
      </Routes>
    </div>
  )
}

export default App
