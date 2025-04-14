export type ProjectStatus = 'completed' | 'in_progress' | 'delayed'

export interface Project {
    id: number
    title: string
    description: string
    status: ProjectStatus
    startedAt: string
    endedAt: string
    host: {
        name: string
    } | string
}

export interface ProjectFormData extends Project {
    onUpdate?: (data: Project) => void
} 