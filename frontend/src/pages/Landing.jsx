import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Shield, Smartphone, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';

const Landing = () => {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 overflow-hidden">
      
      {/* Liquid Glass Background Effects */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen" />

      {/* Reusable Glassmorphism Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-20 flex flex-col items-center justify-center text-center min-h-screen">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl flex flex-col items-center"
        >
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-slate-300">The next generation of note-taking</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
            Think clearly.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400">
              Work brilliantly.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Capture your ideas in a beautiful, distraction-free environment. Powered by the cloud, designed for your mind.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 bg-indigo-500 hover:bg-indigo-600 rounded-xl font-medium text-white shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-colors w-full sm:w-auto"
              >
                Start Taking Notes for Free
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium backdrop-blur-md transition-colors w-full sm:w-auto text-slate-300 hover:text-white"
              >
                Log In to Workspace
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Features Bento Box Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Everything you need, <span className="text-indigo-400">nothing you don't.</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A minimalist interface hiding a powerhouse of features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1: Large Span */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 bg-slate-900/50 backdrop-blur-sm border border-white/5 p-8 rounded-3xl hover:bg-slate-800/50 transition-colors"
          >
            <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/30">
              <Zap className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Lightning Fast Sync</h3>
            <p className="text-slate-400 leading-relaxed">
              Your notes are instantly saved to the cloud and synced across all your devices in real-time. Never lose a thought again.
            </p>
          </motion.div>

          {/* Feature 2: Small Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-white/5 p-8 rounded-3xl hover:bg-slate-800/50 transition-colors"
          >
            <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/30">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Bank-Grade Security</h3>
            <p className="text-slate-400">
              End-to-end encryption with secure JWT authentication.
            </p>
          </motion.div>

          {/* Feature 3: Small Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-white/5 p-8 rounded-3xl hover:bg-slate-800/50 transition-colors"
          >
            <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/30">
              <Globe className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Access Anywhere</h3>
            <p className="text-slate-400">
              Built for the web. Access your workspace from any browser.
            </p>
          </motion.div>

          {/* Feature 4: Large Span */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 bg-slate-900/50 backdrop-blur-sm border border-white/5 p-8 rounded-3xl hover:bg-slate-800/50 transition-colors overflow-hidden relative"
          >
            <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/30 relative z-10">
              <Smartphone className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 relative z-10">Beautifully Responsive</h3>
            <p className="text-slate-400 leading-relaxed relative z-10 max-w-md">
              Whether you are on a massive 4K monitor or your smartphone, the UI adapts perfectly to give you the best writing experience.
            </p>
            {/* Decorative background element for this specific card */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[50px]" />
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Landing;