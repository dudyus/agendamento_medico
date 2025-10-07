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
      <MenuLateral />
      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>
      <Toaster richColors position="top-right" />
    </>
  )
}