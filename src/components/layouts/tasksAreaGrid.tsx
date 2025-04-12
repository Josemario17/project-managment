import { ChevronDown } from "lucide-react";
import TaskBoard from "../Common/taskBoard";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export default function TasksAreaGrid() {
    return (
        <div className='border border-x-white/50 rounded-lg bg-blue-950/30 shadow-md shadow-black/20 p-4'>
            <h2 className='text-lg font-bold'>Tarefas do Projeto</h2>
            {/* informações do projecto usando um card do shadcn */}
            <div className='bg-gray-800/30 backdrop-blur-sm border-0 shadow-md rounded-lg p-4 mb-4'>
                <h3 className='text-white text-lg font-semibold'>Projeto: Nome do Projeto</h3>
                <p className='text-muted-foreground'>Descrição: Descrição do projeto</p>
                <p className='text-muted-foreground'>Data de Início: 01/01/2023</p>
                <p className='text-muted-foreground'>Data de Término: 01/02/2023</p>
                <p className='text-muted-foreground'>Status: Em andamento</p>
                <p className='text-muted-foreground'>Prioridade: Alta</p>
            </div>
            
            <div className="flex items-center justify-between">
                    <Tabs defaultValue="board">
                        <TabsList className="bg-purple-700">
                            <TabsTrigger value="board" className="data-[state=active]:bg-purple-600">
                                Tarefas
                            </TabsTrigger>
                            <TabsTrigger value="timeline" className="data-[state=active]:bg-purple-600">
                                Membros
                            </TabsTrigger>
                            <TabsTrigger value="calendar" className="data-[state=active]:bg-purple-600">
                                Colaboração
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-purple-700 hover:bg-purple-600 text-white border-purple-600"
                        >
                            Filtrar
                            <ChevronDown className="ml-1 h-3 w-3" />
                        </Button>
                    </div>
                </div>
            <TaskBoard />
        </div>
    )
}

