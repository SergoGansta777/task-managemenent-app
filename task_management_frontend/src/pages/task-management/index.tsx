import { Layout, LayoutBody } from '@/components/layout.tsx'
import ThemeSwitch from '@/components/theme-switch.tsx'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs.tsx'
import { UserNav } from '@/components/user-nav.tsx'
import {
  KanbanBoard
} from '@/pages/task-management/components/kanban/KanbanBoard.tsx'
import { initialTasks } from '@/data/initialTasks.ts'
import TaskTable
  from '@/pages/task-management/components/task-table/task-table.tsx'
import { Task } from '@/types'
import { useState } from 'react'

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  
  return (
    <Layout className='relative'>
      <LayoutBody className='relative'>
        <Tabs
          orientation='vertical'
          defaultValue='kanban'
          className='space-y-4 relative'
        >
          <div
            className='w-full overflow-x-scroll flex items-center justify-between pb-2'>
            <TabsList className='mx-2'>
              <TabsTrigger value='kanban'>Kanban</TabsTrigger>
              <TabsTrigger value='table'>Table</TabsTrigger>
            </TabsList>
            <div className='ml-auto flex items-center space-x-4'>
              <ThemeSwitch />
              <UserNav />
            </div>
          </div>
          
          <TabsContent value='kanban'>
            <div className='h-auto flex flex-col items-center gap-8'>
              <h2
                className='"bg-gradient-to-b from-foreground to-transparent  leading-none text-transparent" scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl '>
                Drag and Drop Kanban Board
              </h2>
              <KanbanBoard tasks={tasks} setTasks={setTasks} />
            </div>
          </TabsContent>
          <TabsContent value='table'>
            <div className='h-auto w-full flex flex-col items-center gap-8'>
              <h2
                className='pb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl '>
                Sortable  table of your tasks!
              </h2>
            </div>
            <div className='px-2.5'>
              <TaskTable />
            </div>
          </TabsContent>
        </Tabs>
      </LayoutBody>
    </Layout>
  )
}

export default Index
