"use client"

import { useState } from "react"
import { Badge } from "../ui/badge" 
import type { TaskData } from "../../lib/types" 
import type { User as UserType } from "../../lib/types"

interface TaskDetailDialogProps {
  task: TaskData | null
  isOpen: boolean
  onClose: () => void
  onUpdate: (updatedTask: TaskData) => void
}

export default function TaskDetailDialog({ task, isOpen, onClose, onUpdate }: TaskDetailDialogProps) {
  const [editedTask, setEditedTask] = useState<TaskData | null>(task)
  const [newComment, setNewComment] = useState("")

  if (!task || !editedTask) return null

  const handleInputChange = (field: keyof TaskData, value: any) => {
    setEditedTask({
      ...editedTask,
      [field]: value,
      updatedAt: new Date().toISOString(),
    })
  }

  const handleSave = () => {
    if (editedTask) {
      onUpdate(editedTask)
      onClose()
    }
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment = {
      id: Date.now().toString(),
      userId: "1", // Current user ID (mock)
      content: newComment,
      createdAt: new Date().toISOString(),
    }

    setEditedTask({
      ...editedTask,
      comments: [...editedTask.comments, comment],
      updatedAt: new Date().toISOString(),
    })

    setNewComment("")
  }

  const getStatusBadge = () => {
    switch (editedTask.status) {
      case "pending":
        return <Badge variant="outline">Pendente</Badge>
      case "in_progress":
        return <Badge variant="default">Em Progresso</Badge>
      case "completed":
        return <Badge variant="success">Concluído</Badge>
      case "delayed":
        return <Badge variant="destructive">Atrasado</Badge>
      default:
        return null
    }
  }
}
