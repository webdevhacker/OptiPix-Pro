import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, Lock, ArrowRight, KeyRound } from 'lucide-react'; // ✅ Added KeyRound for OTP

export default function Auth() {
    // Modes: 'login', 'register', 'forgot', 'verifyOtp'
    const [mode, setMode] = useState('login');
    const [formData, setFormData] = useState({ email: '', password: '', otp: '', newPassword: '' });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const API = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (location.pathname === '/register') setMode('register');
        else if (location.pathname === '/login') setMode('login');
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (mode === 'login') {
                const { data } = await axios.post(`${API}/auth/login`, { email: formData.email, password: formData.password });
                login(data);
                navigate('/dashboard');
                toast.success('Welcome back!');
            }
            else if (mode === 'register') {
                const { data } = await axios.post(`${API}/auth/register`, { email: formData.email, password: formData.password });
                toast.success(data.message);
                setMode('login');
            }
            else if (mode === 'forgot') {
                // 1. Request OTP
                const { data } = await axios.post(`${API}/auth/forgotpassword`, { email: formData.email });
                toast.success(data.message);
                setMode('verifyOtp'); // Switch to OTP Input
            }
            else if (mode === 'verifyOtp') {
                // 2. Submit OTP & New Password
                const { data } = await axios.post(`${API}/auth/reset-password-otp`, {
                    email: formData.email,
                    otp: formData.otp,
                    newPassword: formData.newPassword
                });
                toast.success(data.message);
                setMode('login');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-slate-950">
            {/* --- Background Effects --- */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[100px] animate-pulse delay-700" />
            <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[80px]" />

            {/* --- Main Card --- */}
            <div className="relative z-10 w-full max-w-[420px] p-6">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-8 overflow-hidden relative">

                    {/* Top shine effect */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 mb-4 shadow-lg shadow-indigo-500/30">
                            {mode === 'verifyOtp' ? (
                                <KeyRound className="w-6 h-6 text-white" />
                            ) : (
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            )}
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                            {mode === 'login' && 'Welcome Back'}
                            {mode === 'register' && 'Join OptiPix'}
                            {mode === 'forgot' && 'Reset Password'}
                            {mode === 'verifyOtp' && 'Enter Security Code'}
                        </h2>
                        <p className="text-slate-400 text-sm">
                            {mode === 'login' && 'Enter your details to access your workspace.'}
                            {mode === 'register' && 'Start optimizing your images in seconds.'}
                            {mode === 'forgot' && 'We will send a code to your email.'}
                            {mode === 'verifyOtp' && `Code sent to ${formData.email}`}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-4">

                            {/* EMAIL INPUT (Visible in Login, Register, Forgot) */}
                            {mode !== 'verifyOtp' && (
                                <div className="group">
                                    <div className="relative transition-all duration-300 focus-within:scale-[1.02]">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                        </div>
                                        <input
                                            type="email"
                                            required
                                            className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                                            placeholder="name@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* PASSWORD INPUT (Visible in Login, Register) */}
                            {(mode === 'login' || mode === 'register') && (
                                <div className="group">
                                    <div className="relative transition-all duration-300 focus-within:scale-[1.02]">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                        </div>
                                        <input
                                            type="password"
                                            required
                                            className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* OTP INPUTS (Only Visible in verifyOtp) */}
                            {mode === 'verifyOtp' && (
                                <>
                                    <div className="group">
                                        <div className="relative transition-all duration-300 focus-within:scale-[1.02]">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <KeyRound className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                            </div>
                                            <input
                                                type="text"
                                                maxLength="6"
                                                required
                                                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600 font-mono tracking-[0.5em] text-center"
                                                placeholder="123456"
                                                value={formData.otp}
                                                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="group">
                                        <div className="relative transition-all duration-300 focus-within:scale-[1.02]">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                            </div>
                                            <input
                                                type="password"
                                                required
                                                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                                                placeholder="New Password"
                                                value={formData.newPassword}
                                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Forgot Password Link */}
                        {mode === 'login' && (
                            <div className="flex justify-end">
                                <button type="button" onClick={() => setMode('forgot')} className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        {/* Main Action Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {loading ? "Processing..." : (
                                <>
                                    {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Get Started' : mode === 'forgot' ? 'Send Code' : 'Reset Password'}
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer Switcher */}
                    <div className="text-center mt-6">
                        {mode === 'verifyOtp' ? (
                            <p className="text-sm text-slate-400">
                                Didn't receive code?{' '}
                                <button
                                    onClick={() => setMode('forgot')}
                                    className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                                >
                                    Resend
                                </button>
                            </p>
                        ) : (
                            <p className="text-sm text-slate-400">
                                {mode === 'login' ? "New here? " : "Already have an account? "}
                                <button
                                    onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                                    className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                                >
                                    {mode === 'login' ? 'Create an account' : 'Sign in'}
                                </button>
                            </p>
                        )}
                    </div>
                </div>

                {/* Copyright */}
                <p className="text-center text-slate-600 text-xs mt-8">
                    &copy; 2025 OptiPix Pro. All rights reserved.
                </p>
            </div>
        </div>
    );
}