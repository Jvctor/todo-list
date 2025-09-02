import type { Task } from "../types";

const API_URL = "http://localhost:3001/tasks";

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createTask(title: string): Promise<Task> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function toggleTaskCompleted(task: Task): Promise<Task> {
  const res = await fetch(`${API_URL}/${task.id}/done`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ done: !task.done }),
  });
  return res.json();
}
