import { Link } from 'react-router-dom';
import { Zap, ArrowRight } from 'lucide-react';

export default function Header() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-slate-950/50 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-indigo-600 rounded-lg group-hover:bg-indigo-500 transition-colors">
                        <Zap className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        OptiPix
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                    <a href="#features" className="hover:text-white transition-colors">Features</a>
                    <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
                    <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center gap-4">
                    <Link to="/login" className="text-slate-300 hover:text-white text-sm font-medium transition-colors hidden sm:block">
                        Sign In
                    </Link>
                    <Link
                        to="/register"
                        className="flex items-center gap-2 bg-white text-slate-950 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-200 transition-all transform hover:scale-105"
                    >
                        Get Started <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </nav>
    );
}