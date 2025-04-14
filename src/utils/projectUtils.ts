import { ProjectStatus } from '../types/project'

export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-PT", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    })
}

export const getStatusBadgeClass = (status: ProjectStatus) => {
    const baseClasses = "flex gap-1 py-1.5 my-3 text-muted-foreground [&_svg]:size-3 rounded-full"
    switch (status) {
        case "completed":
            return `${baseClasses} bg-green-300 px-6 text-green-900`
        case "delayed":
            return `${baseClasses} bg-red-300 px-6 text-red-900`
        default:
            return `${baseClasses} border-white`
    }
}

export const getStatusText = (status: ProjectStatus) => {
    switch (status) {
        case "completed":
            return "Concluido"
        case "delayed":
            return "Atrasado"
        case "in_progress":
            return "Em Progresso"
        default:
            return "Desconhecido"
    }
} 