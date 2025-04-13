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
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
    ColumnDef,
    ColumnFiltersState,
    Row,
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
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    Eye,
    GripVerticalIcon,
    Pencil,
    PlusIcon,
    Trash,
} from "lucide-react"
import { z } from "zod"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table"
import {
    Tabs,
    TabsContent,
} from "../../ui/tabs"
import { Input } from "../../ui/input"
import { Link } from "react-router-dom"

export const schema = z.object({
    id: z.string(),
    title: z.string(),
    host: z.object({
        name: z.string(),
        email: z.string()
    }),
    startedAt: z.string(),
    endedAt: z.string(),
    status: z.enum(["completed", "in_progress", "delayed"]),
})

export const TransformTIme = (time: string) => {
    const date = new Date(time)
    return date.toLocaleDateString("pt-PT", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    })
}

export type TaskItem = z.infer<typeof schema>;

function DragHandle({ id }: { id: number }) {
    const { attributes, listeners } = useSortable({
        id,
    })

    return (
        <Button
            {...attributes}
            {...listeners}
            variant="ghost"
            size="icon"
            className="size-7 text-muted-foreground hover:bg-transparent"
        >
            <GripVerticalIcon className="size-3 text-muted-foreground" />
            <span className="sr-only">Drag to reorder</span>
        </Button>
    )
}

function TableCellViewer({ item }: { item: TaskItem }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="link" className="w-fit px-0 text-left text-foreground">
                    {item.title}
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
                <SheetHeader className="gap-1">
                    <SheetTitle>{item.title}</SheetTitle>
                    <SheetDescription>
                        Showing details for this task
                    </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                    <div className="mb-2">
                        <span className="font-semibold">Responsável:</span> {item.host.name}
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold">Prazo:</span> {item.endedAt}
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold">Estado:</span> {item.status}
                    </div>
                </div>
                <SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
                    <Button className="w-full">Editar</Button>
                    <SheetClose asChild>
                        <Button variant="outline" className="w-full">
                            Fechar
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

const columns: ColumnDef<TaskItem>[] = [
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
                <TableCellViewer item={row.original} />
            </div>
        ),
    },
    {
        accessorKey: "host",
        header: "Responsavel",
        cell: ({ row }) => (
            <div className="w-32">
                <span className="py-1 text-muted-foreground">
                    {row.original.host.name}
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
            <Badge
                className={`flex gap-1 py-1.5 my-3 text-muted-foreground [&_svg]:size-3 rounded-full ${
                    row.original.status === "completed" ? "bg-green-300 px-6  text-green-900" :
                    row.original.status === "delayed" ? "bg-red-300 px-6  text-red-900" : "border-white"
                    }`}
            >
                {row.original.status === "completed" ? "Concluido" : row.original.status === "delayed" ? "Atrasado" : row.original.status === "in_progress" ? "Em Progresso" : "Desconhecido"}
            </Badge>
        ),
    },
    {
        id: "actions",
        cell: () => (
            <div className="flex space-x-2 items-center justify-center gap-1 ml-2">
                <Link to="/projects/new" className="p-1.5 rounded-lg bg-orange-400">
                    <Eye size={20} />
                </Link >
                <button className="p-1.5 rounded-lg bg-orange-400">
                    <Pencil size={20} />
                </button>
                <button className="p-1.5 rounded-lg bg-red-600">
                    <Trash size={20} />
                </button>
            </div>
        ),
    },
]

function DraggableRow({ row }: { row: Row<TaskItem> }) {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
        id: row.original.id,
    })

    return (
        <TableRow
            data-state={row.getIsSelected() && "selected"}
            data-dragging={isDragging}
            ref={setNodeRef}
            className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
            style={{
                transform: CSS.Transform.toString(transform),
                transition: transition,
            }}
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}
        </TableRow>
    )
}

export function DataTable({
    data: initialData,
}: {
    data: TaskItem[]
}) {
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

    function handleDragEnd(event: DragEndEvent) {
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
        <Tabs
            defaultValue="outline"
            className="flex w-full flex-col justify-start gap-6 mt-4"
        >
            <div className="flex items-center justify-between">
                <div className="flex flex-row justify-between items-center gap-2 w-full">
                    <Input
                        id="search"
                        placeholder="Pesquisar..."
                        className="w-auto grow bg-white"
                    />

                    <Select
                        onValueChange={(value) => console.log(value)}
                    >
                        <SelectTrigger className="w-80 bg-white" id="view-selector" size="default">
                            <SelectValue placeholder="Selecione o Estado" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300">
                            <SelectItem value="completed">Concluidos</SelectItem>
                            <SelectItem value="in_progress">Em Progresso</SelectItem>
                            <SelectItem value="delayed">Expirados</SelectItem>
                        </SelectContent>
                    </Select>
                    <Link to={'/projects/create'} className="bg-blue-950 text-white w-1/4 h-12 rounded-md flex items-center justify-center gap-2">
                        <PlusIcon />
                        <span className="hidden lg:inline">Novo Projecto</span>
                    </Link>
                </div>
            </div>
            <TabsContent
                value="outline"
                className="relative flex flex-col gap-4 overflow-auto"
            >
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
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id} colSpan={header.colSpan} className="py-5"

                                                >
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    <SortableContext
                                        items={dataIds}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {table.getRowModel().rows.map((row) => (
                                            <DraggableRow key={row.id} row={row} />
                                        ))}
                                    </SortableContext>
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            Sem resultados.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </DndContext>
                </div>
                <div className="flex items-center justify-end">
                    <div className="flex w-full items-center gap-8 lg:w-fit">
                        <div className="flex w-fit items-center justify-center text-sm font-medium">
                            Página {table.getState().pagination.pageIndex + 1} of{" "}
                            {table.getPageCount()}
                        </div>
                        <div className="ml-auto flex items-center gap-2 lg:ml-0">
                            <Button
                                variant="outline"
                                className="size-8"
                                size="icon"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">Go to previous page</span>
                                <ChevronLeftIcon />
                            </Button>
                            <Button
                                variant="outline"
                                className="size-8"
                                size="icon"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Go to next page</span>
                                <ChevronRightIcon />
                            </Button>
                        </div>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    )
}