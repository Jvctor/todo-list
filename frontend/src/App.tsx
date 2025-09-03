import { useEffect, useState } from "react";
import { fetchTasks, createTask } from "./api/tasks";
import TaskForm from "./components/TaskForm";
import { useRef } from "react";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import type { Task } from "./types";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const dialogInputRef = useRef<HTMLInputElement>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
  
    return matchesSearch;
  });

  // Criação de tarefa via modal
  const handleCreate = async () => {
    if (!newTaskTitle.trim()) return;
    setCreating(true);
    try {
      const newTask = await createTask(newTaskTitle);
      setTasks(prev => [newTask, ...prev]);
      setShowDialog(false);
      setNewTaskTitle("");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className={
      `min-h-screen flex flex-col items-center justify-start bg-${dark ? 'gray-900' : '[#F7F7F7]'} transition-colors duration-300`
    }>
      <header className="w-full flex flex-col items-center mt-8 mb-4">
        <h1 className="text-2xl font-bold mb-6 tracking-wide text-black" style={{letterSpacing: 1}}>TODO LIST</h1>
        <div className="flex flex-row items-center gap-2 w-full max-w-3xl">
          <div className="flex-1">
            <SearchBar search={search} setSearch={setSearch} />
          </div>
      
          <button
            className="ml-2 p-2 rounded bg-purple-200 hover:bg-purple-300 text-purple-700 text-xl transition"
            title="Toggle dark mode"
            onClick={() => setDark(d => !d)}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
            </svg>
          </button>
        </div>
      </header>
      <main className="w-full max-w-3xl flex flex-col items-center">
        <TaskList tasks={filteredTasks} setTasks={setTasks} />
      </main>
      <button
        className="fixed bottom-10 right-10 bg-purple-500 hover:bg-purple-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-4xl shadow-lg transition z-20"
        title="Adicionar tarefa"
        onClick={() => {
          setShowDialog(true);
          setTimeout(() => dialogInputRef.current?.focus(), 100);
        }}
      >
        +
      </button>

      {/* Modal Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl p-8 min-w-[340px] max-w-full flex flex-col items-center relative">
            <h2 className="text-lg font-bold mb-6 text-center">NEW NOTE</h2>
            <input
              ref={dialogInputRef}
              className="w-full border border-purple-400 rounded px-3 py-2 mb-8 text-purple-700 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-200 text-base"
              placeholder="Input your note..."
              value={newTaskTitle}
              onChange={e => setNewTaskTitle(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleCreate(); }}
              disabled={creating}
            />
            <div className="flex w-full justify-between mt-2">
              <button
                className="border border-purple-400 text-purple-500 px-6 py-2 rounded hover:bg-purple-50 font-semibold"
                onClick={() => { setShowDialog(false); setNewTaskTitle(""); }}
                disabled={creating}
              >
                CANCEL
              </button>
              <button
                className="bg-purple-500 text-white px-6 py-2 rounded font-semibold hover:bg-purple-600 ml-4 disabled:opacity-60"
                onClick={handleCreate}
                disabled={creating || !newTaskTitle.trim()}
              >
                APPLY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  // (função duplicada removida)
}

export default App;
