import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private nextId = 1;

  findAll(order: 'asc' | 'desc' = 'asc'): Task[] {
    const sorted = [...this.tasks].sort((a, b) => a.id - b.id);
    return order === 'desc' ? sorted.reverse() : sorted;
  }

  create(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: this.nextId++,
      title: createTaskDto.title,
      done: false,
    };
    this.tasks.push(task);
    return task;
  }

  markAsDone(id: number, done: boolean): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new NotFoundException('Task not found');
    task.done = done;
    return task;
  }
}