import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../ui/sheet"
import { Project } from "../../../types/project"
import { addProjectInServer } from "../../../api/Projects"
import { toast } from "sonner"
import { ProjectForm } from "./ProjectForm"

interface ProjectTableViewerProps {
    item: Project
}

export const ProjectTableViewer = ({ item }: ProjectTableViewerProps) => {
    const navigate = useNavigate()

    const handleUpdate = async (formData: Project) => {
        try {
            await addProjectInServer(formData)
            toast.success('Dados atualizados')
            navigate(`/projects/${formData.id}`)
        } catch (error) {
            console.error("Failed to update project:", error)
        }
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="link" className="w-fit px-0 text-left text-foreground">
                    {item.title}
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col bg-white poppins-regular">
                <SheetHeader className="gap-1">
                    <SheetTitle>Editar Projecto</SheetTitle>
                    <SheetDescription>{item.description}</SheetDescription>
                </SheetHeader>
                <ProjectForm item={item} onUpdate={handleUpdate} />
            </SheetContent>
        </Sheet>
    )
} 