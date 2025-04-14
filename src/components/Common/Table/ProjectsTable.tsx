import * as React from "react"
import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors,
    type DragEndEvent,
    type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import { Tabs, TabsContent } from "../../ui/tabs"
import { Project } from "../../../types/project"
import { DragHandle, DraggableRow, TablePagination, TableToolbar } from "./TableComponents"
import { ProjectTableViewer } from "./ProjectTableViewer"
import { getStatusBadgeClass, getStatusText } from "../../../utils/projectUtils"
import { Link } from "react-router-dom"
import { Eye, Trash } from "lucide-react"
import { Badge } from "../../ui/badge"

export const TransformTIme = (time: string) => {
    const date = new Date(time)
    return date.toLocaleDateString("pt-PT", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    })
}


const columns: ColumnDef<Project>[] = [
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

export function DataTable({ data: initialData }: { data: Project[] }) {
    const [data, setData] = React.useState(() => initialData)
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    })

    const sortableId = React.useId()
    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {})
    )

    const dataIds = React.useMemo<UniqueIdentifier[]>(
        () => data?.map(({ id }) => id) || [],
        [data]
    )

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination,
        },
        getRowId: (row) => row?.id?.toString(),
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (active && over && active.id !== over.id) {
            setData((data) => {
                const oldIndex = dataIds.indexOf(active.id)
                const newIndex = dataIds.indexOf(over.id)
                return arrayMove(data, oldIndex, newIndex)
            })
        }
    }

    return (
        <Tabs defaultValue="outline" className="flex w-full flex-col justify-start gap-6 mt-4">
            <TableToolbar table={table} />
            <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto">
                <div className="overflow-hidden rounded-lg bg-white p-4">
                    <DndContext
                        collisionDetection={closestCenter}
                        modifiers={[restrictToVerticalAxis]}
                        onDragEnd={handleDragEnd}
                        sensors={sensors}
                        id={sortableId}
                    >
                        <Table>
                            <TableHeader className="sticky top-0 z-10 bg-muted">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id} className="bg-slate-200">
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id} colSpan={header.colSpan} className="py-5">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                                        {table.getRowModel().rows.map((row) => (
                                            <DraggableRow key={row.id} row={row} />
                                        ))}
                                    </SortableContext>
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            Sem resultados.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </DndContext>
                </div>
                <TablePagination table={table} />
            </TabsContent>
        </Tabs>
    )
}