
import { useEffect, useState } from "react";
import { fetchTasks, createTask } from "./api/tasks";
import { useRef } from "react";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";
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
      className="min-h-screen flex flex-col items-center justify-start transition-colors duration-300 bg-background"
    >
      <header className="w-full flex flex-col items-center mt-8 mb-4">
        <h1 className="text-2xl font-bold mb-6 tracking-wide text-primary" style={{ letterSpacing: 1 }}>TODO LIST</h1>
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
        className="fixed bottom-10 right-10 text-white rounded-full w-14 h-14 flex items-center justify-center text-4xl shadow-lg transition z-20 bg-primary border-none hover:bg-primary/80"
        title="Adicionar tarefa"
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
            className="rounded-xl shadow-xl p-8 min-w-[340px] max-w-full flex flex-col items-center relative bg-white"
          >
            <h2 className="text-lg font-bold mb-6 text-center text-primary">Nova Tarefa</h2>
            <input
              ref={dialogInputRef}
              className="w-full rounded px-3 py-2 mb-8 focus:outline-none text-base border border-secondary text-primary bg-background transition"
              placeholder="Digite sua tarefa..."
              value={newTaskTitle}
              onChange={e => setNewTaskTitle(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleCreate(); }}
              disabled={creating}
            />
            <div className="flex w-full justify-between mt-2">
              <button
                className="px-6 py-2 rounded font-semibold border border-secondary text-primary bg-transparent hover:bg-secondary/10"
                onClick={() => { setShowDialog(false); setNewTaskTitle(""); }}
                disabled={creating}
              >
                Cancelar
              </button>
              <button
                className="px-6 py-2 rounded font-semibold ml-4 disabled:opacity-60 bg-primary text-white border-none hover:bg-primary/80"
                onClick={handleCreate}
                disabled={creating || !newTaskTitle.trim()}
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
