"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Badge } from "../ui/badge"
import { Activity, Calendar, CheckSquare, FileStack, Paperclip, ShieldUser, Tag, Trash2, User, Users, X } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

export function TaskDetailSidebar() {
    return (
        <div className="w-full">
            <div className="space-y-2">
                <Tabs>
                    <TabsList className="border-b border-gray-200 rounded-none w-full grid space-y-3">
                        <TabsTrigger value="membros" className="w-full justify-start text-gray-400 border px-6 py-2 border-gray-200 hover:bg-blue-950 hover:text-white">
                            <Users className="mr-2 h-4 w-4" />
                            Atribuir para
                        </TabsTrigger>
                        <TabsContent value="membros" className="w-full">
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="text-lg font-medium">Detalhes</h3>
                                <Button variant="ghost" size="icon" className="ml-auto hover:text-white hover:bg-blue-950">
                                    <CheckSquare className="h-5 w-5" />
                                </Button>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <Paperclip className="h-5 w-5 text-gray-400" />
                                <p className="text-gray-600">Nenhum anexo</p>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <Tag className="h-5 w-5 text-gray-400" />
                                <p className="text-gray-600">Nenhuma tag</p>
                            </div>

                        </TabsContent>
                        <TabsTrigger value="attachments" className="w-full justify-start text-gray-400 border px-6 py-2 border-gray-200 hover:bg-blue-950 hover:text-white">
                            <Calendar className="mr-2 h-4 w-4" />
                            Datas
                        </TabsTrigger>
                        <TabsTrigger value="tags" className="w-full justify-start text-gray-400 border px-6 py-2 border-gray-200 hover:bg-blue-950 hover:text-white">
                            <ShieldUser className="mr-2 h-4 w-4" />
                            Permissões
                        </TabsTrigger>
                        <TabsTrigger value="members" className="w-full justify-start text-gray-400 border px-6 py-2 border-gray-200 hover:bg-blue-950 hover:text-white">
                            <FileStack className="mr-2 h-4 w-4" />
                            Arquivar Tarefa
                        </TabsTrigger>
                    </TabsList>

                </Tabs>
            </div>
        </div>
    )
}

interface TaskDetailModalProps {
    isOpen: boolean
    onClose: () => void
    taskId?: string
}

export default function TaskDetailModal({ isOpen, onClose }: TaskDetailModalProps) {
    const [description, setDescription] = useState("vamos criar uma area bem feita para criar")
    const [isEditingDescription, setIsEditingDescription] = useState(false)
    const [comment, setComment] = useState("")

    if (!isOpen) return null

    const formatTimeAgo = (date: Date) => {
        const minutes = Math.floor((new Date().getTime() - date.getTime()) / 60000)
        return `há ${minutes} minutos`
    }

    const handleDescriptionSave = () => {
        setIsEditingDescription(false)
    }

    return (
        <div className="fixed w-screen h-screen top-0 -left-4 z-50 bg-black/50 flex items-start justify-center pt-10 overflow-y-auto ml-0">
            <div className="bg-white rounded-md w-full max-w-3xl shadow-xl">
                {/* Header */}
                <div className="p-4 relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 text-gray-600 hover:text-white hover:bg-blue-950"
                        onClick={onClose}
                    >
                        <X className="h-5 w-5" />
                    </Button>

                    <div className="mb-2">
                        <h2 className="text-xl font-semibold">Tarefa</h2>
                        <div className="text-sm text-gray-400">
                            Status{" "}
                            <Badge variant="outline" className="ml-1 bg-gray-500 text-white">
                                Pendente
                            </Badge>
                        </div>
                    </div>
                </div>
                <RadioGroup defaultValue="option-one" className="mx-4 pb-4 flex mb-3 w-2/3">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="in_progress" id="in_progress" />
                        <Label htmlFor="in_progress">Em Progresso</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="completed" id="completed" />
                        <Label htmlFor="completed">Concluido</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="delayed" id="delayed" />
                        <Label htmlFor="delayed">atrasado</Label>
                    </div>
                </RadioGroup>

                <div className="flex">
                    {/* Main content */}
                    <div className="flex-1 p-4 border border-gray-200 rounded-lg mx-4 mb-6">
                        {/* Description */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-medium">Descrição</h3>
                                {!isEditingDescription && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="ml-auto hover:text-white hover:bg-blue-950"
                                        onClick={() => setIsEditingDescription(true)}
                                    >
                                        Editar
                                    </Button>
                                )}
                            </div>

                            {isEditingDescription ? (
                                <div className="space-y-2">
                                    <Textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="min-h-[80px] border border-gray-200"
                                    />
                                    <div className="flex gap-2">
                                        <Button size="lg" className="bg-blue-950 text-white" onClick={handleDescriptionSave}>
                                            Salvar
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="lg"
                                            className=" hover:bg-blue-950/50"
                                            onClick={() => setIsEditingDescription(false)}
                                        >
                                            Cancelar
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <p
                                    className="text-gray-600 cursor-pointer"
                                >
                                    {description || "Adicionar uma descrição mais detalhada..."}
                                </p>
                            )}
                        </div>

                        {/* Activity */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Activity className="h-5 w-5 text-gray-400" />
                                <h3 className="text-lg font-medium">Atividade</h3>
                            </div>

                            <div className="flex gap-3 mb-4">
                                <Avatar className="h-10 w-10 bg-blue-950">
                                    <AvatarFallback className="text-sm text-white">JM</AvatarFallback>
                                </Avatar>
                                <Textarea
                                    placeholder="Escrever um comentário..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="flex-1 border border-gray-200 placeholder:text-gray-400"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <Avatar className="h-8 w-8 bg-blue-950">
                                        <AvatarFallback>JM</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div>
                                            <span className="font-medium">José Mário</span>{" "}
                                            <span className="text-gray-500">adicionou este cartão a shh</span>
                                        </div>
                                        <div className="text-xs text-gray-400">{formatTimeAgo(new Date(Date.now() - 11 * 60000))}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-56 p-4">
                        <TaskDetailSidebar />
                    </div>
                </div>
            </div>
        </div>
    )
}


