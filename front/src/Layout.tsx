import Titulo from './admin/components/Titulo.tsx'
import { Outlet } from 'react-router-dom'
import { Toaster} from 'sonner'

export default function Layout() {
  return (
    <>
      <Titulo />
      <Outlet />
      <Toaster richColors position='top-center'/>
    </>
  )
}
