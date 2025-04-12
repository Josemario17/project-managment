export interface User {
    id: string
    name: string
    email: string
    avatar: string
  }
  
  export interface Comment {
    id: string
    userId: string
    content: string
    createdAt: string
  }
  
  export interface TaskData {
    id: string
    title: string
    description?: string
    dueDate?: string
    status: "pending" | "in_progress" | "completed" | "delayed"
    priority: "low" | "medium" | "high"
    assignedTo?: string[]
    comments: Comment[]
    attachments?: string[]
    createdAt: string
    updatedAt: string
  }
  
  export interface ColumnData {
    id: string
    title: string
    tasks: TaskData[]
  }
  
  export interface ProjectMember {
    userId: string
    role: "owner" | "admin" | "editor" | "viewer"
    joinedAt: string
  }
  
  export interface Project {
    id: string
    name: string
    description: string
    status: "Ativo" | "Concluído" | "Em pausa" | "Arquivado"
    startDate?: string
    endDate?: string
    members: ProjectMember[]
    favorite: boolean
    createdAt: string
    updatedAt: string
  }
  
  export interface Notification {
    id: string
    userId: string
    projectId: string
    taskId?: string
    type: "task_assigned" | "task_completed" | "task_due_soon" | "task_overdue" | "comment_added" | "project_update"
    message: string
    read: boolean
    createdAt: string
  }
  