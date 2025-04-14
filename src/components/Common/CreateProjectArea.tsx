import { useEffect, useState } from "react"
import { Calendar } from "../ui/calendar"
import { pt } from 'date-fns/locale'
import { cn } from "../../lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { X } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { getUsers } from "../../api/users"
import { useUserStore } from "../../store/UserStore"
import { UseGlobalStore } from "../../store/GlobalStore"
import { toast } from "sonner"
import { addProjectInServer } from "../../api/Projects"
import Spin from "./Spin"
import { useNavigate } from "react-router-dom"
import { TransformTIme } from "./Table/ProjectsTable"
import { v4 as uuid4 } from 'uuid'
import { projectType } from "../../lib/types"
import { DateRange } from "react-day-picker"

const FormAddProject = () => {
    const myId = useUserStore.getState().userData
    const [members, setMembers] = useState<any[]>([])
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const from = UseGlobalStore.getState().date.from
    const to = UseGlobalStore.getState().date.to
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        host: myId || '',
        members: [myId] as any,
        startedAt: from,
        endedAt: to,
        status: "in_progress" as "in_progress" | "completed" | "delayed"
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const getAllUsers = async () => {
            const users = await getUsers();
            setMembers(Object.values(users) || []);
        }
        getAllUsers();
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevState: any) => ({ ...prevState, [name]: value }));
    };

    const findUserById = (id: string) => {
        return members.find((item: any) => item.id === id)
    }

    const handleSelectHostChange = (value: any) => {
        setFormData((prevState: any) => ({ ...prevState, host: findUserById(value) }));
    }

    const handleSelectChange = (value: any) => {
        setFormData((prevState: any) => ({ ...prevState, members: value }));
        setMembers((prevState: any) => prevState.filter((m: any) => m.id !== value));
        addMembersInList(findUserById(value))
    };

    const addMembersInList = (member: any) => {
        setSelectedMembers((prevState: any) => ([...prevState, member]));
    }

    const removeMembersInList = (member: any) => {
        setSelectedMembers((prevState: any) => prevState.filter((m: any) => m.id !== member.id));
        setMembers((prevState: any) => ([...prevState, member]));
    }

    const validateForm = () => {
        const { title, description, host, members } = formData;
        return title && description && host && members.length > 0 && from && to;
    }

    const organizeData = () => {
        const { title, description, host, status } = formData;
        const idGenerated = uuid4()
        const data: projectType = {
            id: idGenerated,
            title,
            description,
            host: host || '',
            members: selectedMembers,
            startedAt: from,
            endedAt: to,
            status: status
        }
        return data
    }

    const handleSuccess = () => {
        toast.success("Projecto criado com sucesso!");
    }

    const handleError = () => {
        toast.error("Erro ao criar projecto, tente novamente mais tarde!");
    }

    const NavigateTo = () => {
        navigate("/projects")
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setLoading(true)
        if (!validateForm()) {
            toast.error("Preencha todos os campos obrigatórios.");
            setLoading(false)
            return;
        }
        const data = organizeData()
        try {
            addProjectInServer(data)
            handleSuccess()
            NavigateTo()
        }
        catch (error) {
            handleError()
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="border border-gray-200 p-6 rounded-lg">
            <div className="grid grid-cols-2 gap-6 mb-6 items-start">
                <div className="grid gap-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="novo projecto"
                        required
                        onChange={handleInputChange}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="host">Responsável</Label>
                    <Select name="host" onValueChange={handleSelectHostChange}>
                        <SelectTrigger className="w-full" id="host">
                            <SelectValue placeholder="Selecione um responsável" />
                        </SelectTrigger>
                        <SelectContent className="w-full bg-white">
                            <SelectItem value={myId?.id || 'Eu'}>Eu</SelectItem>
                            {members?.map((member) => (
                                member.id !== myId?.id &&
                                <SelectItem key={member.id} value={member.id}>
                                    {member.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                        id="description"
                        name="description"
                        onChange={handleInputChange}
                        placeholder="desenvolvimento para equipe x"
                        className="border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="members">Membros</Label>
                    <Select name="members" onValueChange={handleSelectChange}>
                        <SelectTrigger className="w-full" id="members">
                            <SelectValue placeholder="Selecione os membros" />
                        </SelectTrigger>
                        <SelectContent className="w-full bg-white">
                            {members?.map((member) => (
                                member.id !== myId?.id &&
                                <SelectItem key={member.id} value={member.id}>
                                    {member.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-6">
                {selectedMembers?.length > 0 && <Label htmlFor="title">Membros</Label>}
                <div className="flex gap-2 col-span-2">
                    {
                        selectedMembers?.map((member: any) => (
                            <Button key={member?.id} type="button" variant="outline" onClick={() => removeMembersInList(member)} className="w-auto h-12 rounded-full bg-blue-950 text-white">
                                <span className="text-sm">{member?.name}</span>
                                <X />
                            </Button>
                        ))
                    }
                </div>
                <div className="flex col-span-2 justify-end items-center">
                    <Button variant="outline" className="w-1/2 h-12 bg-blue-950 text-white">
                        {loading ? <Spin /> : "Criar Projecto"}
                    </Button>
                </div>
            </div>
        </form>
    )
}

export const LeftSide = () => {
    const { setDate } = UseGlobalStore()
    const [date, setNewDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date()
    })

    useEffect(() => {
        console.log("date", date)
        setDate({
            from: date?.from ? TransformTIme(date.from.toISOString()) : '',
            to: date?.to ? TransformTIme(date.to.toISOString()) : ''
        })
    }, [date, setDate]);
    return (
        <Calendar
            locale={pt}
            mode="range"
            selected={date}
            onSelect={setNewDate}
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
                    <FormAddProject />
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
