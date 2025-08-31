import type { Task } from "../types";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TaskList({ tasks, setTasks }: Props) {
  if (!tasks.length) return <p>Nenhuma tarefa.</p>;

  return (
    <ul>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} setTasks={setTasks} />
      ))}
    </ul>
  );
}
