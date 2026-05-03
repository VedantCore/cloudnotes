import { Link } from 'react-router-dom';
import { Cloud } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed w-full z-50 bg-slate-950/60 backdrop-blur-xl border-b border-white/5 top-0"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 group-hover:bg-indigo-400 transition-all duration-300">
            <Cloud className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            CloudNotes<span className="text-indigo-400">Pro</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {/* Hidden on mobile, visible on medium screens and up */}
          <div className="hidden md:flex items-center gap-6 mr-4">
            <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Testimonials
            </a>
          </div>
          
          {/* Vertical Divider */}
          <div className="w-px h-6 bg-slate-800 hidden md:block"></div>

          {/* Authentication Action Buttons */}
          <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link to="/register" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm font-medium backdrop-blur-md transition-all shadow-lg hover:shadow-white/5">
            Get Started
          </Link>
        </div>

      </div>
    </motion.nav>
  );
};

export default Navbar;