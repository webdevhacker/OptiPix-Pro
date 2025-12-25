import { Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Landing from './pages/Landing';

import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

// --- Helper Components for Special Routes ---

function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState('Verifying...');
  const navigate = useNavigate();

  useEffect(() => {
    axios.put(`${import.meta.env.VITE_API_URL}/auth/verify/${token}`)
      .then(() => {
        setStatus('Verified! Redirecting...');
        setTimeout(() => navigate('/'), 2000);
      })
      .catch((err) => setStatus(err.response?.data?.message || 'Verification Failed'));
  }, [token]);

  return <div className="min-h-screen grid place-items-center text-white text-xl">{status}</div>;
}

function ResetPassword() {
  const { token } = useParams();
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/auth/resetpassword/${token}`, { password: pass });
      navigate('/');
    } catch (err) { alert('Error resetting password'); }
  };

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <form onSubmit={handleReset} className="glass-panel p-8 w-full max-w-sm">
        <h2 className="text-white text-xl mb-4">New Password</h2>
        <input type="password" value={pass} onChange={e => setPass(e.target.value)} className="input-field mb-4" placeholder="Enter new password" required />
        <button className="btn-primary w-full">Update Password</button>
      </form>
    </div>
  )
}

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{ style: { background: '#1e293b', color: '#fff' } }} />
      <Routes>
        {/* Change the root path to Landing */}
        <Route path="/" element={<Landing />} />

        {/* Move Auth to /login and /register if you prefer, or handle inside Auth component */}
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />

        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  );
}