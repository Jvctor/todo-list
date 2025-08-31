import { TasksService } from "../src/tasks.service";

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    service = new TasksService();
  });

  it('should create a task', () => {
    const task = service.create({ title: 'Test' });
    expect(task).toHaveProperty('id');
    expect(task.title).toBe('Test');
    expect(task.done).toBe(false);
  });
});