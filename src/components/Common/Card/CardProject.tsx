import { ArrowDownIcon, ClockIcon, UsersIcon } from "lucide-react"

import { Badge } from "../../ui/badge"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../ui/card"
import { Link } from "react-router-dom"
import DashboardTableProjects from "../Table/DashboardTable"
import { projectType } from "../../../lib/types"
import { GetProjects } from "../../../hooks/getProjects"


export function CardProject() {
    const { projectData } = GetProjects()
    const calculateTotalMembers = (projects: projectType[] = []) => {
        return projects.filter((item: projectType) => item.members).length || 0;
    };
    const parseDateString = (dateStr: string) => {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
    };

    const calculateDurationInDays = (startDateStr: string, endDateStr: string) => {
        const startDate = parseDateString(startDateStr);
        const endDate = parseDateString(endDateStr);
        return (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    };

    const calculateAverageDuration = (projects: projectType[] = []) => {
        if (!projects || projects.length === 0) return 0;
        
        const totalDays = projects.reduce((acc, project) => 
            acc + calculateDurationInDays(project.startedAt, project.endedAt), 0);
            
        return Math.round(totalDays / projects.length);
    };
    return (
        <div className="grid grid-cols-2 gap-4 pt-4">
            <DashboardTableProjects />
            <Card className="@container/card">
                <CardHeader className="relative">
                    <CardDescription>Membros em Projectos</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        {calculateTotalMembers(projectData)}
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs border-green-600 text-green-600">
                            <ArrowDownIcon className="size-3 text-green-600" />
                            +1
                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Equipe expandindo <UsersIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground text-gray-500">{calculateTotalMembers(projectData)} novos colaboradores</div>
                </CardFooter>
            </Card>
            <Card className="@container/card col-span-2">
                <CardHeader className="relative">
                    <CardDescription>Prazo Médio (dias)</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        {calculateAverageDuration(projectData)}
                    </CardTitle>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Entrega mais rápida <ClockIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground text-gray-500">Eficiência melhorando</div>
                </CardFooter>
            </Card>
            <Link to={'/projects'}>
                {/* card para ir para area de projectos */}
                <Card className="@container/card flex items-center justify-center bg-blue-950/10">
                    <CardHeader className="relative">
                        <CardDescription>Ver todos os projetos</CardDescription>
                    </CardHeader>
                </Card>
            </Link>

        </div>
    )
}
