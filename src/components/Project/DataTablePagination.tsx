import { Table } from "@tanstack/react-table"

// Single Responsibility: Each component has one specific purpose
interface PaginationButtonProps {
    onClick: () => void
    disabled: boolean
    children: React.ReactNode
    className?: string
}

const PaginationButton = ({ onClick, disabled, children, className = "" }: PaginationButtonProps) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`h-8 w-8 p-0 flex items-center justify-center rounded-md border border-gray-300 
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} 
            ${className}`}
    >
        {children}
    </button>
)

interface RowsPerPageSelectProps {
    value: number
    onChange: (value: number) => void
}

const RowsPerPageSelect = ({ value, onChange }: RowsPerPageSelectProps) => (
    <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Rows per page</span>
        <select
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="h-8 w-[70px] rounded-md border border-gray-300 px-2"
        >
            {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                    {pageSize}
                </option>
            ))}
        </select>
    </div>
)

interface PageInfoProps {
    currentPage: number
    totalPages: number
}

const PageInfo = ({ currentPage, totalPages }: PageInfoProps) => (
    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {currentPage} of {totalPages}
    </div>
)

interface SelectedRowsInfoProps {
    selectedCount: number
    totalCount: number
}

const SelectedRowsInfo = ({ selectedCount, totalCount }: SelectedRowsInfoProps) => (
    <div className="flex-1 text-sm text-muted-foreground">
        {selectedCount} of {totalCount} row(s) selected.
    </div>
)

interface DataTablePaginationProps<TData> {
    table: Table<TData>
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
    const currentPage = table.getState().pagination.pageIndex + 1
    const totalPages = table.getPageCount()
    const selectedCount = table.getFilteredSelectedRowModel().rows.length
    const totalCount = table.getFilteredRowModel().rows.length

    return (
        <div className="flex items-center justify-between px-2">
            <SelectedRowsInfo selectedCount={selectedCount} totalCount={totalCount} />
            
            <div className="flex items-center space-x-6 lg:space-x-8">
                <RowsPerPageSelect
                    value={table.getState().pagination.pageSize}
                    onChange={(value) => table.setPageSize(value)}
                />
                
                <PageInfo currentPage={currentPage} totalPages={totalPages} />
                
                <div className="flex items-center space-x-2">
                    <PaginationButton
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        className="hidden lg:flex"
                    >
                        ⟪
                    </PaginationButton>
                    
                    <PaginationButton
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        ‹
                    </PaginationButton>
                    
                    <PaginationButton
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        ›
                    </PaginationButton>
                    
                    <PaginationButton
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                        className="hidden lg:flex"
                    >
                        ⟫
                    </PaginationButton>
                </div>
            </div>
        </div>
    )
} 