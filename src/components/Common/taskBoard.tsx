"use client"

import { useState } from "react"
import TaskColumn from "./taskColumn" 
import { Bell } from "lucide-react"
import { Button } from "../ui/button" 
import type { ColumnData, Notification, TaskData } from "../../lib/types"

export default function TaskBoard() {
  const [columns, setColumns] = useState<ColumnData[]>([])
  const [isAddingColumn, setIsAddingColumn] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState("")
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  // Mock notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      userId: "1",
      projectId: "1",
      taskId: "4",
      type: "task_assigned",
      message: "Você foi designado para a tarefa 'Desenvolvimento do layout'",
      read: false,
      createdAt: "2023-04-10T09:00:00Z",
    },
    {
      id: "2",
      userId: "1",
      projectId: "2",
      taskId: "3",
      type: "task_completed",
      message: "A tarefa 'Definir estrutura editorial' foi concluída",
      read: true,
      createdAt: "2023-04-05T14:30:00Z",
    },
    {
      id: "3",
      userId: "1",
      projectId: "3",
      taskId: "1",
      type: "task_due_soon",
      message: "A tarefa 'Planejamento de projeto' vence em 2 dias",
      read: false,
      createdAt: "2023-04-13T08:00:00Z",
    },
  ])

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

    // Adicionar notificação quando uma nova tarefa é criada
    if (newTask.assignedTo && newTask.assignedTo.length > 0) {
      const newNotification: Notification = {
        id: Date.now().toString(),
        userId: "1", // Current user ID (mock)
        projectId: "1",
        taskId: newTask.id,
        type: "task_assigned",
        message: `Nova tarefa criada: ${newTask.title}`,
        read: false,
        createdAt: new Date().toISOString(),
      }

      setNotifications([newNotification, ...notifications])
    }
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

    // Adicionar notificação quando o status da tarefa muda para concluído
    const originalTask = columns.find((col) => col.id === columnId)?.tasks.find((task) => task.id === taskId)

    if (originalTask?.status !== "completed" && updatedTask.status === "completed") {
      const newNotification: Notification = {
        id: Date.now().toString(),
        userId: "1", // Current user ID (mock)
        projectId: "2",
        taskId: taskId,
        type: "task_completed",
        message: `A tarefa "${updatedTask.title}" foi marcada como concluída`,
        read: false,
        createdAt: new Date().toISOString(),
      }

      setNotifications([newNotification, ...notifications])
    }
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

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification,
      ),
    )
  }

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length

  return (
    <div className="flex-1 overflow-x-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Quadro de Tarefas</h2>
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          >
            <Bell className="h-5 w-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      <div className="flex space-x-4">
        {columns.map((column) => (
          <TaskColumn key={column.id} column={column} onAddTask={addTask} onUpdateTask={updateTask} />
        ))}
        <div className="w-72 flex-shrink-0">
          {isAddingColumn ? (
            <div className="bg-gray-100/10 backdrop-blur-sm rounded-md p-3 shadow-md">
              <input
                type="text"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                placeholder="Digite o nome da lista..."
                className="w-full p-2 mb-2 bg-gray-800 text-white border-0 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
                autoFocus
              />
              <div className="flex space-x-2">
                <button onClick={addColumn} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded">
                  Adicionar lista
                </button>
                <button
                  onClick={() => {
                    setIsAddingColumn(false)
                    setNewColumnTitle("")
                  }}
                  className="px-3 py-1.5 text-white hover:bg-white/10 rounded"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingColumn(true)}
              className="w-full h-12 bg-white/20 hover:bg-white/30 text-white rounded-md flex items-center justify-center transition-colors"
            >
              + Adicionar outra lista
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
