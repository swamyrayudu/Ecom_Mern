


import React from 'react'
import { Outlet } from 'react-router-dom'
import Adminheader from './Header'


export default function Adminlayout() {



  return (
    <div className='flex min-h-screen w-full'>
       
      <div className='flex flex-1 flex-col'>
      <Adminheader />
        <main className='flex-1 flex-col flex bg-neutral-100 p-4'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
