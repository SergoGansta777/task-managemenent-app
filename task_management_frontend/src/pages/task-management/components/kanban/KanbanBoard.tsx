import { statuses } from '@/constants'
import {
  TaskCard
} from '@/pages/task-management/components/kanban/TaskCard.tsx'
import { type Column, Task, NewTask } from '@/types'
import { hasDraggableData } from '@/utils'
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import React, { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

import { BoardColumn, BoardContainer } from './BoardColumn.tsx'

interface KanbanBoardProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  deleteTask: (id: string) => void;
  addTask: (newTask: NewTask) => void;
  updateTask: (updatedTask: Task) => void;
}

export function KanbanBoard({
                              tasks,
                              setTasks,
                              deleteTask,
                              addTask,
                              updateTask
                            }: KanbanBoardProps) {
  const [columns, setColumns] = useState<Column[]>(statuses)
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns])
  
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))
  
  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <BoardContainer>
        <SortableContext items={columnsId}>
          <div
            className='flex flex-col md:flex-row justify-around items-center
           gap-4 pt-5 px-8 w-screen overflow-scroll scroll-auto scrollbar-hide'
          >
            {columns.map((col) => (
              <BoardColumn
                key={col.id}
                column={col}
                tasks={tasks?.filter((task) => task.statusId === col.id)}
                deleteColumn={deleteColumn}
                deleteTask={deleteTask}
                addTask={addTask}
                updateTask={updateTask}
              />
            ))}
          </div>
        </SortableContext>
      </BoardContainer>
      
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <BoardColumn
              isOverlay
              column={activeColumn}
              tasks={tasks?.filter((task) => task.statusId === activeColumn.id)}
              deleteColumn={deleteColumn}
              deleteTask={deleteTask}
              addTask={addTask}
              updateTask={updateTask}
            />
          )}
          {activeTask && (
            <TaskCard
              task={activeTask}
              isOverlay
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )
  
  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return
    const data = event.active.data.current
    if (data?.type === 'Column') {
      setActiveColumn(data.column)
      return
    }
    
    if (data?.type === 'Task') {
      setActiveTask(data.task)
      return
    }
  }
  
  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null)
    setActiveTask(null)
    
    const { active, over } = event
    if (!over) return
    
    const activeId = active.id
    const overId = over.id
    
    if (!hasDraggableData(active)) return
    
    const activeData = active.data.current
    
    if (activeId === overId) return
    
    const isActiveAColumn = activeData?.type === 'Column'
    if (!isActiveAColumn) return
    
    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId)
      
      const overColumnIndex = columns.findIndex((col) => col.id === overId)
      
      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }
  
  function onDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return
    
    const activeId = active.id
    const overId = over.id
    
    if (activeId === overId) return
    
    if (!hasDraggableData(active) || !hasDraggableData(over)) return
    
    const activeData = active.data.current
    const overData = over.data.current
    
    const isActiveATask = activeData?.type === 'Task'
    const isOverATask = activeData?.type === 'Task'
    
    if (!isActiveATask) return
    
    // I'm dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)
        const overIndex = tasks.findIndex((t) => t.id === overId)
        const activeTask = tasks[activeIndex]
        const overTask = tasks[overIndex]
        if (
          activeTask &&
          overTask &&
          activeTask.statusId !== overTask.statusId
        ) {
          activeTask.statusId = overTask.statusId
          updateTask(activeTask)
          return arrayMove(tasks, activeIndex, overIndex - 1)
        }
        
        return arrayMove(tasks, activeIndex, overIndex)
      })
    }
    
    const isOverAColumn = overData?.type === 'Column'
    
    // I'm dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)
        const activeTask = tasks[activeIndex]
        if (activeTask) {
          activeTask.statusId = overId as number
          updateTask(activeTask)
          return arrayMove(tasks, activeIndex, activeIndex)
        }
        return tasks
      })
    }
  }
  
  function deleteColumn(id: number) {
    const filteredTasks = tasks.filter((task) => {
      const isNeedToDelete = task.statusId === id
      if (isNeedToDelete) {
        deleteTask(task.id)
      }
      return !isNeedToDelete
    })
    setTasks(filteredTasks)
  }
}
