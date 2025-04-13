import { AlarmClock, AlarmClockCheck } from "lucide-react";
import TaskBoard from "../Common/taskBoard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export const InfoProject = () => {
    return (
        <div className="border border-gray-200 backdrop-blur-sm rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold">Nome do Projeto</h3>
            <div className="w-full grid grid-cols-2 justify-between items-center">
                <div>
                    <p className="flex items-center gap-2 text-muted-foreground">
                        <AlarmClock size={18} color="orange" />
                        01/01/2023
                    </p>
                    <p className="flex items-center gap-2 text-muted-foreground">
                        <AlarmClockCheck size={18} color="green" />
                        01/02/2023
                    </p>
                </div>
                <div className="w-auto flex justify-end">
                    <p className="text-muted-foreground justify-center items-center rounded-md py-1 px-4 border border-orange-500 text-orange-500 w-auto flex">Em andamento</p>
                </div>
            </div>
            <p className="text-muted-foreground pt-4">Descrição do projeto</p>
            <p className="text-muted-foreground text-gray-500">Descrição do projeto</p>
        </div>
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
                        <TabsTrigger value="timeline" className="py-3 px-10 data-[state=active]:border-b-blue-950 border-b-4 rounded-none data-[state=active]:text-blue-950">
                            Membros
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="tasks" className="w-full">
                        <TaskBoard />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

