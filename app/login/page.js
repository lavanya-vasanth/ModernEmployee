'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { isAdmin } from '../../utils/auth';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const handleUserLogin = () => {
    router.push('/user/dashboard');
  };

  const handleAdminLogin = () => {
    if (isAdmin(username, password)) {
      router.push('/admin/dashboard');
    } else {
      alert('Invalid admin credentials');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Login Page</h1>

        {!showAdminLogin ? (
          <>
            <button onClick={handleUserLogin}>Login as User</button>
            <button onClick={() => setShowAdminLogin(true)}>Login as Admin</button>
          </>
        ) : (
          <div>
            <h2>Admin Login</h2>
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleAdminLogin}>Login</button>
            <button onClick={() => setShowAdminLogin(false)}>Back</button>
          </div>
        )}
      </div>
    </div>
  );
}
