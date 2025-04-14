import * as React from "react"
import { flexRender, Row } from "@tanstack/react-table"
import { Button } from "../../ui/button"
import { Link } from "react-router-dom"
import { ChevronLeftIcon, ChevronRightIcon, Eye, GripVerticalIcon, PlusIcon, Trash } from "lucide-react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { TableCell, TableRow } from "../../ui/table"
import { Project } from "../../../types/project"
import { Input } from "../../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"

interface DragHandleProps {
    id: string | number
}

export const DragHandle = ({ id }: DragHandleProps) => {
    const { attributes, listeners } = useSortable({ id })
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

interface DraggableRowProps {
    row: Row<Project>
}

export const DraggableRow = ({ row }: DraggableRowProps) => {
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

interface TablePaginationProps {
    table: any
}

export const TablePagination = ({ table }: TablePaginationProps) => (
    <div className="flex items-center justify-end">
        <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="flex w-fit items-center justify-center text-sm font-medium">
                Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
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
)

interface TableToolbarProps {
    table: any
}

export const TableToolbar = ({ table }: TableToolbarProps) => (
    <div className="flex items-center justify-between">
        <div className="flex flex-row justify-between items-center gap-2 w-full">
            <Input
                id="search"
                placeholder="Pesquisar... pojectos"
                className="w-auto grow bg-white"
                value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                onChange={(e) => table.getColumn("title")?.setFilterValue(e.target.value)}
            />

            <Select
                onValueChange={(value) => 
                    table.getColumn("status")?.setFilterValue(value === "all" ? undefined : value)
                }
                defaultValue="all"
            >
                <SelectTrigger className="w-80 bg-white" id="view-selector" size="default">
                    <SelectValue placeholder="Selecione o Estado" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300">
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="completed">Concluidos</SelectItem>
                    <SelectItem value="in_progress">Em Progresso</SelectItem>
                    <SelectItem value="delayed">Atrasados</SelectItem>
                </SelectContent>
            </Select>
            <Link to={'/projects/create'} className="bg-blue-950 text-white w-1/4 h-12 rounded-md flex items-center justify-center gap-2">
                <PlusIcon />
                <span className="hidden lg:inline">Novo Projecto</span>
            </Link>
        </div>
    </div>
) 