import { AlertDialogForAction } from '@/components/alert-dialog.tsx'
import { Badge } from '@/components/ui/badge.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area.tsx'
import {
  TaskCard
} from '@/pages/task-management/components/kanban/TaskCard.tsx'
import type { Column, ColumnType, NewTask, Status, Task } from '@/types'
import { useDndContext } from '@dnd-kit/core'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cva } from 'class-variance-authority'
import { CirclePlus, GripVertical, Trash2 } from 'lucide-react'
import React, { useMemo } from 'react'
import NewTaskForm from '../new-task-form'

export interface ColumnDragData {
  type: ColumnType;
  column: Column;
}

interface BoardColumnProps {
  column: Status;
  tasks: Task[];
  isOverlay?: boolean;
  deleteColumn: (id: number) => void;
  deleteTask: (id: string) => void;
  addTask: (newTask: NewTask) => void;
  updateTask: (updatedTask: Task) => void;
}

export function BoardColumn({
                              column,
                              tasks,
                              isOverlay,
                              deleteColumn,
                              deleteTask,
                              addTask,
                              updateTask
                            }: BoardColumnProps) {
  const tasksIds = useMemo(() => {
    return tasks?.map((task) => task.id)
  }, [tasks])
  
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column
    } satisfies ColumnDragData,
    attributes: {
      roleDescription: `Column: ${column.label}`
    }
  })
  
  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
  }
  
  const variants = cva(
    'h-[400px] md:h-[520px] lg:h-[590px] text-sm w-[350px] bg-primary-foreground flex flex-col snap-center group',
    {
      variants: {
        dragging: {
          default: 'border-2 border-transparent',
          over: 'ring-2 opacity-10',
          overlay: 'ring-2 ring-primary'
        }
      }
    }
  )
  
  return (
    <div className='flex flex-col'>
      <Card
        ref={setNodeRef}
        style={style}
        className={variants({
          dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined
        })}
      >
        <CardHeader
          className='px-4 py-2 font-semibold border-b-2 text-left flex flex-row justify-between gap-3 items-center'>
          <div className='flex gap-0.5 items-center py-0.5'>
            <Button
              variant={'ghost'}
              {...attributes}
              {...listeners}
              className='p-1 text-primary/50 h-auto cursor-grab flex flex-row items-end py-0'
            >
              <GripVertical className='my-auto ' />
            </Button>
            <span className='text-primary text-lg'> {column.label}</span>
            {column.icon && <column.icon />}
          </div>
          <div
            className='opacity-0 flex group-hover:opacity-100 my-0  h-auto flex-row items-center gap-0.5 transition-all ease-linear duration-300'>
            <Badge className='p-1 hover:cursor-default'>{tasks?.length}</Badge>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant='ghost'
                  className='py-1 px-2 text-primary/60 hover:text-primary'
                >
                  <CirclePlus />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className='text-3xl tracking-wide font-semibold'>
                  Create new task
                </DialogHeader>
                <DialogDescription>
                  Provide more info about your task and save!
                </DialogDescription>
                <NewTaskForm addTask={addTask} statusId={column.id} />
              </DialogContent>
            </Dialog>
            <AlertDialogForAction
              title={'Are you absolutely sure?'}
              description={
                'This action cannot be undone. This will permanently delete this column and remove all related tasks from our servers.'
              }
              action={() => deleteColumn(column.id)}
            >
              <Button
                variant='ghost'
                className='p-1 hover:text-red-500/90 text-primary/60'
              >
                <Trash2 />
              </Button>
            </AlertDialogForAction>
          </div>
        </CardHeader>
        <ScrollArea>
          <CardContent className='flex flex-grow flex-col gap-3 p-3'>
            <SortableContext items={tasksIds}>
              {tasks?.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              ))}
            </SortableContext>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  )
}

export function BoardContainer({ children }: { children: React.ReactNode }) {
  const dndContext = useDndContext()
  
  const variations = cva('px-2 md:px-0 flex lg:justify-center pb-4', {
    variants: {
      dragging: {
        default: 'snap-x snap-mandatory',
        active: 'snap-none'
      }
    }
  })
  
  return (
    <ScrollArea
      className={variations({
        dragging: dndContext.active ? 'active' : 'default'
      })}
    >
      <div className='flex gap-4 items-center flex-row justify-center'>
        {children}
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )
}
