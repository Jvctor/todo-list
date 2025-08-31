import { useEffect, useState } from "react";
import { fetchTasks } from "./api/tasks";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import type { Task } from "./types";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <TaskForm setTasks={setTasks} />
      <SearchBar search={search} setSearch={setSearch} />
      <TaskList tasks={filteredTasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
