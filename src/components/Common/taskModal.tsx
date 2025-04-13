"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Activity, Calendar, CheckSquare, FileStack, Paperclip, ShieldUser, Tag, Users, X } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { useParams } from "react-router-dom"
import Spin from "./Spin"
import { getPriorityBadge } from "./taskColumn"
import { useUserStore } from "../../store/UserStore"
import { getTasksInDb, updateTask } from "../../api/tasks"
import { toast } from "sonner"
import { Comment, TaskData } from "../../lib/types"
import { v4 as uuid4 } from 'uuid'

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


const CommentsArea = ({ taskDataCompact, taskListIdInner, taskIdInner }: { taskDataCompact: TaskData, taskListIdInner: string, taskIdInner: string }) => {
    const myData = useUserStore.getState().userData
    const { id } = useParams<string>()
    const myAvatarShort = myData?.name.charAt(0) + "" + (myData?.name.split(' ')[1] ? myData?.name.split(' ')[1].charAt(0) : '')
    const [loadingAction, setLoadingAction] = useState(false)
    const [comments, setComments] = useState<Comment[]>(taskDataCompact?.comments || [])
    const [innerComment, setInnerComment] = useState({
        id: uuid4(),
        userId: myData?.id || '',
        content: '',
        name: myData?.name || '',
        createdAt: new Date().toISOString(),
    })

    const validations = (): boolean => {
        if (innerComment.content.trim() === "") return false;
        return true;
    }

    const organizeData = (data: any) => {
        const updateData = {
            ...data,
            comments: [...comments, innerComment]
        }
        return updateData;
    }

    const handleSaveComment = () => {
        if (validations()) {
            setLoadingAction(true)
            const DataToSave = organizeData(taskDataCompact)
            updateTask(id || '', taskListIdInner, taskIdInner, DataToSave);
            setComments([...comments, innerComment])
            setInnerComment({...innerComment, content: ''})
            setLoadingAction(false)
        }
    }

    return (

        <div>
            <div className="flex items-center gap-2 mb-4">
                <Activity className="h-5 w-5 text-gray-400" />
                <h3 className="text-lg font-medium">Atividade</h3>
            </div>
            <div className="grid grid-cols-1 gap-3 mb-4">
                <div className="flex items-start justify-start gap-2">
                    <Avatar className="h-10 w-10 bg-blue-950">
                        <AvatarFallback className="text-white">{myAvatarShort}</AvatarFallback>
                    </Avatar>
                    <Textarea
                        placeholder="Escrever um comentário..."
                        className="flex-1 border border-gray-200 placeholder:text-gray-400"
                        value={innerComment.content}
                        onChange={e => setInnerComment({ ...innerComment, content: e.target.value })}
                    />
                </div>
                <div className="flex gap-2">
                    <Button onClick={handleSaveComment} size="lg" className="bg-blue-950 text-white text-center flex items-center justify-center">
                        {loadingAction ? <Spin color="text-white" /> : "Salvar"}
                    </Button>
                </div>
            </div>

            <div className="space-y-8 p-4 border border-gray-200 rounded-md">
                {
                    comments?.map((comment: Comment) => (
                        <div className="flex gap-3 items-center">
                            <Avatar className={`h-8 w-8 ${comment.userId === myData?.id ? 'bg-blue-950' : 'bg-teal-800'}`}>
                                <AvatarFallback className="text-white">{comment?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div>
                                    <span className="font-medium">{comment?.name}</span>{" "}
                                    <span className="text-gray-500">{comment?.content}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

interface TaskDetailModalProps {
    onClose: () => void
    taskId: string
    taskListId: string
}

export default function TaskDetailModal({ onClose, taskId, taskListId }: TaskDetailModalProps) {
    const { id } = useParams<string>()
    const [isEditingDescription, setIsEditingDescription] = useState(false)
    const [loadingAction, setLoadingAction] = useState(false)
    const [taskData, setTaskData] = useState<TaskData>()

    const OrganizeData = (data: any) => {
        const organizedData = {
            ...data,
            updatedAt: new Date().toISOString(),
        }
        return organizedData
    }

    const handleDescriptionSave = () => {
        setLoadingAction(true)
        const updatedData = OrganizeData({ ...taskData, description: taskData?.description });
        updateTask(id || '', taskListId, taskId, updatedData);
        toast.success("Descrição atualizada com sucesso!")
        setIsEditingDescription(false)
        setLoadingAction(false)
    }

    const handleUpdateStatus = (status: any) => {
        if (taskData) {
            const updatedData = OrganizeData({ ...taskData, status });
            setTaskData(updatedData)
            handleChangeRadio(updatedData)
        }
    }

    const handleChangeRadio = (data: any) => {
        updateTask(id || '', taskListId, taskId, data);
        toast.success("Estado alterado com Sucesso!")
    }

    useEffect(() => {
        const getTasksFunc = async () => {
            const Data = await getTasksInDb(id || '', taskListId, taskId)
            if (Data !== undefined && Data !== null) {
                setTaskData(Data as TaskData);
            }
        }
        getTasksFunc();
    }, [taskId])


    if (!taskData) return <Spin color="text-blue-950" />

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
                        <h2 className="text-xl font-semibold">{taskData?.title}</h2>
                        <div className="text-sm text-gray-400">
                            Status{" "}
                            {getPriorityBadge(taskData?.status)}
                        </div>
                    </div>
                </div>
                <RadioGroup onValueChange={handleUpdateStatus} defaultValue={taskData?.status} className="mx-4 pb-4 flex mb-3 w-2/3">
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
                                        value={taskData?.description}
                                        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                                        className="min-h-[80px] border border-gray-200"
                                    />
                                    <div className="flex gap-2">
                                        <Button size="lg" className="bg-blue-950 text-white text-center flex items-center justify-center" onClick={handleDescriptionSave}>
                                            {loadingAction ? <Spin color="text-white" /> : "Salvar"}
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
                                <p className="text-gray-600 cursor-pointer">
                                    {taskData?.description || "Adicionar uma descrição mais detalhada..."}
                                </p>
                            )}
                        </div>

                        {/* Activity */}
                        <CommentsArea taskDataCompact={taskData} taskIdInner={taskId} taskListIdInner={taskListId} />
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


