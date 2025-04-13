import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'

export default function DashboardTableProjects() {
    return (
        <div className='bg-white p-4 rounded-lg border border-gray-200'>
            <Table>
            <TableCaption>Ultimos Projectos.</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100 rounded-lg">
                        <TableHead className="w-[100px]">Titulo</TableHead>
                        <TableHead>Responsavel</TableHead>
                        <TableHead>Prazo</TableHead>
                        <TableHead className="text-right">Estado</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">Projecto 1</TableCell>
                        <TableCell>Owner 1</TableCell>
                        <TableCell>01/10/2023</TableCell>
                        <TableCell className="text-right">Em progresso</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}
