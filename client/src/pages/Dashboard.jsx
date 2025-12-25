import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Upload, Download, Settings, Image as ImageIcon, LogOut, Coins } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Dashboard() {
    const { logout } = useAuth();
    const [file, setFile] = useState(null);
    const [options, setOptions] = useState({ quality: 80, width: '', format: 'webp' });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [credits, setCredits] = useState(0); // 1. Add Credit State

    // 2. Fetch Credits on Page Load
    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCredits(res.data.credits);
            } catch (error) {
                console.error("Failed to fetch credits", error);
            }
        };
        fetchCredits();
    }, []);

    const handleOptimize = async () => {
        if (!file) return;
        setLoading(true);

        const formData = new FormData();
        formData.append('image', file);
        Object.keys(options).forEach(key => formData.append(key, options[key]));

        try {
            const token = localStorage.getItem('token');
            // 3. Send Token in Headers
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/image/optimize`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setResult(res.data);
            setCredits(res.data.remainingCredits); // 4. Update Credits from Response
            toast.success("Image Optimized! 1 Credit used.");

        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Optimization failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <header className="flex justify-between items-center mb-10">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">OptiPix Pro</h1>

                <div className="flex items-center gap-6">
                    {/* --- Credit Display --- */}
                    <div className="glass-panel px-4 py-1.5 flex items-center gap-2 text-yellow-400 border-yellow-500/30">
                        <Coins size={18} />
                        <span className="font-bold font-mono">{credits} Credits</span>
                    </div>

                    <button onClick={logout} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Controls Panel */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-panel p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Settings size={18} /> Settings</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Format</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['webp', 'jpeg', 'png'].map(fmt => (
                                        <button
                                            key={fmt}
                                            onClick={() => setOptions({ ...options, format: fmt })}
                                            className={`py-2 text-xs uppercase rounded border ${options.format === fmt ? 'bg-indigo-600 border-indigo-500' : 'bg-transparent border-slate-700 hover:border-slate-500'}`}
                                        >
                                            {fmt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Quality: {options.quality}%</label>
                                <input
                                    type="range" min="10" max="100"
                                    value={options.quality}
                                    onChange={(e) => setOptions({ ...options, quality: e.target.value })}
                                    className="w-full accent-indigo-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Max Width (px)</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 1920"
                                    className="input-field py-2 text-sm"
                                    value={options.width}
                                    onChange={(e) => setOptions({ ...options, width: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-6 border-dashed border-2 border-slate-700 hover:border-indigo-500 transition-colors cursor-pointer text-center"
                        onClick={() => document.getElementById('file-upload').click()}>
                        <input id="file-upload" type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} accept="image/*" />
                        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Upload className="text-indigo-400" />
                        </div>
                        <p className="font-medium text-slate-300">{file ? file.name : "Click to Upload Image"}</p>
                    </div>

                    {/* Updated Button logic */}
                    <button
                        onClick={handleOptimize}
                        disabled={!file || loading || credits <= 0}
                        className="btn-primary w-full py-3 text-lg shadow-lg shadow-indigo-500/20 disabled:grayscale disabled:cursor-not-allowed"
                    >
                        {loading ? "Processing..." : credits > 0 ? "Optimize (1 Credit)" : "Insufficient Credits"}
                    </button>
                </div>

                {/* Preview Area */}
                <div className="lg:col-span-2">
                    <div className="glass-panel h-full min-h-[500px] p-6 flex flex-col items-center justify-center relative">
                        {result ? (
                            <>
                                <div className="relative w-full h-full flex items-center justify-center bg-slate-900/50 rounded-xl overflow-hidden mb-4">
                                    <img src={result.data} className="max-w-full max-h-[500px] object-contain" alt="Optimized" />
                                </div>

                                <div className="w-full grid grid-cols-2 gap-4 text-center">
                                    <div className="bg-slate-800/50 p-3 rounded-lg">
                                        <p className="text-xs text-slate-400">Original Size</p>
                                        <p className="text-white font-mono">{(result.originalSize / 1024).toFixed(1)} KB</p>
                                    </div>
                                    <div className="bg-green-900/20 border border-green-900/50 p-3 rounded-lg">
                                        <p className="text-xs text-green-400">Optimized Size</p>
                                        <p className="text-white font-mono">{(result.optimizedSize / 1024).toFixed(1)} KB</p>
                                    </div>
                                </div>

                                <a
                                    href={result.data}
                                    download={`optimized.${options.format}`}
                                    className="mt-6 flex items-center gap-2 text-indigo-400 hover:text-white transition-colors"
                                >
                                    <Download size={20} /> Download Result
                                </a>
                            </>
                        ) : (
                            <div className="text-slate-600 flex flex-col items-center">
                                <ImageIcon size={64} className="mb-4 opacity-20" />
                                <p>Upload an image to see the preview</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}