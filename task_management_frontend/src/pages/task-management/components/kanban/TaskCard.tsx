import { Badge } from '@/components/ui/badge.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx'
import { priorities } from '@/data/initialTasks.ts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cva } from 'class-variance-authority'
import { Delete, GripVertical, Pencil } from 'lucide-react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Task, TaskDragData } from '@/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx'

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
  deleteTask: (id: string) => void;
}

export function TaskCard({ task, isOverlay, deleteTask }: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task
    } satisfies TaskDragData,
    attributes: {
      roleDescription: 'Task'
    }
  })
  
  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
  }
  
  const variants = cva('group/item', {
    variants: {
      dragging: {
        over: 'ring-2 opacity-30',
        overlay: 'ring-2 ring-primary'
      }
    }
  })
  
  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined
      })}
    >
      <CardHeader
        className='px-3 py-0
        justify-between flex flex-row border-b-2
        border-secondary relative rounded-t-2xl'
      >
        <Button
          variant={'ghost'}
          {...attributes}
          {...listeners}
          className='p-1 text-secondary-foreground/50 -ml-2 h-auto cursor-grab rotate-90'
        >
          <span className='sr-only'>Move task</span>
          <GripVertical />
        </Button>
        <div
          className='flex flex-row gap-1 opacity-0 text-xs group-hover/item:opacity-100  transition-all ease-in-out duration-500'>
          <Badge variant={'outline'} className='-translate-y-0.5 px-1 py-0.5'>
            Task
          </Badge>
          <Badge variant={'secondary'} className='-translate-y-0.5 px-1 py-0.5'>
            {task.label}
          </Badge>
          <Badge variant={'default'} className='-translate-y-0.5 px-1 py-0.5'>
            {priorities.find(priority => priority.value === task.priority)?.label}
          </Badge>
        </div>
        <div className='z-50'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='flex h-8 w-8 p-0 data-[state=open]:bg-muted opacity-0 group-hover/item:opacity-100 peer-hover:opacity-100
                 -translate-y-0.5  transition-all  ease-in-out duration-500'
              >
                <DotsHorizontalIcon className='h-4 w-4' />
                <span className='sr-only'>Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[160px] peer'>
              <DropdownMenuItem>
                <Pencil size={20} className='pr-1' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => deleteTask(task.id)}
                                className='group'>
                <div
                  className='group-hover:text-red-500/70 flex flex-row'>
                  <Delete size={20} className='pr-1 ' />
                  Delete
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className='px-3 pt-3 pb-6 text-left whitespace-pre-wrap'>
        {task.title}
      </CardContent>
    </Card>
  )
}
