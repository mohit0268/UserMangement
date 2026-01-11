import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { authService } from '../services/getData';
import Form from '../components/Form';
import Layout from '../components/Layout';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authService.login(email, password);
      login(response.data.token, response.data.user);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed');
      console.error('Login error:', error);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <Form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" />
      </Form>
    </Layout>
  );
};

export default SignIn;