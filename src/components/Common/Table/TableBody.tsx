import * as React from "react"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { TableBody as TableBodyRoot, TableCell, TableRow } from "../../ui/table"
import { DraggableRow } from "./TableComponents"
import { Project } from "../../../types/project"
import { projectColumns } from "./ProjectTableColumns"

interface TableBodyProps {
    rows: any[]
    dataIds: any[]
}

export const TableBody = ({ rows, dataIds }: TableBodyProps) => {
    return (
        <TableBodyRoot>
            {rows?.length ? (
                <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                    {rows.map((row) => (
                        <DraggableRow key={row.id} row={row} />
                    ))}
                </SortableContext>
            ) : (
                <TableRow>
                    <TableCell colSpan={projectColumns.length} className="h-24 text-center">
                        Sem resultados.
                    </TableCell>
                </TableRow>
            )}
        </TableBodyRoot>
    )
} 