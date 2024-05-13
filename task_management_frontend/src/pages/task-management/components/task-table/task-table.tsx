import { initialTasks } from '@/data/initialTasks.ts'
import {
  tableColumns
} from '@/pages/task-management/components/task-table/table-columns.tsx'
import {
  DataTable
} from '@/pages/task-management/components/task-table/data-table.tsx'

const TaskTable = () => {
  return (
    <div
      className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
      <DataTable data={initialTasks} columns={tableColumns} />
    </div>
  )
}
export default TaskTable
