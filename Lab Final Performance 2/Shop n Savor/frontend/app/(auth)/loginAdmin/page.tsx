import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>(''); // Explicitly specify the type as string

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    try {
      const response = await axios.post('/api/login', { username, password });
      const { token } = response.data;

      // Save JWT token as cookie
      document.cookie = `jwtToken=${token}; path=/`;

      // Redirect to dashboard or any other page
      window.location.href = '/dashboard';
    } catch (error: any) { // Specify any type for catch block
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password.');
      } else {
        setError('An error occurred during login.');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
