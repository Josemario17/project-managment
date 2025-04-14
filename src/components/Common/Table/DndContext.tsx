import * as React from "react"
import {
    DndContext as DndContextRoot,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { Table } from "../../ui/table"
import { TableHeader } from "./TableHeader"
import { TableBody } from "./TableBody"

interface DndContextProps {
    table: any
    dataIds: any[]
    onDragEnd: (event: DragEndEvent) => void
    sortableId: string
}

export const DndContext = ({ table, dataIds, onDragEnd, sortableId }: DndContextProps) => {
    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {})
    )

    return (
        <DndContextRoot
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={onDragEnd}
            sensors={sensors}
            id={sortableId}
        >
            <Table>
                <TableHeader headerGroups={table.getHeaderGroups()} />
                <TableBody rows={table.getRowModel().rows} dataIds={dataIds} />
            </Table>
        </DndContextRoot>
    )
} 