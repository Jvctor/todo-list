import type { Task } from "../types";
import { toggleTaskCompleted } from "../api/tasks";

interface Props {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TaskItem({ task, setTasks }: Props) {
  const handleToggle = async () => {
    const updated = await toggleTaskCompleted(task);
    setTasks(prev =>
      prev.map(t => (t.id === updated.id ? updated : t))
    );
  };

  return (
    <li className="flex items-center border-b border-purple-100 py-2 group hover:bg-purple-50 transition">
      <input
        type="checkbox"
        checked={task.done}
        onChange={handleToggle}
        className="w-5 h-5 accent-purple-400 mr-3 cursor-pointer"
      />
      <span
        className={
          `flex-1 text-lg font-bold select-none ${task.done ? 'line-through text-gray-400' : 'text-black'}`
        }
      >
        {task.title}
      </span>
      <button
        className="opacity-0 group-hover:opacity-100 transition mx-2 text-purple-300 hover:text-purple-500"
        title="Editar (não implementado)"
        disabled
      >
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H7v-3a2 2 0 01.586-1.414z" />
        </svg>
      </button>
      <button
        className="opacity-0 group-hover:opacity-100 transition text-purple-300 hover:text-purple-500"
        title="Excluir (não implementado)"
        disabled
      >
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 6h18M9 6v12a2 2 0 002 2h2a2 2 0 002-2V6m-6 0V4a2 2 0 012-2h2a2 2 0 012 2v2" />
        </svg>
      </button>
    </li>
  );
}
