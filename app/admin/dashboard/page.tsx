import AdminLayout from '@/components/admin/adminLayout'
import Dashboard from './Dashboard'

export const metadata = {
  title: 'Admin Dashboard',
}
const DashbaordPage = () => {
  return (
    <AdminLayout activeItem="dashboard">
      <Dashboard />
    </AdminLayout>
  )
}

export default DashbaordPage