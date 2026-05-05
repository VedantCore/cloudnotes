import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  LogOut, Search, Plus, FileText, Settings, Cloud, 
  MoreVertical, Calendar, Book, CheckSquare, 
  ChevronRight, ChevronDown, Bold, Italic, Underline, 
  Heading1, List, ArrowLeft, Save, Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // --- STATE MANAGEMENT ---
  const [activeMenu, setActiveMenu] = useState('notes');
  const [expandedNote, setExpandedNote] = useState(null);
  const [booksOpen, setBooksOpen] = useState(true);
  const [notes, setNotes] = useState([]); // Now starts empty!
  const [isLoading, setIsLoading] = useState(true);

  // Mock Data for non-essential features
  const [books] = useState([
    { id: 'b1', name: 'Personal Journal' },
    { id: 'b2', name: 'Work Projects' },
    { id: 'b3', name: 'Ideas & Brainstorming' }
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, text: 'Deploy backend to Render', completed: false },
    { id: 2, text: 'Setup custom domain', completed: false },
  ]);

  // --- API INTEGRATION (The Magic Happens Here) ---
  const token = localStorage.getItem('token');

  // 1. Fetch Notes on Load
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/notes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
        if (error.response?.status === 401) handleLogout();
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [token]);

  // 2. Save (Create or Update) a Note
  const handleSaveNote = async () => {
    if (!expandedNote.title && !expandedNote.content) return;

    try {
      if (expandedNote._id) {
        // UPDATE existing note
        const { data } = await axios.put(
          `http://localhost:5000/api/notes/${expandedNote._id}`, 
          { title: expandedNote.title, content: expandedNote.content, bookId: expandedNote.bookId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotes(notes.map(n => n._id === data._id ? data : n));
      } else {
        // CREATE new note
        const { data } = await axios.post(
          'http://localhost:5000/api/notes',
          { title: expandedNote.title, content: expandedNote.content, bookId: expandedNote.bookId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotes([data, ...notes]);
      }
      setExpandedNote(null); // Close editor after saving
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  // 3. Delete a Note
  const handleDeleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(notes.filter(n => n._id !== id));
      setExpandedNote(null); // Close editor
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // --- HANDLERS ---
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleTask = (taskId) => setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));

  // --- RENDERERS ---

  const renderEditor = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col h-full bg-slate-950"
    >
      <div className="h-16 border-b border-slate-800 flex items-center px-8 justify-between sticky top-0 bg-slate-950/80 backdrop-blur-md z-10">
        <button 
          onClick={() => setExpandedNote(null)}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800/50"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Notes
        </button>
        
        {/* New Action Buttons */}
        <div className="flex items-center gap-3">
          {expandedNote._id && (
            <button 
              onClick={() => handleDeleteNote(expandedNote._id)}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-500/10 text-sm font-medium"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          )}
          <button 
            onClick={handleSaveNote}
            className="flex items-center gap-2 bg-indigo-500 text-white hover:bg-indigo-600 transition-colors px-4 py-1.5 rounded-lg shadow-lg shadow-indigo-500/20 text-sm font-medium"
          >
            <Save className="w-4 h-4" /> Save Note
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-1 mb-8 p-1.5 bg-slate-900 border border-slate-800 rounded-xl inline-flex shadow-lg">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"><Bold className="w-4 h-4" /></button>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"><Italic className="w-4 h-4" /></button>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"><Underline className="w-4 h-4" /></button>
            <div className="w-px h-6 bg-slate-700 mx-2"></div>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"><Heading1 className="w-4 h-4" /></button>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"><List className="w-4 h-4" /></button>
          </div>

          <input 
            type="text" 
            value={expandedNote.title}
            onChange={(e) => setExpandedNote({...expandedNote, title: e.target.value})}
            className="w-full bg-transparent text-5xl font-bold text-slate-100 placeholder-slate-700 focus:outline-none mb-6"
            placeholder="Untitled Note"
          />
          
          <textarea 
            value={expandedNote.content}
            onChange={(e) => setExpandedNote({...expandedNote, content: e.target.value})}
            className="w-full h-[60vh] bg-transparent text-lg text-slate-300 placeholder-slate-700 focus:outline-none resize-none leading-relaxed"
            placeholder="Start typing..."
          />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900/50 border-r border-slate-800 flex flex-col h-screen flex-shrink-0">
        <div className="p-5 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">CloudNotes<span className="text-indigo-400">Pro</span></span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-6">
          <div className="space-y-1">
            <button onClick={() => { setActiveMenu('notes'); setExpandedNote(null); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeMenu === 'notes' ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <FileText className="w-4 h-4" /> <span className="font-medium text-sm">All Notes</span>
            </button>
            <button onClick={() => { setActiveMenu('tasks'); setExpandedNote(null); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeMenu === 'tasks' ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <CheckSquare className="w-4 h-4" /> <span className="font-medium text-sm">Tasks</span>
            </button>
          </div>

          <div>
            <button onClick={() => setBooksOpen(!booksOpen)} className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider hover:text-slate-300 transition-colors group">
              Books {booksOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>
            <AnimatePresence>
              {booksOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-1 mt-1 overflow-hidden">
                  {books.map(book => (
                    <button key={book.id} className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg transition-colors pl-8">
                      <Book className="w-4 h-4 text-slate-500" /> <span className="font-medium text-sm truncate">{book.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800/50">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" /> <span className="font-medium text-sm">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-950 relative">
        <AnimatePresence mode="wait">
          {expandedNote ? (
            <motion.div key="editor" className="h-full w-full">{renderEditor()}</motion.div>
          ) : activeMenu === 'tasks' ? (
            <motion.div key="tasks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full overflow-y-auto p-8 max-w-4xl mx-auto">
               <h2 className="text-3xl font-bold mb-8">My Tasks</h2>
               {/* Tasks list hidden for brevity, same as before */}
               <p className="text-slate-400">Tasks are visually available. (Backend integration coming soon!)</p>
            </motion.div>
          ) : (
            <motion.div key="notes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
              
              <header className="h-16 border-b border-slate-800/50 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
                <h1 className="text-xl font-semibold">All Notes</h1>
              </header>

              <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-6xl mx-auto">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-64 text-slate-500">
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Cloud className="w-8 h-8" /></motion.div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      
                      {/* Create New Note Card */}
                      <div 
                        onClick={() => setExpandedNote({ title: '', content: '', bookId: 'b1' })}
                        className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6 hover:bg-indigo-500/10 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[200px] group border-dashed"
                      >
                        <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Plus className="w-6 h-6 text-indigo-400" />
                        </div>
                        <span className="text-indigo-400 font-medium">Create New Note</span>
                      </div>

                      {/* Render REAL Database Notes */}
                      {notes.map(note => (
                        <div 
                          key={note._id}
                          onClick={() => setExpandedNote(note)}
                          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all cursor-pointer group flex flex-col min-h-[200px]"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-semibold text-slate-100 text-lg group-hover:text-indigo-400 transition-colors">{note.title || 'Untitled'}</h3>
                          </div>
                          <p className="text-slate-400 text-sm line-clamp-4 mb-6 flex-1 leading-relaxed">
                            {note.content || 'Empty note...'}
                          </p>
                          <div className="flex items-center justify-between text-xs font-medium">
                            <span className="text-slate-500 flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" /> 
                              {new Date(note.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;