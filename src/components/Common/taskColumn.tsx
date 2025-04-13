"use client"

import { useEffect, useState } from "react"
import { Plus, MoreHorizontal, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import type { ColumnData, TaskData } from "../../lib/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import TaskDetailModal from "./taskModal"
import { addTask, getTasksInDb } from "../../api/tasks"
import { GetTaskInner } from "../../hooks/getProjects"
import { useParams } from "react-router-dom"
import { v4 as uuid4 } from 'uuid'

interface TaskColumnProps {
  column: ColumnData
}

export const getPriorityBadge = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <Badge variant="outline" className="bg-blue-50 text-green-700 border-green-200">
          Concluida
        </Badge>
      )
    case "in_progress":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          Em Progresso
        </Badge>
      )
    case "delayed":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          Atrasada
        </Badge>
      )
    case "pending":
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
          Pendente
        </Badge>
      )
    default:
      return null
  }
}

export default function TaskColumn({ column }: TaskColumnProps) {
  const { id } = useParams<string>()
  const { taskData } = GetTaskInner(id || '', column.id)
  const [tasks, setTasks] = useState<any>([])
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')

  useEffect(() => {
    const getTasksFunc = async () => {
      const Data = await getTasksInDb(id || '', column.id)
      if (Data !== undefined && Data !== null) {
        setTasks(Object.values(Data) || []);
      }
    }
    getTasksFunc();
  }, [taskData, selectedItem, isModalOpen])

  const organizeData = () => {
    const idGenerated = uuid4()
    const newTask: TaskData = {
      id: idGenerated,
      title: newTaskTitle,
      description: "",
      status: "pending",
      priority: "medium",
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      endedAt: '',
    }
    return newTask
  }

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const Data = organizeData()
      addTask(id || '', column.id, Data)
      setTasks([...tasks, Data])
      setNewTaskTitle("")
    }
    setIsAddingTask(false)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return `${date.getDate()}/${date.getMonth() + 1}`
  }

  const OpenModal = (id: string) => {
    setIsModalOpen(!isModalOpen)
    setSelectedItem(id)
  }

  const CloseModal = () => {
    setIsModalOpen(!isModalOpen)
    setSelectedItem('')
  }

  return (
    <>
      <div className="w-96 flex-shrink-0">
        <Card className="bg-blue-950 max-h-[450px] overflow-y-auto backdrop-blur-sm border-0 shadow-md px-4">
          <CardHeader className="p-3 pb-0">
            <div className="flex justify-between items-center">
              <CardTitle className="text-white text-lg font-medium">{column.title}</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10">
                <DropdownMenu>
                  <DropdownMenuTrigger> <MoreHorizontal className="h-4 w-4" /></DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-white poppins-regular">
                    <DropdownMenuLabel>Opções da Lista</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Trocar Cor</DropdownMenuItem>
                    <DropdownMenuItem>Editar Nome</DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-red-600 focus:text-white text-red-600">Excluir Lista</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-3 space-y-2">
            {tasks?.map((task: any) => (
              <Card
                key={task.id}
                onClick={() => OpenModal(task.id)}
                className="bg-gray-800 text-white p-3 shadow cursor-pointer hover:bg-gray-700 transition-colors"
              >
                <CardContent className="p-0 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="w-2/3">
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="max-w-70 truncate">{task.description}</p>
                    </div>
                    <Button onClick={() => console.log('Button clicked!')}>
                      <MoreHorizontal />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center text-xs text-gray-300">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(task.endedAt) || formatDate(task.updatedAt)}
                      </div>
                      {getPriorityBadge(task.status)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {isAddingTask ? (
              <div className="space-y-2">
                <Input
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Digite o título do cartão..."
                  className=" text-white bg-gray-800 placeholder:text-gray-400 h-12"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newTaskTitle.trim()) {
                      handleAddTask()
                    }
                  }}
                />
                <div className="flex items-center space-x-2">
                  <Button size="lg" onClick={handleAddTask} className="bg-white hover:bg-slate-300 text-blue-950">
                    Nova Tarefa
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setIsAddingTask(false)}
                    className="text-white hover:bg-white/10 h-12"
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
                <Plus className="h-4 w-4 mr-2" /> Adicionar Tarefa
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
      {
        isModalOpen && <TaskDetailModal taskListId={column.id} taskId={selectedItem} onClose={CloseModal} />
      }
    </>
  )
}
