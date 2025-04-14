import { ColumnDef } from "@tanstack/react-table"
import { Link } from "react-router-dom"
import { Eye, Trash } from "lucide-react"
import { Badge } from "../../ui/badge"
import { Project } from "../../../types/project"
import { DragHandle } from "./TableComponents"
import { ProjectTableViewer } from "./ProjectTableViewer"
import { getStatusBadgeClass, getStatusText } from "../../../utils/projectUtils"

export const projectColumns: ColumnDef<Project>[] = [
    {
        id: "drag",
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
    },
    {
        accessorKey: "title",
        header: "Titulo",
        cell: ({ row }) => (
            <div className="w-32">
                <ProjectTableViewer item={row.original} />
            </div>
        ),
    },
    {
        accessorKey: "host",
        header: "Responsavel",
        cell: ({ row }) => (
            <div className="w-32">
                <span className="py-1 text-muted-foreground">
                    {typeof row.original.host === 'object' && row.original.host !== null 
                        ? row.original.host.name 
                        : row.original.host}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "startedAt",
        header: "Inicio",
        cell: ({ row }) => (
            <div className="w-32">
                <Badge variant="outline" className="px-6 py-2 my-3 text-muted-foreground border-gray-300">
                    {row.original.startedAt}
                </Badge>
            </div>
        ),
    },
    {
        accessorKey: "endedAt",
        header: "Prazo",
        cell: ({ row }) => (
            <div className="w-32">
                <Badge variant="outline" className="px-6 py-2 my-3 text-muted-foreground border-gray-300">
                    {row.original.endedAt}
                </Badge>
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => (
            <Badge className={getStatusBadgeClass(row.original.status)}>
                {getStatusText(row.original.status)}
            </Badge>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="flex space-x-2 items-center justify-center gap-1 ml-2">
                <Link to={`/projects/${row.original.id}`} className="p-1.5 rounded-lg bg-orange-400">
                    <Eye size={20} />
                </Link>
                <button className="p-1.5 rounded-lg bg-red-600">
                    <Trash size={20} />
                </button>
            </div>
        ),
    },
] 