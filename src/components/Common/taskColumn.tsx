"use client"

import { useEffect, useState } from "react"
import { Plus, MoreHorizontal, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import type { ColumnData, TaskData } from "../../lib/types"
import TaskDetailModal from "./taskModal"
import { addTask, getTasksInDb, removeTask } from "../../api/tasks"
import { GetTaskInner } from "../../hooks/getProjects"
import { useParams } from "react-router-dom"
import { v4 as uuid4 } from 'uuid'
import { toast } from "sonner"

interface TaskColumnProps {
  column: ColumnData
}

export const getPriorityBadge = (status: string) => {
  const badges = {
    completed: <Badge variant="outline" className="bg-blue-50 text-green-700 border-green-200">Concluida</Badge>,
    in_progress: <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Em Progresso</Badge>,
    delayed: <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Atrasada</Badge>,
    pending: <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Pendente</Badge>
  }
  return badges[status as keyof typeof badges] || null
}

const TaskCard = ({ task, onClick }: { task: TaskData, onClick: () => void }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return `${date.getDate()}/${date.getMonth() + 1}`
  }

  return (
    <Card
      onClick={onClick}
      className="bg-gray-800 text-white p-3 shadow cursor-pointer hover:bg-gray-700 transition-colors"
    >
      <CardContent className="p-0 space-y-2">
        <div className="flex items-start justify-between">
          <div className="w-2/3">
            <h3 className="font-medium">{task.title}</h3>
            <p className="max-w-70 truncate">{task.description}</p>
          </div>
          <Button onClick={(e) => { e.stopPropagation(); console.log('Button clicked!'); }}>
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
  )
}

const AddTaskForm = ({ isAdding, setIsAdding, onAddTask, taskTitle, setTaskTitle }: {
  isAdding: boolean,
  setIsAdding: (value: boolean) => void,
  onAddTask: () => void,
  taskTitle: string,
  setTaskTitle: (value: string) => void
}) => {
  if (!isAdding) {
    return (
      <Button
        variant="ghost"
        className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
        onClick={() => setIsAdding(true)}
      >
        <Plus className="h-4 w-4 mr-2" /> Adicionar Tarefa
      </Button>
    )
  }

  return (
    <div className="space-y-2">
      <Input
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Digite o título do cartão..."
        className="text-white bg-gray-800 placeholder:text-gray-400 h-12"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter" && taskTitle.trim()) {
            onAddTask()
          }
        }}
      />
      <div className="flex items-center space-x-2">
        <Button size="lg" onClick={onAddTask} className="bg-white hover:bg-slate-300 text-blue-950">
          Nova Tarefa
        </Button>
        <Button
          size="sm"
          onClick={() => setIsAdding(false)}
          className="text-white hover:bg-white/10 h-12"
        >
          Cancelar
        </Button>
      </div>
    </div>
  )
}

export default function TaskColumn({ column }: TaskColumnProps) {
  const { id } = useParams<string>()
  const { taskData } = GetTaskInner(id || '', column.id)
  const [tasks, setTasks] = useState<TaskData[]>([])
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) {
      setIsAddingTask(false)
      return
    }
    
    const newTask: TaskData = {
      id: uuid4(),
      title: newTaskTitle,
      description: "",
      status: "pending",
      priority: "medium",
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      endedAt: '',
    }
    
    addTask(id || '', column.id, newTask)
    setTasks([...tasks, newTask])
    setNewTaskTitle("")
    setIsAddingTask(false)
  }

  const handleOpenModal = (taskId: string) => {
    setIsModalOpen(true)
    setSelectedItem(taskId)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedItem('')
  }

  const handleArchiveTask = () => {
    removeTask(id || '', column.id, selectedItem)
    setTasks(tasks.filter(task => task.id !== selectedItem))
    toast.success("Tarefa arquivada com sucesso!")
    handleCloseModal()
  }

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasksInDb(id || '', column.id)
      if (data) {
        setTasks(Object.values(data) || [])
      }
    }
    fetchTasks()
  }, [id, column.id, taskData, selectedItem])

  return (
    <>
      <div className="w-96 flex-shrink-0">
        <Card className="bg-blue-950 max-h-[450px] overflow-y-auto backdrop-blur-sm border-0 shadow-md px-4">
          <CardHeader className="p-3 pb-0">
            <div className="flex justify-between items-center">
              <CardTitle className="text-white text-lg font-medium">{column.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-3 space-y-2">
            {tasks?.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => handleOpenModal(task.id || '')}
              />
            ))}
            
            <AddTaskForm
              isAdding={isAddingTask}
              setIsAdding={setIsAddingTask}
              onAddTask={handleAddTask}
              taskTitle={newTaskTitle}
              setTaskTitle={setNewTaskTitle}
            />
          </CardContent>
        </Card>
      </div>
      
      {isModalOpen && (
        <TaskDetailModal 
          taskListId={column.id} 
          taskId={selectedItem} 
          onClose={handleCloseModal} 
          onArquiveTask={handleArchiveTask} 
        />
      )}
    </>
  )
}