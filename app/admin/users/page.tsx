import AdminLayout from '@/components/admin/adminLayout'
import Users from './Users'

export const metadata = {
  title: 'Admin Users',
}
const AdminUsersPage = () => {
  return (
    <AdminLayout activeItem="users">
      <Users />
    </AdminLayout>
  )
}

export default AdminUsersPage