
import { useEffect, useState } from "react";
import { fetchTasks, createTask } from "./api/tasks";
import { useRef } from "react";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import { theme } from './theme';
import type { Task } from "./types";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
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
    <div
      className="min-h-screen flex flex-col items-center justify-start transition-colors duration-300"
      style={{ background: theme.colors.background }}
    >
      <header className="w-full flex flex-col items-center mt-8 mb-4">
        <h1 className="text-2xl font-bold mb-6 tracking-wide" style={{ color: theme.colors.text, letterSpacing: 1 }}>TODO LIST</h1>
        <div className="flex flex-row items-center gap-2 w-full max-w-3xl">
          <div className="flex-1">
            <SearchBar search={search} setSearch={setSearch} />
          </div>
        </div>
      </header>
      <main className="w-full max-w-3xl flex flex-col items-center">
        <TaskList tasks={filteredTasks} setTasks={setTasks} />
      </main>
      <button
        className="fixed bottom-10 right-10 text-white rounded-full w-14 h-14 flex items-center justify-center text-4xl shadow-lg transition z-20"
        title="Adicionar tarefa"
        style={{ background: theme.colors.primary, border: 'none' }}
        onClick={() => {
          setShowDialog(true);
          setTimeout(() => dialogInputRef.current?.focus(), 100);
        }}
      >
        +
      </button>
      {showDialog && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.4)' }}
        >
          <div
            className="rounded-xl shadow-xl p-8 min-w-[340px] max-w-full flex flex-col items-center relative"
            style={{ background: '#fff' }}
          >
            <h2 className="text-lg font-bold mb-6 text-center" style={{ color: theme.colors.text }}>Nova Tarefa</h2>
            <input
              ref={dialogInputRef}
              className="w-full rounded px-3 py-2 mb-8 focus:outline-none text-base"
              placeholder="Digite sua tarefa..."
              value={newTaskTitle}
              onChange={e => setNewTaskTitle(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleCreate(); }}
              disabled={creating}
              style={{
                border: '1px solid #c4b5fd',
                color: theme.colors.text,
                background: theme.colors.background,
                fontSize: 16,
                transition: 'box-shadow 0.2s',
              }}
            />
            <div className="flex w-full justify-between mt-2">
              <button
                className="px-6 py-2 rounded font-semibold"
                style={{
                  border: '1px solid #c4b5fd',
                  color: theme.colors.primary,
                  background: 'transparent',
                }}
                onClick={() => { setShowDialog(false); setNewTaskTitle(""); }}
                disabled={creating}
                onMouseOver={e => (e.currentTarget.style.background = '#faf5ff')}
                onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
              >
                Cancelar
              </button>
              <button
                className="px-6 py-2 rounded font-semibold ml-4 disabled:opacity-60"
                style={{
                  background: theme.colors.primary,
                  color: '#fff',
                  border: 'none',
                }}
                onClick={handleCreate}
                disabled={creating || !newTaskTitle.trim()}
                onMouseOver={e => (e.currentTarget.style.background = '#5b54d6')}
                onMouseOut={e => (e.currentTarget.style.background = theme.colors.primary)}
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
