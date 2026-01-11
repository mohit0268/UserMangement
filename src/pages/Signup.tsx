import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { authService } from '../services/getData';
import Form from '../components/Form';
import Layout from '../components/layout';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authService.register(email, password);

      if (response.data.token) {
        login(response.data.token, response.data.user);
        navigate('/dashboard');
      } else {
        alert('Registration successful, but no token received. Please sign in.');
        navigate('/signin');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Registration failed: ${errorMessage}`);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </Form>
    </Layout>
  );
};

export default SignUp;