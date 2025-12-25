import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-slate-950 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold text-white mb-4">OptiPix</h3>
                        <p className="text-slate-400 max-w-sm">
                            The next-generation image optimization platform. Reduce file sizes by up to 90% without losing quality using our advanced AI-driven algorithms.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Product</h4>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li><a href="#" className="hover:text-indigo-400">Features</a></li>
                            <li><a href="#" className="hover:text-indigo-400">API Documentation</a></li>
                            <li><a href="#" className="hover:text-indigo-400">Pricing</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Legal</h4>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li><a href="#" className="hover:text-indigo-400">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-indigo-400">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} OptiPix Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github size={20} /></a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}