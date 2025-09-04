import { Body, Controller, Get, Param, Patch, Post, ParseIntPipe, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Query('order') order: 'asc' | 'desc' = 'asc'): Task[] {
    return this.tasksService.findAll(order);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id/done')
  markAsDone(
    @Param('id', ParseIntPipe) id: number,
    @Body('done') done: boolean
  ): Task {
    return this.tasksService.markAsDone(id, done);
  }
}