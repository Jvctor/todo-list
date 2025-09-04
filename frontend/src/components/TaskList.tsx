
import type { Task } from "../types";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TaskList({ tasks, setTasks }: Props) {
  if (!tasks.length) return <p className="text-primary text-center mt-8">Nenhuma tarefa.</p>;

  return (
    <ul className="w-full flex flex-col gap-2">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} setTasks={setTasks} />
      ))}
    </ul>
  );
}
