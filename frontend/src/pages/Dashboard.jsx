import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Search, 
  Plus, 
  FileText, 
  Star, 
  Settings, 
  Cloud,
  MoreVertical,
  Calendar
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Placeholder state for notes (we will connect this to MongoDB later!)
  const [notes, setNotes] = useState([
    { id: 1, title: 'Project Spec Sheet', content: 'Need to review the Lumina UI/UX references...', date: 'Today, 10:00 AM' },
    { id: 2, title: 'Meeting Notes', content: 'Discuss database schema and JWT auth flow.', date: 'Yesterday' },
    { id: 3, title: 'Grocery List', content: 'Milk, Eggs, Coffee beans.', date: 'Oct 24' },
  ]);
  
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newTitle.trim() && !newContent.trim()) return;
    
    const newNote = {
      id: Date.now(),
      title: newTitle || 'Untitled Note',
      content: newContent,
      date: 'Just now'
    };
    
    setNotes([newNote, ...notes]);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col fixed h-screen z-10">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">CloudNotes<span className="text-indigo-400">Pro</span></span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">Menu</div>
          
          <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg transition-colors">
            <FileText className="w-5 h-5" />
            <span className="font-medium">All Notes</span>
          </button>
          
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg transition-colors">
            <Star className="w-5 h-5" />
            <span className="font-medium">Favorites</span>
          </button>

          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg transition-colors mt-8">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </div>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="ml-72 flex-1 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-10">
          <h1 className="text-2xl font-semibold">My Workspace</h1>
          
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            <input
              type="text"
              placeholder="Search notes..."
              className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-all w-72 focus:w-96 focus:bg-slate-800 placeholder-slate-500"
            />
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-8 max-w-5xl">
          
          {/* Elevated Note Input Area (Lumina Style) */}
          <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 mb-10 shadow-lg shadow-black/20">
            <form onSubmit={handleAddNote}>
              <input
                type="text"
                placeholder="Note Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-transparent text-xl font-semibold text-slate-100 placeholder-slate-500 focus:outline-none mb-3"
              />
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="What's on your mind?..."
                className="w-full h-20 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none placeholder-slate-500"
              />
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-2">
                   <span className="text-xs text-slate-500 flex items-center gap-1 bg-slate-800/50 px-2 py-1 rounded border border-slate-700">
                     <FileText className="w-3 h-3" /> Plain Text
                   </span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-lg shadow-indigo-500/20"
                >
                  <Plus className="w-4 h-4" />
                  Save Note
                </button>
              </div>
            </form>
          </div>

          {/* Notes Grid */}
          <div>
            <h2 className="text-lg font-medium text-slate-300 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" /> Recent Notes
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map(note => (
                <div 
                  key={note.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all cursor-pointer group flex flex-col"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-slate-100 truncate pr-4">{note.title}</h3>
                    <button className="text-slate-600 hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-1">
                    {note.content}
                  </p>
                  <div className="text-xs text-slate-600 font-medium">
                    {note.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;