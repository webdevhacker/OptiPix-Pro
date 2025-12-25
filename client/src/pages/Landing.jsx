import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Zap, Shield, Layers, Image as ImageIcon, CheckCircle, ArrowRight } from 'lucide-react';

export default function Landing() {
    return (
        <div className="min-h-screen bg-slate-950 selection:bg-indigo-500 selection:text-white">
            <Header />

            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-600/20 rounded-full blur-[100px] -z-10" />

                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        v2.0 is now live
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                        Optimize Images <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
                            Lightning Fast.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Reduce file size by up to 80% without losing quality.
                        Supported formats: WEBP, AVIF, PNG, JPEG.
                        Secure, private, and instant.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/register"
                            className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg transition-all shadow-lg shadow-indigo-600/25 w-full sm:w-auto"
                        >
                            Start Optimizing Free
                        </Link>
                        <a
                            href="#demo"
                            className="px-8 py-4 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg transition-all border border-slate-700 w-full sm:w-auto"
                        >
                            View Demo
                        </a>
                    </div>
                </div>
            </section>

            {/* --- STATS SECTION --- */}
            <section className="border-y border-white/5 bg-white/5 backdrop-blur-sm py-10">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { label: 'Images Processed', value: '1M+' },
                        { label: 'Bandwidth Saved', value: '500TB' },
                        { label: 'Uptime', value: '99.9%' },
                        { label: 'Happy Users', value: '10k+' },
                    ].map((stat, i) => (
                        <div key={i}>
                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-slate-500 text-sm uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- FEATURES SECTION --- */}
            <section id="features" className="py-24 bg-slate-950 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why choose OptiPix?</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            We combine advanced compression algorithms with a seamless user experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Zap className="w-6 h-6 text-yellow-400" />,
                                title: "Blazing Fast",
                                desc: "Powered by Node.js Sharp, our engine processes images in milliseconds, not seconds."
                            },
                            {
                                icon: <Shield className="w-6 h-6 text-emerald-400" />,
                                title: "Secure & Private",
                                desc: "Your images are processed in memory and never stored permanently on our servers."
                            },
                            {
                                icon: <Layers className="w-6 h-6 text-indigo-400" />,
                                title: "Multi-Format",
                                desc: "Convert effortlessly between JPG, PNG, WEBP, and AVIF with a single click."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:bg-slate-800/50 transition-all hover:border-indigo-500/50 group">
                                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA SECTION --- */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="bg-gradient-to-r from-indigo-900 to-slate-900 border border-indigo-500/30 rounded-3xl p-12 text-center relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
                            Ready to speed up your website?
                        </h2>
                        <p className="text-slate-300 mb-8 max-w-xl mx-auto relative z-10">
                            Join thousands of developers using OptiPix to deliver faster, lighter web experiences today.
                        </p>
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 bg-white text-indigo-900 px-8 py-3 rounded-lg font-bold hover:bg-indigo-50 transition-colors relative z-10"
                        >
                            Get Started Now <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}