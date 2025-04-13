import { GetProjects } from '../../../hooks/getProjects'
import { projectType } from '../../../lib/types'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'
import Spin from '../Spin'

export const GetStatusPt = (status: 'in_progress' | 'completed' | 'delayed') => {
    switch (status) {
        case 'in_progress':
            return 'Em Progresso'
        case 'completed':
            return 'Concluído'
        case 'delayed':
            return 'Atrasado'
        default:
            return ''
    }
}

const columns = [
    { Header: 'Titulo', accessor: 'title' },
    { Header: 'Responsavel', accessor: 'host' },
    { Header: 'Prazo', accessor: 'endedAt' },
    { Header: 'Estado', accessor: 'status' }
]

const Headers = ({ column }: { column: { Header: string; accessor: string; }[] }) => {
    return (
        <TableRow className="bg-gray-100 rounded-lg">
            {column.map((columns) => (
                <TableHead key={columns.accessor} className="w-[100px]">{columns.Header}</TableHead>
            ))}
        </TableRow>
    )
}

const RowsCells = ({data}: { data: projectType[]}) => {
    return (
        <>
            {data.slice(0,4).map((project: projectType) => (
                <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>{project.host.name}</TableCell>
                    <TableCell>{project.endedAt}</TableCell>
                    <TableCell className="text-right">{GetStatusPt(project.status)}</TableCell>
                </TableRow>
            ))}
        </>
    )
}


export default function DashboardTableProjects() {
    const { projectData } = GetProjects()
    return (
        <div className='bg-white p-4 rounded-lg border border-gray-200'>
            <Table>
                <TableCaption>Ultimos Projectos.</TableCaption>
                <TableHeader>
                    <Headers column={columns} />
                </TableHeader>
                <TableBody>
                    <RowsCells data={projectData} />
                </TableBody>
            </Table>
        </div>
    )
}
