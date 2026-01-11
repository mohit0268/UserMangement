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

    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }
    



    
  try {
    console.log('Starting login attempt...'); // Debug log
    const response = await authService.login(email, password);
    console.log('Login response received:', response); // Debug log

    if (response.data.token) {
      console.log('Token found, logging in...'); // Debug log
      login(response.data.token, {
          email,
          id: 0,
          firstname: '',
          lastname: ''
      });
      navigate('/dashboard');
    } else {
      alert('Login succeeded but no token received. Please try again.');
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Login error details:', error); // Debug log
    const errorMessage = error.response?.data?.error || error.message || 'Unknown error';
    alert(`Login failed: ${errorMessage}`);
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