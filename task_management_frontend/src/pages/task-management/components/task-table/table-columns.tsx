import { Badge } from '@/components/ui/badge.tsx'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import { priorities, statuses } from '@/constants/index.ts'
import type { Task } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header.tsx'
import { DataTableRowActions } from './data-table-row-actions.tsx'

interface TableColumnsProps {
  deleteTask: (id: string) => void;
  updateTask: (updatedTask: Task) => void;
}

const TableColumns = ({ deleteTask, updateTask }: TableColumnsProps) => {
  
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
          className='translate-y-[2px]'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
          className='translate-y-[2px]'
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'title',
      meta: 'Title',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Title' />
      ),
      cell: ({ row }) => {
        return (
          <span
            className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('title')}
          </span>
        )
      }
    },
    {
      accessorKey: 'label',
      meta: 'Label',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Label' />
      ),
      cell: ({ row }) => {
        const label = row.original.label
        
        return (
          <Badge variant='outline'>{label}</Badge>
        )
      }
    },
    {
      accessorKey: 'statusId',
      meta: 'Status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Status' />
      ),
      cell: ({ row }) => {
        const status = statuses.find(
          (status) => status.id === row.getValue('statusId')
        )
        
        if (!status) {
          return null
        }
        
        return (
          <div className='flex w-[100px] items-center'>
            {status.icon && (
              <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
            )}
            <span>{status.label}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      }
    },
    {
      accessorKey: 'priority',
      meta: 'Priority',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Priority' />
      ),
      cell: ({ row }) => {
        const priority = priorities.find(
          (priority) => priority.id === row.getValue('priority')
        )
        
        if (!priority) {
          return null
        }
        
        return (
          <div className='flex items-center'>
            {priority.icon && (
              <priority.icon className='mr-2 h-4 w-4 text-muted-foreground' />
            )}
            <span>{priority.label}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      }
    },
    {
      id: 'actions',
      cell: ({ row }) => <DataTableRowActions row={row} updateTask={updateTask}
                                              deleteTask={deleteTask} />
    }
  ] as ColumnDef<Task>[]
}
export default TableColumns
