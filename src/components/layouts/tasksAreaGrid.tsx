import { AlarmClock, AlarmClockCheck } from "lucide-react";
import TaskBoard from "../Common/taskBoard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useParams } from "react-router-dom";
import { GetProjects } from "../../hooks/getProjects";
import { GetStatusPt } from "../Common/Table/DashboardTable";
import MembersListContainer from "./MembersList";

const classReturn = (text: 'in_progress' | 'completed' | 'delayed') =>
    text === 'completed' ?
        'border-green-500 text-green-500' :
        text === 'delayed' ?
            'border-red-500 text-red-500' :
            'border-gray-500 text-gray-500'

export const InfoProject = () => {
    const { id } = useParams<string>()
    const { projectData } = GetProjects(id)
    const uniqueItem = 0
    return (
        <>
            <h3 className="text-lg font-semibold p-4">{projectData[uniqueItem]?.title}</h3>
            <div className="border border-gray-200 backdrop-blur-sm rounded-lg p-4">
                <div className="w-full grid grid-cols-2 justify-between items-center">
                    <div>
                        <p className="flex items-center gap-2 text-muted-foreground">
                            <AlarmClock size={18} color="orange" />
                            {projectData[uniqueItem]?.startedAt}
                        </p>
                        <p className="flex items-center gap-2 text-muted-foreground">
                            <AlarmClockCheck size={18} color="green" />
                            {projectData[uniqueItem]?.endedAt}
                        </p>
                    </div>
                    <div className="w-auto flex justify-end">
                        <p className={`text-muted-foreground justify-center items-center rounded-md py-1 px-4 border w-auto flex ${projectData[uniqueItem]?.status ? classReturn(projectData[uniqueItem]?.status) : ''}`}>
                            {projectData[uniqueItem]?.status && GetStatusPt(projectData[uniqueItem]?.status)}
                        </p>
                    </div>
                </div>
            </div>
            <div className="rounded-lg p-4 mb-4">
                <p className="text-muted-foreground">Descrição do projeto</p>
                <p className="text-muted-foreground text-gray-500">{projectData[uniqueItem]?.description}</p>
            </div>
        </>
    )
}

export default function TasksAreaGrid() {
    return (
        <div className='border border-gray-200 rounded-lg bg-white p-4'>
            <InfoProject />
            <div className="flex items-center justify-between w-full">
                <Tabs defaultValue="tasks" className="w-full">
                    <TabsList className="border-b border-gray-200 rounded-none w-1/2">
                        <TabsTrigger value="tasks" className="py-3 px-10 data-[state=active]:border-b-blue-950 border-b-4 rounded-none data-[state=active]:text-blue-950">
                            Tarefas
                        </TabsTrigger>
                        <TabsTrigger value="members" className="py-3 px-10 data-[state=active]:border-b-blue-950 border-b-4 rounded-none data-[state=active]:text-blue-950">
                            Membros
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="tasks" className="w-full">
                        <TaskBoard />
                    </TabsContent>
                    <TabsContent value="members" className="w-full">
                        <MembersListContainer />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

