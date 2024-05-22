import { Button } from '@/components/ui/button.tsx'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog.tsx'
import { Input } from '@/components/ui/input.tsx'
import {
  DEFAULT_TASK_STATUS_ID,
  priorities,
  statuses
} from '@/constants/index.ts'
import NewTaskForm from '@/pages/task-management/components/new-task-form.tsx'
import type { NewTask } from '@/types'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { CirclePlus } from 'lucide-react'

import { DataTableFacetedFilter } from './data-table-faceted-filter.tsx'
import { DataTableViewOptions } from './data-table-view-options.tsx'

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  addTask: (newTask: NewTask) => void;
}

export function DataTableToolbar<TData>({
                                          table, addTask
                                        }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  
  return (
    <div className='flex items-center justify-between'>
      <div
        className='flex flex-1 flex-col-reverse items-start gap-y-2
        sm:flex-row sm:items-center sm:space-x-2'
      >
        <Input
          placeholder='Filter tasks...'
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          {table.getColumn('statusId') && (
            <DataTableFacetedFilter
              column={table.getColumn('statusId')}
              title='Status'
              options={statuses}
            />
          )}
          {table.getColumn('priority') && (
            <DataTableFacetedFilter
              column={table.getColumn('priority')}
              title='Priority'
              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              // @ts-expect-error
              options={priorities}
            />
          )}
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <div className='flex justify-between items-center gap-2'>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant='default'
              className='h-8 px-2 lg:px-3 opacity-90'
            >
              <CirclePlus className='px-1' />
              Create task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className='text-3xl tracking-wide font-semibold'>
              Create new task
            </DialogHeader>
            <DialogDescription>
              Provide more info about your task and save!
            </DialogDescription>
            <NewTaskForm addTask={addTask} statusId={DEFAULT_TASK_STATUS_ID} />
          </DialogContent>
        </Dialog>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
