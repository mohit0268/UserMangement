import { useEffect } from 'react';
import { useUserStore } from '../stores/userStore';
import { useAuthStore } from '../stores/authStore';
import Layout from '../components/layout';

const Dashboard = () => {
  const { users, fetchUsers } = useUserStore();
  const { logout } = useAuthStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <button onClick={logout} className="bg-red-500 text-white py-2 px-4 rounded">Logout</button>
      <ul className="mt-4 space-y-2">
        {users.map((user) => <li key={user.id} className="p-2 bg-gray-200 rounded">{user.email}</li>)}
      </ul>
    </Layout>
  );
};

export default Dashboard;