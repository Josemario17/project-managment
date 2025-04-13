
import { DataTable } from '../../components/Common/Table/ProjectsTable';
import Layout from '../../components/layouts/layout'
import { useEffect, useState } from 'react';
import { getProjects } from '../../api/Projects';
import Spin from '../../components/Common/Spin';

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
    const [projectData, setProjectData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getProjectsfunc = async () => {
            setLoading(true)
            const Data = await getProjects();
            if(Data !== undefined && Data !== null && Object.keys(Data).length > 0){
                setProjectData(Object.values(Data) || []);
            }
            setLoading(false)
        }
        getProjectsfunc();
    }, [])
    return (
        <Layout>
            <TitleTopInfo h1Text='Projectos' pText='Gerencie seus Projectos aqui' />
            {loading ? <Spin color='text-blue-950' /> : <DataTable data={projectData}></DataTable>}
        </Layout>
    )
}
