export interface User {
    id: string
    name: string
    email: string
  }
  
  export interface Comment {
    id: string,
    userId: string
    name: string
    content: string
    createdAt: string
  }
  
  export interface TaskData {
    id?: string;
    title: string
    description?: string
    endedAt?: string
    status: "pending" | "in_progress" | "completed" | "delayed"
    priority: "low" | "medium" | "high"
    assignedTo?: string[]
    comments: Comment[]
    attachments?: string[]
    createdAt: string
    updatedAt: string
    members?: string[] 
  }
  
  export interface ColumnData {
    id: string
    title: string
    tasks: TaskData[]
  }
  
  export interface ProjectMember {
    userId: string
    role: "owner" | "editor" | "viewer"
    joinedAt: string
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
    
  export interface projectType {
    id: string;
    title: string;
    description: string;
    host: { name: string; } | User | string;
    members: any[];
    startedAt: string;
    endedAt: string;
    status: 'in_progress' | 'completed' | 'delayed';
    taskList?: []
  }