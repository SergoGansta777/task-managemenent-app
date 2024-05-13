import {
  columns
} from '@/pages/task-management/components/task-table/columns.tsx'
import {
  DataTable
} from '@/pages/task-management/components/task-table/data-table.tsx'
import { tasks } from '@/pages/tasks/tasks.ts'

const TaskTable = () => {
  return (
    <div
      className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
      <DataTable data={tasks} columns={columns} />
    </div>
  )
}
export default TaskTable
