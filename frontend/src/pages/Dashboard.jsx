import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, Search, Plus, FileText, Settings, Cloud, 
  MoreVertical, Calendar, Book, CheckSquare, 
  ChevronRight, ChevronDown, Bold, Italic, Underline, 
  Heading1, List, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // --- STATE MANAGEMENT ---
  const [activeMenu, setActiveMenu] = useState('notes'); // 'notes' | 'tasks'
  const [expandedNote, setExpandedNote] = useState(null);
  const [booksOpen, setBooksOpen] = useState(true);

  // Mock Data
  const [books] = useState([
    { id: 'b1', name: 'Personal Journal' },
    { id: 'b2', name: 'Work Projects' },
    { id: 'b3', name: 'Ideas & Brainstorming' }
  ]);

  const [notes, setNotes] = useState([
    { id: 1, title: 'Project Spec Sheet', content: 'Need to review the Lumina UI/UX references...', date: 'Today', bookId: 'b2' },
    { id: 2, title: 'Meeting Notes', content: 'Discuss database schema and JWT auth flow.', date: 'Yesterday', bookId: 'b2' },
    { id: 3, title: 'Grocery List', content: 'Milk, Eggs, Coffee beans.', date: 'Oct 24', bookId: 'b1' },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, text: 'Implement rich-text editor (TipTap)', completed: false },
    { id: 2, text: 'Deploy backend to Render', completed: false },
    { id: 3, text: 'Setup custom domain', completed: true },
  ]);

  // --- HANDLERS ---
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  // --- RENDERERS ---

  // 1. Notion-Style Rich Text Editor View
  const renderEditor = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col h-full bg-slate-950"
    >
      {/* Editor Header */}
      <div className="h-16 border-b border-slate-800 flex items-center px-8 justify-between sticky top-0 bg-slate-950/80 backdrop-blur-md z-10">
        <button 
          onClick={() => setExpandedNote(null)}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800/50"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Notes
        </button>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          Last edited {expandedNote.date}
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Notion-style Toolbar Mockup */}
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
            defaultValue={expandedNote.title}
            className="w-full bg-transparent text-5xl font-bold text-slate-100 placeholder-slate-700 focus:outline-none mb-6"
            placeholder="Untitled"
          />
          
          <textarea 
            defaultValue={expandedNote.content}
            className="w-full h-96 bg-transparent text-lg text-slate-300 placeholder-slate-700 focus:outline-none resize-none leading-relaxed"
            placeholder="Start typing..."
          />
        </div>
      </div>
    </motion.div>
  );

  // 2. Tasks View
  const renderTasks = () => (
    <div className="p-8 max-w-4xl mx-auto w-full">
      <h2 className="text-3xl font-bold mb-8">My Tasks</h2>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-800">
          <Plus className="w-5 h-5 text-indigo-400" />
          <input 
            type="text" 
            placeholder="Add a new task..." 
            className="bg-transparent border-none focus:outline-none text-slate-200 w-full placeholder-slate-600"
          />
        </div>
        <div className="space-y-1">
          {tasks.map(task => (
            <div key={task.id} className="flex items-center gap-3 p-3 hover:bg-slate-800/50 rounded-xl transition-colors group cursor-pointer" onClick={() => toggleTask(task.id)}>
              <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${task.completed ? 'bg-indigo-500 border-indigo-500' : 'border-slate-600 group-hover:border-indigo-400'}`}>
                {task.completed && <CheckSquare className="w-3.5 h-3.5 text-white" />}
              </div>
              <span className={`flex-1 transition-all ${task.completed ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                {task.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
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
          
          {/* Main Menu */}
          <div className="space-y-1">
            <button 
              onClick={() => { setActiveMenu('notes'); setExpandedNote(null); }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeMenu === 'notes' ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              <FileText className="w-4 h-4" />
              <span className="font-medium text-sm">All Notes</span>
            </button>
            <button 
              onClick={() => { setActiveMenu('tasks'); setExpandedNote(null); }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeMenu === 'tasks' ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              <CheckSquare className="w-4 h-4" />
              <span className="font-medium text-sm">Tasks</span>
            </button>
          </div>

          {/* Books / Categories */}
          <div>
            <button 
              onClick={() => setBooksOpen(!booksOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider hover:text-slate-300 transition-colors group"
            >
              Books
              {booksOpen ? <ChevronDown className="w-3 h-3 group-hover:text-slate-300" /> : <ChevronRight className="w-3 h-3 group-hover:text-slate-300" />}
            </button>
            
            <AnimatePresence>
              {booksOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-1 mt-1 overflow-hidden"
                >
                  {books.map(book => (
                    <button key={book.id} className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg transition-colors pl-8">
                      <Book className="w-4 h-4 text-slate-500" />
                      <span className="font-medium text-sm truncate">{book.name}</span>
                    </button>
                  ))}
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors pl-8 group">
                    <Plus className="w-4 h-4" />
                    <span className="font-medium text-sm">New Book</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        <div className="p-4 border-t border-slate-800/50">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg transition-colors mb-2">
            <Settings className="w-4 h-4" />
            <span className="font-medium text-sm">Settings</span>
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-medium text-sm">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-950 relative">
        
        {/* Conditional Rendering based on state */}
        <AnimatePresence mode="wait">
          {expandedNote ? (
            <motion.div key="editor" className="h-full w-full">
              {renderEditor()}
            </motion.div>
          ) : activeMenu === 'tasks' ? (
            <motion.div key="tasks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full overflow-y-auto">
              {renderTasks()}
            </motion.div>
          ) : (
            <motion.div key="notes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
              
              {/* Header */}
              <header className="h-16 border-b border-slate-800/50 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
                <h1 className="text-xl font-semibold">All Notes</h1>
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search notes..."
                    className="pl-9 pr-4 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-all w-64 focus:w-80 placeholder-slate-500"
                  />
                </div>
              </header>

              {/* Notes Grid */}
              <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-6xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    
                    {/* Create New Note Card */}
                    <div 
                      onClick={() => setExpandedNote({ title: '', content: '', date: 'Just now' })}
                      className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6 hover:bg-indigo-500/10 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[200px] group border-dashed"
                    >
                      <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Plus className="w-6 h-6 text-indigo-400" />
                      </div>
                      <span className="text-indigo-400 font-medium">Create New Note</span>
                    </div>

                    {/* Existing Notes */}
                    {notes.map(note => (
                      <div 
                        key={note.id}
                        onClick={() => setExpandedNote(note)}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all cursor-pointer group flex flex-col min-h-[200px]"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-semibold text-slate-100 text-lg group-hover:text-indigo-400 transition-colors">{note.title}</h3>
                          <button className="text-slate-600 hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-slate-400 text-sm line-clamp-4 mb-6 flex-1 leading-relaxed">
                          {note.content}
                        </p>
                        <div className="flex items-center justify-between text-xs font-medium">
                          <span className="text-slate-500 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {note.date}</span>
                          <span className="text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md">{books.find(b => b.id === note.bookId)?.name || 'Uncategorized'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
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