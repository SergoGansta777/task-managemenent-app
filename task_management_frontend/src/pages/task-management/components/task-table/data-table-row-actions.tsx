import {
  Dialog,
  DialogContent, DialogDescription, DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog.tsx'
import UpdateTaskForm
  from '@/pages/task-management/components/update-task-form.tsx'
import { Task, taskSchema } from '@/types'
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import type { Row } from '@tanstack/react-table'
import { Delete, Pencil } from 'lucide-react'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  deleteTask: (id: string) => void;
  updateTask: (updatedTask: Task) => void;
}


export function DataTableRowActions<TData>({row, updateTask, deleteTask }: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original)
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <Dialog>
        <DropdownMenuContent align="end" className="w-[160px] ">
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Pencil size={20} className="pr-1" />
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => deleteTask(task.id)}
            className="group"
          >
            <div className="group-hover:text-red-500/70 flex flex-row">
              <Delete size={20} className="pr-1" />
              Delete
            </div>
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
        <DialogContent>
          <DialogHeader className="text-3xl tracking-wide font-semibold">
            Update your task
          </DialogHeader>
          <DialogDescription>
            Provide another info about your task and save!
          </DialogDescription>
          <UpdateTaskForm updateTask={updateTask} task={task} />
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  );
}
