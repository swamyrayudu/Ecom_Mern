


import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Adminheader from './Header'
import AdminSideBar from './sidebar'

export default function Adminlayout() {

  const [opensidbar, setopensidebar] =useState(false)

  return (
    <div className='flex min-h-screen w-full'>
        <AdminSideBar open={opensidbar} setopen={setopensidebar}/>
      <div className='flex flex-1 flex-col'>
      <Adminheader setopen={setopensidebar}/>
        <main className='flex-1 flex-col flex bg-neutral-100 p-4'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
