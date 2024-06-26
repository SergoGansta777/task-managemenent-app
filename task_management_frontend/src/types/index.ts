import { type statuses } from '@/constants'
import { z } from 'zod'

export type TaskType = 'Task';
export type Column = Status;
export type ColumnType = 'Column';
export type Status = (typeof statuses)[number];

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export const taskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: 'Please enter title of the task' }),
  statusId: z.number(),
  label: z.string().min(1, { message: 'Please enter label' }),
  priority: z.string()
})

export type Task = z.infer<typeof taskSchema>;

export const newTaskSchema = z.object({
  title: z.string().min(1, { message: 'Please enter title of the task' }),
  label: z.string().min(1, { message: 'Please enter label' }),
  priority: z.string(),
  statusId: z.number()
})

export type NewTask = z.infer<typeof newTaskSchema>;

export const newTaskInputSchema = z.object({
  title: z.string().min(1, { message: 'Please enter title of the task' }),
  label: z.string().min(1, { message: 'Please enter label' }),
  priority: z.string()
})

export type UpdateTask = z.infer<typeof updateTaskSchema>;

export const updateTaskSchema = z.object({
  title: z.string().min(1, { message: 'Please enter title of the task' }),
  label: z.string().min(1, { message: 'Please enter label' }),
  priority: z.string()
})

export type NewTaskInput = z.infer<typeof newTaskInputSchema>;

export interface IUser {
  username: string;
  email: string;
  token: string;
}

export const loginScheme = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password'
    })
    .min(3, {
      message: 'Password must be at least 3 characters long'
    })
})

export type LoginInput = z.infer<typeof loginScheme>;

export const signupScheme = z.object({
  username: z.string().min(1, { message: 'Please enter your username' }),
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  password: z.string().min(1, {
    message: 'Please enter your password'
  })
})

export type SignupInput = z.infer<typeof signupScheme>;
