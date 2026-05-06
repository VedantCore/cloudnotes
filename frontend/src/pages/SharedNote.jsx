import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Cloud, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';

const SharedNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/notes/share/${id}`);
        setNote(data);
      } catch (err) {
        setError('This note does not exist or has been deleted.');
      }
    };
    fetchNote();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
        <h2 className="text-2xl font-bold text-white mb-2">Oops!</h2>
        <p>{error}</p>
        <Link to="/" className="mt-6 text-indigo-400 hover:underline">Go to CloudNotes Pro</Link>
      </div>
    );
  }

  if (!note) return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><Cloud className="w-8 h-8 text-indigo-500 animate-pulse" /></div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 py-20 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-10 shadow-2xl"
      >
        <div className="flex items-center gap-2 mb-8 pb-8 border-b border-slate-800">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <Cloud className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">CloudNotes<span className="text-indigo-400">Pro</span></span>
        </div>

        <h1 className="text-5xl font-bold mb-6 text-slate-100">{note.title || 'Untitled Note'}</h1>
        
        <div className="flex items-center gap-6 text-sm text-slate-500 mb-12">
          <span className="flex items-center gap-2"><User className="w-4 h-4" /> By {note.user?.username || 'Unknown'}</span>
          <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(note.updatedAt).toLocaleDateString()}</span>
        </div>

        <div className="prose prose-invert prose-indigo max-w-none">
           {/* In a production app, we would use a markdown parser here like 'react-markdown' */}
           <p className="whitespace-pre-wrap text-lg leading-relaxed text-slate-300">{note.content}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default SharedNote;