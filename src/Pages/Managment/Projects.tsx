
import { DataTable } from '../../components/Common/Table/ProjectsTable';
import Layout from '../../components/layouts/layout'
import { AllData } from '../../components/Common/Table/Data';

interface TitleTopInfoProps {
    h1Text: string;
    pText: string;
}
export const TitleTopInfo = ({ h1Text, pText }: TitleTopInfoProps) => {
    return (
        <div className='flex flex-col mb-4'>
            <h1 className='text-3xl font-bold'>{h1Text}</h1>
            <span className='text-muted-foreground text-gray-600'>{pText}</span>
        </div>
    )
}

export default function Projects() {
    return (
        <Layout>
            <TitleTopInfo h1Text='Projectos' pText='Gerencie seus Projectos aqui' />
            <DataTable data={AllData} />
        </Layout>
    )
}
