import { useState } from "react"
import { Calendar } from "../../calendar"
import { pt } from 'date-fns/locale'
import { cn } from "../../lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { X } from "lucide-react"



export const LeftSide = () => {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date()
    })
    return (
        <Calendar
            locale={pt}
            mode="range"
            selected={date}
            onSelect={setDate}
            className="rounded-md border border-gray-300"
        />
    )
}

export const RightSide = ({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) => {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="border border-gray-200 px-6 py-4 rounded-lg mx-6">
                    <CardTitle className="text-2xl">Novo Projecto</CardTitle>
                    <CardDescription>
                        Adicione os dados para criar uma novo projecto
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="border border-gray-200 p-6 rounded-lg">
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="grid gap-2">
                                <Label htmlFor="titulo">Título</Label>
                                <Input
                                    id="titulo"
                                    type="text"
                                    placeholder="novo projecto"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="descricao">Descrição</Label>
                                <Input
                                    id="descricao"
                                    type="text"
                                    placeholder="desenvolvimento para equipe x"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="responsavel">Responsável</Label>
                                <Select>
                                    <SelectTrigger className="w-full" id="responsavel">
                                        <SelectValue placeholder="Selecione um responsável" />
                                    </SelectTrigger>
                                    <SelectContent className="w-full bg-white">
                                        <SelectItem value="responsavel1">Responsável 1</SelectItem>
                                        <SelectItem value="responsavel2">Responsável 2</SelectItem>
                                        <SelectItem value="responsavel3">Responsável 3</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="responsavel">Membros</Label>
                                <Select>
                                    <SelectTrigger className="w-full" id="responsavel">
                                        <SelectValue placeholder="Selecione os membros" />
                                    </SelectTrigger>
                                    <SelectContent className="w-full bg-white">
                                        <SelectItem value="responsavel1">Membro 1</SelectItem>
                                        <SelectItem value="responsavel2">Membro 2</SelectItem>
                                        <SelectItem value="responsavel3">Membro 3</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <Label htmlFor="titulo">Membros</Label>
                            <div className="flex gap-2 col-span-2">
                                <Button type="button" variant="outline" className="w-auto h-12 rounded-full bg-blue-950 text-white">
                                    <span className="text-sm">José Dos Santos</span>
                                    <X />
                                </Button>
                            </div>
                            <div className="flex col-span-2 justify-end items-center">
                                <Button variant="outline" className="w-1/2 h-12 bg-blue-950 text-white">
                                    Salvar Projecto
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default function CreateProjectArea() {
    return (
        <>
            <div className='flex h-full gap-6 w-full items-start justify-between'>
                <div className='container w-auto flex flex-col items-center justify-center rounded-lg border border-gray-300 bg-white'>
                    <LeftSide />
                </div>
                <div className='container w-3/4flex flex-col items-center justify-center rounded-lg border border-gray-300 bg-white'>
                    <RightSide />
                </div>
            </div>
        </>
    )
}
