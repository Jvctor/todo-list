import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TaskItem from '../components/TaskItem';
import type { Task } from '../types';
import * as tasksApi from '../api/tasks';

vi.mock('../api/tasks', () => ({
  toggleTaskCompleted: vi.fn(),
}));

describe('TaskItem', () => {
  const mockSetTasks = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    done: false,
  };

  const completedTask: Task = {
    id: 2,
    title: 'Completed Task',
    done: true,
  };

  it('should render task title correctly', () => {
    render(<TaskItem task={mockTask} setTasks={mockSetTasks} />);
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('should display checkbox unchecked for incomplete task', () => {
    render(<TaskItem task={mockTask} setTasks={mockSetTasks} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('should display checkbox checked for completed task', () => {
    render(<TaskItem task={completedTask} setTasks={mockSetTasks} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should apply line-through style to completed task', () => {
    render(<TaskItem task={completedTask} setTasks={mockSetTasks} />);
    
    const taskTitle = screen.getByText('Completed Task');
    expect(taskTitle).toHaveClass('line-through');
  });

  it('should not apply line-through style to incomplete task', () => {
    render(<TaskItem task={mockTask} setTasks={mockSetTasks} />);
    
    const taskTitle = screen.getByText('Test Task');
    expect(taskTitle).not.toHaveClass('line-through');
  });

  it('should call toggleTaskCompleted when checkbox is clicked', async () => {
    const updatedTask = { ...mockTask, done: true };
    vi.mocked(tasksApi.toggleTaskCompleted).mockResolvedValue(updatedTask);

    render(<TaskItem task={mockTask} setTasks={mockSetTasks} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(tasksApi.toggleTaskCompleted).toHaveBeenCalledWith(mockTask);
    });
  });

  it('should update tasks state when toggle is successful', async () => {
    const updatedTask = { ...mockTask, done: true };
    vi.mocked(tasksApi.toggleTaskCompleted).mockResolvedValue(updatedTask);

    render(<TaskItem task={mockTask} setTasks={mockSetTasks} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(mockSetTasks).toHaveBeenCalledWith(expect.any(Function));
    });
  });
});
