import { AlertDialogForAction } from '@/components/alert-dialog.tsx'
import { taskSchema } from '@/types'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select.tsx'

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  deleteTask: (id: string) => void;
}

export function DataTablePagination<TData>({
                                             table, deleteTask
                                           }: DataTablePaginationProps<TData>) {
  return (
    <div className='flex items-center justify-between overflow-auto'>
      <div
        className='flex flex-row gap-1 md:gap-2 lg:gap-3 items-center justify-between'>
        <AlertDialogForAction
          title={'Are you absolutely sure?'}
          description={
            'This action cannot be undone. This will permanently delete this column and remove all related tasks from our servers.'
          }
          action={() => {
            table.getFilteredSelectedRowModel().rows.forEach((row) => {
              const task = taskSchema.parse(row.original)
              deleteTask(task.id)
            })
            table.resetRowSelection()
          }
          }
        >
          <Button variant='destructive' className='opacity-95 px-2 lg:px-3'>
            Delete
          </Button>
        </AlertDialogForAction>
        <div className='hidden flex-1 text-sm text-muted-foreground sm:block'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </div>
      <div className='flex items-center sm:space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='hidden text-sm font-medium sm:block '>Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div
          className='flex w-[100px] items-center justify-center text-sm font-medium'>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to first page</span>
            <DoubleArrowLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to last page</span>
            <DoubleArrowRightIcon className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}
