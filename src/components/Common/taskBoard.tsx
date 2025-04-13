import { useState } from "react"
import TaskColumn from "./taskColumn" 
import type { ColumnData, Notification, TaskData } from "../../lib/types"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import TaskDetailModal from "./taskModal"

export default function TaskBoard() {
  const [columns, setColumns] = useState<ColumnData[]>([])
  const [isAddingColumn, setIsAddingColumn] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState("")

  const addTask = (columnId: string, taskData: Partial<TaskData>) => {
    if (!taskData.title?.trim()) return

    const newTask: TaskData = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description || "",
      status: taskData.status || "pending",
      priority: taskData.priority || "medium",
      dueDate: taskData.dueDate,
      assignedTo: taskData.assignedTo || [],
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setColumns(
      columns?.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            tasks: [...column.tasks, newTask],
          }
        }
        return column
      }),
    )
  }

  const updateTask = (columnId: string, taskId: string, updatedTask: TaskData) => {
    setColumns(
      columns?.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            tasks: column.tasks.map((task) => (task.id === taskId ? updatedTask : task)),
          }
        }
        return column
      }),
    )
  }

  const addColumn = () => {
    if (!newColumnTitle.trim()) return

    const newColumn: ColumnData = {
      id: Date.now().toString(),
      title: newColumnTitle,
      tasks: [],
    }

    setColumns(columns ? [...columns, newColumn] : [newColumn])
    setNewColumnTitle("")
    setIsAddingColumn(false)
  }
  
  return (
    <div className="flex-1 overflow-x-auto p-8 border border-gray-300 rounded-md w-full bg-slate-200">
      <div className="flex space-x-4">
        {columns.map((column) => (
          <TaskColumn key={column.id} column={column} onAddTask={addTask} onUpdateTask={updateTask} />
        ))}
        <div className="w-72 flex-shrink-0">
          {isAddingColumn ? (
            <div className="bg-gray-100 backdrop-blur-sm rounded-md p-3 shadow-md">
              <Input
                type="text"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                placeholder="Digite o nome da nova lista..."
                autoFocus
              />
              <div className="flex space-x-2 mt-4">
                <Button onClick={addColumn} className="bg-blue-950 text-white">
                  Adicionar lista
                </Button>
                <button
                  onClick={() => {
                    setIsAddingColumn(false)
                    setNewColumnTitle("")
                  }}
                  className="px-3 py-1.5 hover:bg-white/10 rounded"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingColumn(true)}
              className="w-full h-12 bg-blue-950 hover:bg-blue-950/50 text-white rounded-md flex items-center justify-center transition-colors"
            >
              + Adicionar outra lista
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
