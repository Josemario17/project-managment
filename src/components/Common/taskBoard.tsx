import { useEffect, useState } from "react"
import TaskColumn from "./taskColumn"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useParams } from "react-router-dom"
import { addTaskList } from "../../api/tasks"
import { GetTaskList } from "../../hooks/getProjects"

export default function TaskBoard() {
  const { id } = useParams<string>()
  const { loading, taskListData } = GetTaskList(id || '')
  const [column, setColumns] = useState<any>([])
  const [isAddingColumn, setIsAddingColumn] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState("")

  useEffect(()=>{
    setColumns(taskListData || [])
  }, [taskListData])

  const inputValidation = () => {
    return newColumnTitle.trim() === ""
  }

  const submitTaskList = () => {
    if (inputValidation()) return
    else {
      if (id) {
        const idTask = addTaskList(id, newColumnTitle)
        setColumns([...column, { title: newColumnTitle, id: idTask, tasks: [] }])
        setNewColumnTitle('')
      }
    }

  }

  return (
    <div className="flex-1 overflow-x-auto p-8 border border-gray-300 rounded-md w-full bg-slate-200">
      <div className="flex space-x-4">
        {
          !loading && 
          column?.map((column: any) => (
            <TaskColumn key={column.id} column={column} />
          ))
        }
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
                <Button onClick={submitTaskList} className="bg-blue-950 text-white">
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
