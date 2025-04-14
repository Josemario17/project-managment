import * as React from "react"
import { Header, flexRender } from "@tanstack/react-table"
import { TableHead, TableHeader as TableHeaderUI, TableRow } from "../../ui/table"

interface TableHeaderProps {
    header?: Header<any, unknown>
    headerGroups?: any[]
}

export const TableHeader = ({ header, headerGroups }: TableHeaderProps) => {
    if (headerGroups) {
        return (
            <TableHeaderUI>
                {headerGroups.map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header: Header<any, unknown>) => (
                            <TableHead key={header.id} className="p-4 font-medium">
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeaderUI>
        )
    }

    return (
        <TableHead className="p-4 font-medium">
            {header?.isPlaceholder
                ? null
                : header && flexRender(header.column.columnDef.header, header.getContext())}
        </TableHead>
    )
} 