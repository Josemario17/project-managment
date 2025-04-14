import * as React from "react"
import { Header, flexRender } from "@tanstack/react-table"
import { TableHead } from "../../ui/table"

interface TableHeaderProps {
    header: Header<any, unknown>
}

export const TableHeader = ({ header }: TableHeaderProps) => {
    return (
        <TableHead className="p-4 font-medium">
            {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
        </TableHead>
    )
} 