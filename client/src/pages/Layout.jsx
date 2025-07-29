import React from 'react'
import { Outlet } from 'react-router-dom'
import './Layout.scss'
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

function Layout() {
    
  return (
    <div className='layout'>
      <div className="layout_header">
        <Header />
      </div>
      <div className="layout_header_outlet"> 
        <Outlet />
      </div>
        {/* <Footer /> */}
    </div>
  )
}

export default Layout