import { Button } from '@/components/ui/button.tsx'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx'
import { statuses } from '@/constants'
import UpdateTaskForm
  from '@/pages/task-management/components/update-task-form.tsx'
import { type Task, taskSchema } from '@/types'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import type { Row } from '@tanstack/react-table'
import { ArrowRightLeftIcon, Delete, Pencil } from 'lucide-react'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  deleteTask: (id: string) => void;
  updateTask: (updatedTask: Task) => void;
}

export function DataTableRowActions<TData>({
                                             row,
                                             updateTask,
                                             deleteTask
                                           }: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original)
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <Dialog>
        <DropdownMenuContent align='end' className='w-[160px] '>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Pencil size={20} className='pr-1' />
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ArrowRightLeftIcon size={20} className='pr-1' />
              Change status
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={task.label}>
                {statuses.map((status) => (
                  <DropdownMenuRadioItem
                    key={status.label}
                    value={status.id.toString()}
                    onClick={() => {
                      task.statusId = status.id
                      updateTask(task)
                    }}
                  >
                    <div className='flex flex-row gap-0.5'>
                      <status.icon />
                      {status.label}
                    </div>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => deleteTask(task.id)}
            className='group'
          >
            <div className='group-hover:text-red-500/70 flex flex-row'>
              <Delete size={20} className='pr-1' />
              Delete
            </div>
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
        <DialogContent>
          <DialogHeader className='text-3xl tracking-wide font-semibold'>
            Update your task
          </DialogHeader>
          <DialogDescription>
            Provide another info about your task and save!
          </DialogDescription>
          <UpdateTaskForm updateTask={updateTask} task={task} />
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  )
}
