import { ArrowUpIcon, ArrowDownIcon, ClockIcon, UsersIcon } from "lucide-react"

import { Badge } from "../../ui/badge"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../ui/card"
import { Link } from "react-router-dom"

export function CardProject() {
    return (
        <div className="grid grid-cols-2 gap-4 pt-4">
            <Card className="@container/card">
                <CardHeader className="relative">
                    <CardDescription>Tarefas Concluídas</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        187
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                            <ArrowUpIcon className="size-3" />
                            +15%
                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Produtividade em alta <ArrowUpIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Melhor que o mês anterior
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader className="relative">
                    <CardDescription>Membros da Equipe</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        32
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                            <ArrowUpIcon className="size-3" />
                            +4
                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Equipe expandindo <UsersIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground">4 novos colaboradores</div>
                </CardFooter>
            </Card>
            <Card className="@container/card col-span-2">
                <CardHeader className="relative">
                    <CardDescription>Prazo Médio (dias)</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        14.5
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                            <ArrowDownIcon className="size-3" />
                            -2.3
                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Entrega mais rápida <ClockIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground">Eficiência melhorando</div>
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
