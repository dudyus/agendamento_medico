import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { Toaster } from 'sonner'
import { useAdminStore } from "../admin/context/AdminContext"

import { useNavigate } from "react-router-dom"

import  Titulo  from './components/Titulo.tsx'
import { MenuLateral } from './components/MenuLateral.tsx'

export default function AdminLayout() {
  const { admin } = useAdminStore()

//  console.log(admin)
  const navigate = useNavigate()

  useEffect(() => {
    if (Object.keys(admin).length == 0) {
      navigate("/admin/login", { replace: true })
    }
  }, [])

  if (Object.keys(admin).length == 0) {
    return null
  }

  return (
    <>
      <Titulo />
      <div className="flex min-h-screen">
        <MenuLateral />
        <div className="flex-1 p-4 bg-gray-100 ">
          <Outlet />
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </>
  )
}