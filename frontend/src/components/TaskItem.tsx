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
    <li className="flex justify-between items-center mb-2 p-2 border rounded">
      <span className={task.done ? "line-through text-gray-500" : ""}>
        {task.title}
      </span>
      <button
        onClick={handleToggle}
        className="bg-green-500 text-white px-2 py-1 rounded"
      >
        {task.done ? "Desmarcar" : "Concluir"}
      </button>
    </li>
  );
}
