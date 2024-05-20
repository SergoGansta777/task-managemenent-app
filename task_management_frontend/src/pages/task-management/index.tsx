import { Layout, LayoutBody } from "@/components/layout.tsx";
import ThemeSwitch from "@/components/theme-switch.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { UserNav } from "@/components/user-nav.tsx";
import { KanbanBoard } from "@/pages/task-management/components/kanban/KanbanBoard.tsx";
import TaskTable from "@/pages/task-management/components/task-table/task-table.tsx";
import {
  CreateTask,
  DeleteTask,
  GetAllTasks,
  UpdateTask,
} from "@/api/tasksApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { NewTask, Task } from "@/types";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { data, isSuccess } = useQuery({
    queryKey: ["tasks"],
    queryFn: GetAllTasks,
  });
  const client = useQueryClient();

  useEffect(() => {
    if (isSuccess) {
      setTasks(data.tasks as Task[]);
    }
  }, [isSuccess, data]);

  const createTaskMutation = useMutation({
    mutationFn: CreateTask,
    mutationKey: ["CreateTask"],
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: UpdateTask,
    mutationKey: ["updateTask"],
    // onSuccess: async () => {
    //   await client.invalidateQueries({ queryKey: ["tasks"] });
    // },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: DeleteTask,
    mutationKey: ["deleteTask"],
    // onSuccess: () => {
    //   client.invalidateQueries({ queryKey: ["todos"] });
    // },
  });

  return (
    <Layout className="">
      <LayoutBody className="relative">
        <Tabs
          orientation="vertical"
          defaultValue="kanban"
          className="space-y-4"
        >
          <div className="w-full flex items-center justify-between pb-2">
            <TabsList className="">
              <TabsTrigger value="kanban">Kanban</TabsTrigger>
              <TabsTrigger value="table">Table</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center space-x-4 ">
              <ThemeSwitch />
              <UserNav />
            </div>
          </div>

          <TabsContent value="kanban">
            <div className="flex flex-col items-center gap-1 ">
              <h2
                className="scroll-m-20 text-2xl md:text-4xl
               font-extrabold tracking-tight lg:text-5xl "
              >
                Drag and Drop Kanban Board
              </h2>
              <KanbanBoard
                deleteTask={deleteTask}
                addTask={addTask}
                updateTask={updateTask}
                tasks={tasks}
                setTasks={setTasks}
              />
            </div>
          </TabsContent>
          <TabsContent value="table">
            <div className="flex flex-col items-center gap-8">
              <h2 className="pb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
                Sortable table of your tasks!
              </h2>
            </div>
            <TaskTable />
          </TabsContent>
        </Tabs>
      </LayoutBody>
    </Layout>
  );

  function deleteTask(id: string) {
    const filteredTasks = tasks.filter((task) => {
      const isNeedToDelete = task.id === id;
      if (isNeedToDelete) {
        deleteTaskMutation.mutate(task.id);
      }
      return !isNeedToDelete;
    });
    setTasks(filteredTasks);
  }

  function addTask(newTask: NewTask) {
    createTaskMutation.mutate(newTask);
  }

  function updateTask(updatedTask: Task) {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === updatedTask.id) {
          return updatedTask;
        } else {
          return task;
        }
      }),
    );
    updateTaskMutation.mutate(updatedTask);
  }
};
export default Index;
