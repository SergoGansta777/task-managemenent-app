import { type NewTask, Task } from '@/types'
import axiosInstance from './axiosInstance'

export interface TaskRequest<T> {
  task: T;
}

export interface TaskResponse<T> {
  task: T;
}

export interface TasksResponse<T> {
  tasks: T[];
}

export const GetAllTasks = async () => {
  const response = await axiosInstance.get<TasksResponse<Task>>('tasks')
  return response.data
}

export const DeleteTask = async (id: string) => {
  const response = await axiosInstance.delete(`tasks/${id}`)
  return response.data
}

export const GetTask = async (id: string) => {
  const response = await axiosInstance.get<TaskResponse<Task>>(`tasks/${id}`)
  return response.data
}

export const CreateTask = async (newTask: NewTask) => {
  const response = await axiosInstance.post<TaskResponse<Task>>('tasks', {
    task: newTask
  } as TaskRequest<Task>)
  return response.data
}

export const UpdateTask = async (updatedTask: Task) => {
  const response = await axiosInstance.put<TaskResponse<Task>>(
    `tasks/${updatedTask.id}`,
    {
      task: updatedTask
    } as TaskRequest<Task>
  )
  return response.data
}

export const CompleteTask = async (id: string) => {
  const response = await axiosInstance.put<TaskResponse<Task>>(
    `tasks/complete/${id}`
  )
  return response.data
}
