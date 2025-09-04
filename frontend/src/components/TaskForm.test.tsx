import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TaskForm from '../components/TaskForm';
import type { Task } from '../types';
import * as tasksApi from '../api/tasks';

vi.mock('../api/tasks', () => ({
  createTask: vi.fn(),
}));

describe('TaskForm', () => {
  const mockSetTasks = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render input and button correctly', () => {
    render(<TaskForm setTasks={mockSetTasks} />);
    
    expect(screen.getByPlaceholderText('Nova tarefa')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Adicionar' })).toBeInTheDocument();
  });

  it('should update input value when typing', () => {
    render(<TaskForm setTasks={mockSetTasks} />);
    
    const input = screen.getByPlaceholderText('Nova tarefa') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'New Task' } });
    
    expect(input.value).toBe('New Task');
  });

  it('should create new task when form is submitted', async () => {
    const newTask: Task = { id: 1, title: 'New Task', done: false };
    vi.mocked(tasksApi.createTask).mockResolvedValue(newTask);

    render(<TaskForm setTasks={mockSetTasks} />);
    
    const input = screen.getByPlaceholderText('Nova tarefa');
    const button = screen.getByRole('button', { name: 'Adicionar' });
    
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(tasksApi.createTask).toHaveBeenCalledWith('New Task');
    });
  });

  it('should update tasks state with new task', async () => {
    const newTask: Task = { id: 1, title: 'New Task', done: false };
    vi.mocked(tasksApi.createTask).mockResolvedValue(newTask);

    render(<TaskForm setTasks={mockSetTasks} />);
    
    const input = screen.getByPlaceholderText('Nova tarefa');
    const form = screen.getByRole('button', { name: 'Adicionar' }).closest('form')!;
    
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockSetTasks).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it('should clear input after successful submission', async () => {
    const newTask: Task = { id: 1, title: 'New Task', done: false };
    vi.mocked(tasksApi.createTask).mockResolvedValue(newTask);

    render(<TaskForm setTasks={mockSetTasks} />);
    
    const input = screen.getByPlaceholderText('Nova tarefa') as HTMLInputElement;
    const form = screen.getByRole('button', { name: 'Adicionar' }).closest('form')!;
    
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });

  it('should not submit when input is empty', async () => {
    render(<TaskForm setTasks={mockSetTasks} />);
    
    const form = screen.getByRole('button', { name: 'Adicionar' }).closest('form')!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(tasksApi.createTask).not.toHaveBeenCalled();
    });
  });

  it('should not submit when input contains only whitespace', async () => {
    render(<TaskForm setTasks={mockSetTasks} />);
    
    const input = screen.getByPlaceholderText('Nova tarefa');
    const form = screen.getByRole('button', { name: 'Adicionar' }).closest('form')!;
    
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(tasksApi.createTask).not.toHaveBeenCalled();
    });
  });
});
