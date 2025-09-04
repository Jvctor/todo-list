
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
        className="w-5 h-5 mr-3 cursor-pointer accent-primary"
      />
      <span
        className={`flex-1 text-lg font-bold select-none ${task.done ? 'line-through text-secondary' : 'text-primary'}`}
      >
        {task.title}
      </span>
    </li>
  );
}
