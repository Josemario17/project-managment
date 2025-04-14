"use client"

import { useEffect, useState, ChangeEvent } from "react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Activity, Calendar, FileStack, ShieldUser, Users, X } from "lucide-react"
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
import { Input } from "../ui/input"
import { Header, MemberButton } from "../layouts/MembersList"
import { getProjectsInDb } from "../../api/Projects"
import { getUsers } from "../../api/users"

interface TaskSidebarTabsProps {
    handleArquive: () => void;
    formData: TaskData;
    setFormData: (data: TaskData) => void;
    handleUpdateInstance: (endedAt?: string) => void;
    taskListIdReference: string;
}

const TaskSidebarTabs = ({ handleArquive, formData, setFormData, handleUpdateInstance, taskListIdReference }: TaskSidebarTabsProps) => {
    const { id } = useParams<string>()
    const [data, setData] = useState<any[]>([])
    const [membersData, setMembersData] = useState<any[]>([])
    const handleUpdate = (endedAt: string) => {
        if (formData) {
            const updatedData = { ...formData, endedAt };
            setFormData(updatedData);
            handleUpdateInstance(endedAt);
            toast.success("Prazo alterado com Sucesso!");
        }
    }

    const handleAddMembersInTask = (member: any) => {
        if (!formData?.members?.includes(member)) {
            const updatedData = { ...formData, members: [...(formData?.members || []), member] };
            setFormData(updatedData);
            updateTask(id || '', taskListIdReference, formData.id || '', updatedData);
            toast.success("Membro adicionado com sucesso!");
        }
        return
    }

    const handleRemoveMembersInTask = (member: any) => {
        const updatedMembers = formData?.members?.filter((m: any) => m !== member)
        const updatedData = { ...formData, members: updatedMembers };
        console.log(formData?.members?.filter((m: any) => m !== member))
        setFormData(updatedData);
        updateTask(id || '', taskListIdReference, formData.id || '', updatedData);
        toast.success("Membro removido com sucesso!");
    }

    useEffect(() => {
        const getProjects = async () => {
            const data = await getProjectsInDb(id || '')
            setData(data?.members || [])
        }
        getProjects()
    }, [])

    useEffect(() => {
        const getUsersData = async () => {
            const data = await getUsers()
            const members = Object.values(data)?.filter((user: any) => formData?.members?.includes(user.id))
            setMembersData(members)
        }
        getUsersData()
    }, [formData, formData?.members])
    return (
        <Tabs>
            <TabsList className="border-b border-gray-200 rounded-none w-full grid space-y-1">
                <TabsTrigger value="membros" className="w-full text-gray-400 border px-6 py-2 h-10 border-gray-200 hover:bg-blue-950 hover:text-white">
                    <Users className="mr-2 h-4 w-4" />
                    Atribuida para
                </TabsTrigger>
                <TabsContent value="membros" className="w-full" />

                <TabsContent value="membros" className="w-full mt-2">
                    <Header title={true} availableMembers={data} onAddMember={handleAddMembersInTask} ></Header>
                    <div className="max-w-20">
                        {
                            membersData?.map((member) => (
                                <div key={member.id} className="mb-1">
                                    <MemberButton
                                        member={member}
                                        onRemove={handleRemoveMembersInTask}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </TabsContent>

                <TabsTrigger value="datas" className="w-full justify-start text-gray-400 border px-6 py-2 h-10 border-gray-200 hover:bg-blue-950 hover:text-white">
                    <Calendar className="mr-2 h-4 w-4" />
                    Datas
                </TabsTrigger>
                <TabsContent value="datas" className="w-full mt-2 p-2">
                    <div>
                        <Label>Data de inicio</Label>
                        <Input
                            type="date"
                            value={formData.createdAt ? formData.createdAt.split('T')[0] : ''}
                            onChange={() => { }}
                            placeholder="adicionar um titulo"
                            className="my-2"
                        />
                        <Label>Prazo para terminar</Label>
                        <Input type="date" className="my-2" value={formData.endedAt ? formData.endedAt.split('T')[0] : ''}
                            onChange={(e) => handleUpdate(e.target.value)}
                        />
                    </div>
                </TabsContent>

                <TabsTrigger value="tags" className="w-full justify-start text-gray-400 border px-6 py-2 h-10 border-gray-200 hover:bg-blue-950 hover:text-white">
                    <ShieldUser className="mr-2 h-4 w-4" />
                    Permissões
                </TabsTrigger>

                <Button
                    onClick={handleArquive}
                    className="w-full justify-start text-gray-400 border px-6 py-2 h-10 border-gray-200 hover:bg-blue-950 hover:text-white"
                >
                    <FileStack className="mr-2 h-4 w-4" />
                    Arquivar Tarefa
                </Button>
            </TabsList>
        </Tabs>
    )
};

interface CommentFormProps {
    myAvatarShort: string;
    innerComment: Comment;
    setInnerComment: (comment: Comment) => void;
    handleSaveComment: () => void;
    loadingAction: boolean;
}

const CommentForm = ({ myAvatarShort, innerComment, setInnerComment, handleSaveComment, loadingAction }: CommentFormProps) => (
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
            <Button
                onClick={handleSaveComment}
                size="lg"
                className="bg-blue-950 text-white text-center flex items-center justify-center"
            >
                {loadingAction ? <Spin color="text-white" /> : "Salvar"}
            </Button>
        </div>
    </div>
);

interface CommentsListProps {
    comments: Comment[];
    currentUserId: string;
}

const CommentsList = ({ comments, currentUserId }: CommentsListProps) => (
    <div className="space-y-8 p-4 border border-gray-200 rounded-md">
        {comments?.map((comment) => (
            <div key={comment.id} className="flex gap-3 items-center">
                <Avatar className={`h-8 w-8 ${comment.userId === currentUserId ? 'bg-blue-950' : 'bg-teal-800'}`}>
                    <AvatarFallback className="text-white">{comment?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <div>
                        <span className="font-medium">{comment?.name}</span>{" "}
                        <span className="text-gray-500">{comment?.content}</span>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

interface CommentsAreaProps {
    taskDataCompact: TaskData;
    taskListIdInner: string;
    taskIdInner: string;
}

const CommentsArea = ({ taskDataCompact, taskListIdInner, taskIdInner }: CommentsAreaProps) => {
    const myData = useUserStore.getState().userData;
    const { id } = useParams<{ id: string }>();
    const myAvatarShort = myData?.name.charAt(0) + "" + (myData?.name.split(' ')[1] ? myData?.name.split(' ')[1].charAt(0) : '');
    const [loadingAction, setLoadingAction] = useState<boolean>(false);
    const [comments, setComments] = useState<Comment[]>(taskDataCompact?.comments || []);
    const [innerComment, setInnerComment] = useState<Comment>({
        id: uuid4(),
        userId: myData?.id || '',
        content: '',
        name: myData?.name || '',
        createdAt: new Date().toISOString(),
    });

    const handleSaveComment = () => {
        if (innerComment.content.trim() === "") return;
        setLoadingAction(true);
        const updatedData = {
            ...taskDataCompact,
            comments: [...comments, innerComment]
        };
        updateTask(id || '', taskListIdInner, taskIdInner, updatedData);
        setComments([...comments, innerComment]);
        setInnerComment({ ...innerComment, content: '', id: uuid4() });
        setLoadingAction(false);
    };

    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <Activity className="h-5 w-5 text-gray-400" />
                <h3 className="text-lg font-medium">Atividade</h3>
            </div>

            <CommentForm
                myAvatarShort={myAvatarShort}
                innerComment={innerComment}
                setInnerComment={setInnerComment}
                handleSaveComment={handleSaveComment}
                loadingAction={loadingAction}
            />

            <CommentsList
                comments={comments}
                currentUserId={myData?.id || ''}
            />
        </div>
    );
};

interface TaskDescriptionProps {
    description: string;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onSave: () => void;
    loadingAction: boolean;
}

const TaskDescription = ({ description, isEditing, setIsEditing, onChange, onSave, loadingAction }: TaskDescriptionProps) => (
    <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium">Descrição</h3>
            {!isEditing && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto hover:text-white hover:bg-blue-950"
                    onClick={() => setIsEditing(true)}
                >
                    Editar
                </Button>
            )}
        </div>

        {isEditing ? (
            <div className="space-y-2">
                <Textarea
                    value={description || ''}
                    onChange={onChange}
                    className="min-h-[80px] border border-gray-200"
                />
                <div className="flex gap-2">
                    <Button
                        size="lg"
                        className="bg-blue-950 text-white text-center flex items-center justify-center"
                        onClick={onSave}
                    >
                        {loadingAction ? <Spin color="text-white" /> : "Salvar"}
                    </Button>
                    <Button
                        variant="ghost"
                        size="lg"
                        className="hover:bg-blue-950/50"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancelar
                    </Button>
                </div>
            </div>
        ) : (
            <p className="text-gray-600 cursor-pointer">
                {description || "Adicionar uma descrição mais detalhada..."}
            </p>
        )}
    </div>
);

interface TaskStatusRadioProps {
    status: string;
    onValueChange: (value: string) => void;
}

const TaskStatusRadio = ({ status, onValueChange }: TaskStatusRadioProps) => (
    <RadioGroup
        onValueChange={onValueChange}
        defaultValue={status}
        className="mx-4 pb-4 flex mb-3 w-2/3"
    >
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
);

interface TaskDetailModalProps {
    onClose: () => void;
    taskId: string;
    taskListId: string;
    onArquiveTask: () => void;
}

export default function TaskDetailModal({ onClose, taskId, taskListId, onArquiveTask }: TaskDetailModalProps) {
    const { id } = useParams<{ id: string }>();
    const [isEditingDescription, setIsEditingDescription] = useState<boolean>(false);
    const [loadingAction, setLoadingAction] = useState<boolean>(false);
    const [taskData, setTaskData] = useState<TaskData | undefined>();

    const OrganizeData = (data: any) => {
        const organizedData = {
            ...data,
            updatedAt: new Date().toISOString(),
        }
        return organizedData
    }


    const handleDescriptionSave = () => {
        if (!taskData) return;

        setLoadingAction(true);
        const updatedData = OrganizeData({ ...taskData, description: taskData?.description });
        updateTask(id || '', taskListId, taskId, updatedData);
        toast.success("Descrição atualizada com sucesso!");
        setIsEditingDescription(false);
        setLoadingAction(false);
    };

    const handleUpdateStatus = (status: string) => {
        if (taskData) {
            const updatedData = OrganizeData({ ...taskData, status });
            setTaskData(updatedData);
            updateTask(id || '', taskListId, taskId, updatedData);
            toast.success("Estado alterado com Sucesso!");
        }
    };

    const handleUpdateEndedAt = (endedAt?: string) => {
        if (taskData && endedAt) {
            const updatedData = OrganizeData({ ...taskData, endedAt });
            setTaskData(updatedData);
            updateTask(id || '', taskListId, taskId, updatedData);
            toast.success("Prazo alterado com Sucesso!");
        }
    }

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (taskData) {
            setTaskData({ ...taskData, title: e.target.value });
        }
    };

    useEffect(() => {
        const getTasksFunc = async () => {
            const data = await getTasksInDb(id || '', taskListId, taskId);
            if (data !== undefined && data !== null) {
                setTaskData(data as TaskData);
            }
        };

        getTasksFunc();
    }, [id, taskId, taskListId]);

    if (!taskData) return <Spin color="text-blue-950" />;

    return (
        <div className="fixed w-screen h-screen top-0 -left-4 z-50 bg-black/50 flex items-start justify-center pt-10 overflow-y-auto ml-0">
            <div className="bg-white rounded-md w-full max-w-4xl shadow-xl">
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
                        <Input
                            value={taskData?.title || ''}
                            onChange={handleTitleChange}
                            className="border border-gray-100 rounded-md p-2 max-w-40 mb-2 h-auto"
                        />
                        <div className="text-sm text-gray-400">
                            Status{" "}
                            {getPriorityBadge(taskData?.status)}
                        </div>
                    </div>
                </div>

                <TaskStatusRadio
                    status={taskData?.status || ''}
                    onValueChange={handleUpdateStatus}
                />

                <div className="flex">
                    <div className="flex-1 p-4 border border-gray-200 rounded-lg mx-4 mb-6">
                        <TaskDescription
                            description={taskData?.description || ''}
                            isEditing={isEditingDescription}
                            setIsEditing={setIsEditingDescription}
                            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                            onSave={handleDescriptionSave}
                            loadingAction={loadingAction}
                        />

                        <CommentsArea
                            taskDataCompact={taskData}
                            taskIdInner={taskId}
                            taskListIdInner={taskListId}
                        />
                    </div>
                    <div className="w-56 px-4 mb-4">
                        <div className="w-full">
                            <TaskSidebarTabs
                                handleArquive={onArquiveTask}
                                formData={taskData}
                                setFormData={setTaskData}
                                handleUpdateInstance={handleUpdateEndedAt}
                                taskListIdReference={taskListId}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}