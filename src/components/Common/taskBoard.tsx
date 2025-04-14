import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GetTaskList } from "../../hooks/getProjects"
import { addTaskList } from "../../api/tasks"
import TaskColumn from "./taskColumn"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

// Single Responsibility: Handles column list rendering
interface ColumnListProps {
  columns: any[]
  loading: boolean
}

interface NewColumnFormProps {
  onSubmit: (title: string) => void
  onCancel: () => void
  initialValue?: string
}

interface AddColumnButtonProps {
  onClick: () => void
}

interface ColumnManagerProps {
  projectId: string
  onAddColumn: (newColumn: any) => void
}



const ColumnList = ({ columns, loading }: ColumnListProps) => {
  if (loading) return null
  
  return (
    <>
      {columns?.map((column: any) => (
        <TaskColumn key={column.id} column={column} />
      ))}
    </>
  )
}
const NewColumnForm = ({ onSubmit, onCancel, initialValue = "" }: NewColumnFormProps) => {
  const [title, setTitle] = useState(initialValue)

  const handleSubmit = () => {
    if (title.trim() !== "") {
      onSubmit(title)
      setTitle("")
    }
  }

  return (
    <div className="bg-gray-100 backdrop-blur-sm rounded-md p-3 shadow-md">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Digite o nome da nova lista..."
        className="w-full h-12 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoFocus
      />
      <div className="flex space-x-2 mt-4">
        <Button 
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-900 transition-colors"
        >
          Adicionar lista
        </Button>
        <Button
          onClick={onCancel}
          className="px-4 py-2 hover:bg-gray-200 rounded-md transition-colors"
        >
          Cancelar
        </Button>
      </div>
    </div>
  )
}

const AddColumnButton = ({ onClick }: AddColumnButtonProps) => (
  <Button
    onClick={onClick}
    className="w-full h-12 bg-blue-950 hover:bg-blue-950/50 text-white rounded-md flex items-center justify-center transition-colors"
  >
    + Adicionar outra lista
  </Button>
)
const ColumnManager = ({ projectId, onAddColumn }: ColumnManagerProps) => {
  const [isAddingColumn, setIsAddingColumn] = useState(false)

  const handleAddColumn = (title: string) => {
    if (projectId) {
      const idTask = addTaskList(projectId, title)
      const newColumn = { title, id: idTask, tasks: [] }
      onAddColumn(newColumn)
      setIsAddingColumn(false)
    }
  }

  return (
    <div className="w-72 flex-shrink-0">
      {isAddingColumn ? (
        <NewColumnForm
          onSubmit={handleAddColumn}
          onCancel={() => setIsAddingColumn(false)}
        />
      ) : (
        <AddColumnButton onClick={() => setIsAddingColumn(true)} />
      )}
    </div>
  )
}

export default function TaskBoard() {
  const { id } = useParams<string>()
  const { loading, taskListData } = GetTaskList(id || '')
  const [columns, setColumns] = useState<any[]>([])

  useEffect(() => {
    setColumns(taskListData || [])
  }, [taskListData])

  const handleAddColumn = (newColumn: any) => {
    setColumns(prevColumns => [...prevColumns, newColumn])
  }

  return (
    <div className="flex-1 overflow-x-auto p-8 border border-gray-300 rounded-md w-full bg-slate-200">
      <div className="flex space-x-4">
        <ColumnList columns={columns} loading={loading} />
        {id && <ColumnManager projectId={id} onAddColumn={handleAddColumn} />}
      </div>
    </div>
  )
}
