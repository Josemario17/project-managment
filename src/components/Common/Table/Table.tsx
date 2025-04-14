import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    SortingState,
    getPaginationRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
} from "@tanstack/react-table"
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Table as TableUI } from "./ui/table"
import { TableHeader } from "./TableHeader"
import { TableRow } from "./TableRow"
import { TablePagination } from "./TablePagination"
import { TableToolbar } from "./TableToolbar"

interface TableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    onRowReorder?: (newData: TData[]) => void
}

export function Table<TData, TValue>({
    columns,
    data,
    onRowReorder,
}: TableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    })

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (active.id !== over?.id) {
            const oldIndex = data.findIndex((item) => (item as any).id === active.id)
            const newIndex = data.findIndex((item) => (item as any).id === over?.id)

            const newData = [...data]
            const [removed] = newData.splice(oldIndex, 1)
            newData.splice(newIndex, 0, removed)
            onRowReorder?.(newData)
        }
    }

    return (
        <div className="space-y-4">
            <TableToolbar table={table} />
            <div className="rounded-md border">
                <TableUI>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHeader key={header.id} header={header} />
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        <DndContext
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={table.getRowModel().rows.map((row) => row.original)}
                                strategy={verticalListSortingStrategy}
                            >
                                {table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} row={row} />
                                ))}
                            </SortableContext>
                        </DndContext>
                    </tbody>
                </TableUI>
            </div>
            <TablePagination table={table} />
        </div>
    )
} 