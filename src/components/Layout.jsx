import { Outlet } from 'react-router-dom'
import OrientationLocker from './OrientationLocker'

export default function Layout() {
  return (
    <OrientationLocker>
      <div className="h-screen w-screen overflow-hidden bg-black text-white">
        <Outlet />
      </div>
    </OrientationLocker>
  )
}
