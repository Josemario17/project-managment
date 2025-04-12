"use client"

import { useState } from "react"
import { Plus, MoreHorizontal, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import type { ColumnData, TaskData } from "../../lib/types"

interface TaskColumnProps {
  column: ColumnData
  onAddTask: (columnId: string, task: Partial<TaskData>) => void
  onUpdateTask: (columnId: string, taskId: string, updatedTask: TaskData) => void
}

export default function TaskColumn({ column, onAddTask, onUpdateTask }: TaskColumnProps) {
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState("")

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Partial<TaskData> = {
        title: newTaskTitle,
        description: "",
        status: "pending",
        priority: "medium",
        comments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      onAddTask(column.id, newTask)
      setNewTaskTitle("")
    }
    setIsAddingTask(false)
  }

  const handleTaskClick = (task: TaskData) => {
  }

  const handleTaskUpdate = (updatedTask: TaskData) => {
    onUpdateTask(column.id, updatedTask.id, updatedTask)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-200"
      case "in_progress":
        return "bg-blue-200"
      case "completed":
        return "bg-green-200"
      case "delayed":
        return "bg-red-200"
      default:
        return "bg-gray-200"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Baixa
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Média
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Alta
          </Badge>
        )
      default:
        return null
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return `${date.getDate()}/${date.getMonth() + 1}`
  }

  return (
    <div className="w-72 flex-shrink-0">
      <Card className="bg-gray-100/10 backdrop-blur-sm border-0 shadow-md">
        <CardHeader className="p-3 pb-0">
          <div className="flex justify-between items-center">
            <CardTitle className="text-white text-lg font-medium">{column.title}</CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-3 space-y-2">
          {column.tasks.map((task) => (
            <Card
              key={task.id}
              className="bg-gray-800 text-white p-3 shadow cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={() => handleTaskClick(task)}
            >
              <CardContent className="p-0 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{task.title}</h3>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`}></div>
                </div>

                {task.description && <p className="text-xs text-gray-300 line-clamp-2">{task.description}</p>}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {task.assignedTo && task.assignedTo.length > 0 && (
                      <div className="flex -space-x-2">
                        {task.assignedTo.slice(0, 2).map((userId, index) => {
                          const user = mockUsers?.find((u) => u.id === userId)
                          if (!user) return null

                          return (
                            <Avatar key={index} className="h-6 w-6 border-2 border-gray-800">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )
                        })}
                        {task.assignedTo.length > 2 && (
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-600 border-2 border-gray-800 text-xs">
                            +{task.assignedTo.length - 2}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {task.dueDate && (
                      <div className="flex items-center text-xs text-gray-300">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(task.dueDate)}
                      </div>
                    )}
                    {getPriorityBadge(task.priority)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {isAddingTask ? (
            <div className="space-y-2">
              <Card className="bg-gray-800 p-2">
                <CardContent className="p-0">
                  <Input
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Digite o título do cartão..."
                    className="bg-gray-700 border-0 text-white placeholder:text-gray-400"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newTaskTitle.trim()) {
                        handleAddTask()
                      }
                    }}
                  />
                </CardContent>
              </Card>
              <div className="flex items-center space-x-2">
                <Button size="sm" onClick={handleAddTask} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Adicionar cartão
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsAddingTask(false)}
                  className="text-white hover:bg-white/10"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="ghost"
              className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
              onClick={() => setIsAddingTask(true)}
            >
              <Plus className="h-4 w-4 mr-2" /> Adicionar um cartão
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
