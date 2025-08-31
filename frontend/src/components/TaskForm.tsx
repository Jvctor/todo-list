import { useState, type FormEvent,  } from "react";
import { createTask } from "../api/tasks";
import type { Task } from "../types";

interface Props {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TaskForm({ setTasks }: Props) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask = await createTask(title);
    setTasks(prev => [newTask, ...prev]);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        className="flex-1 border rounded-l px-2 py-1"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Nova tarefa"
      />
      <button className="bg-blue-500 text-white px-4 rounded-r" type="submit">
        Adicionar
      </button>
    </form>
  );
}
