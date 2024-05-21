import { DataTable } from "@/pages/task-management/components/task-table/data-table.tsx";
import TableColumns
  from '@/pages/task-management/components/task-table/table-columns.tsx'
import { NewTask, Task } from "@/types";

interface TaskTableProps {
  tasks: Task[];
  deleteTask: (id: string) => void;
  addTask: (newTask: NewTask) => void;
  updateTask: (updatedTask: Task) => void;
}

const TaskTable = ({
  tasks,
  deleteTask,
  addTask,
  updateTask,
}: TaskTableProps) => {
  const columns = TableColumns({deleteTask, updateTask});
  return (
    <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
      <DataTable data={tasks} columns={columns} addTask={addTask} />
    </div>
  );
};
export default TaskTable;
