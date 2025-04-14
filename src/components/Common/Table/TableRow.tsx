import * as React from "react"
import { Row } from "@tanstack/react-table"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { TableRow as TableRowUI } from "../../ui/table"

interface TableRowProps {
    row: Row<any>
}

export const TableRow = ({ row }: TableRowProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: row.original.id,
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <TableRowUI
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="cursor-move"
        >
            {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-4">
                    {cell.renderCell()}
                </td>
            ))}
        </TableRowUI>
    )
} 