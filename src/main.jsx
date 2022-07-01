import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import ExploadingCrystal from './pages/ExplodingCrystal'
import FloatingShoes from './pages/FloatingShoes'
import Ballpit from './pages/Ballpit'

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <ExploadingCrystal /> */}
    {/* <FloatingShoes /> */}
    <Ballpit />
  </React.StrictMode>,
  document.getElementById('root')
)
