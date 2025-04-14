import * as React from "react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group"
import { SheetClose, SheetFooter } from "../../ui/sheet"
import { Project, ProjectStatus } from "../../../types/project"
import { formatDate } from "../../../utils/projectUtils"

interface ProjectFormProps {
    item: Project
    onUpdate: (data: Project) => void
}

export const ProjectForm = ({ item, onUpdate }: ProjectFormProps) => {
    const [formData, setFormData] = React.useState<Project>(item)

    const handleStatusChange = (status: ProjectStatus) => {
        setFormData({ ...formData, status })
    }

    return (
        <div className="p-4">
            <div className="mb-2 space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">titulo</Label>
                    <Input 
                        onChange={e => setFormData({ ...formData, title: e.target.value })} 
                        name="title" 
                        type="text" 
                        value={formData.title} 
                        placeholder="adicionar um titulo" 
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="endedAt">Prazo actual: {item.endedAt}</Label>
                    <Input 
                        name="endedAt" 
                        type="date" 
                        value={formData.endedAt ? formData.endedAt.split('/').reverse().join('-') : ''} 
                        onChange={e => setFormData({ ...formData, endedAt: formatDate(e.target.value) })} 
                        placeholder="adicionar um titulo" 
                    />
                </div>
                <div className="space-y-2">
                    <Label className="mb-3">Estados</Label>
                    <RadioGroup 
                        onValueChange={handleStatusChange} 
                        defaultValue={formData.status} 
                        className="flex gap-4"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="in_progress" id="r2" />
                            <Label htmlFor="r2">Em Progresso</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="completed" id="r1" />
                            <Label htmlFor="r1">Concluido</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="delayed" id="r3" />
                            <Label htmlFor="r3">Atrasado</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>
            <SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
                <Button 
                    onClick={() => onUpdate(formData)} 
                    className="w-full h-12 bg-blue-950 text-white hover:bg-blue-950/80"
                >
                    Salvar
                </Button>
                <SheetClose asChild>
                    <Button variant="outline" className="w-full h-12 border border-blue-950 text-blue-950">
                        Fechar
                    </Button>
                </SheetClose>
            </SheetFooter>
        </div>
    )
} 