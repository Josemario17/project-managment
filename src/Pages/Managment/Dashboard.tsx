
import { CardProject } from '../../components/Common/Card/CardProject'
import { CardStats } from '../../components/Common/Card/CardStats'
import Spin from '../../components/Common/Spin'
import Layout from '../../components/layouts/layout'
import { GetProjects } from '../../hooks/getProjects'

export default function Dashboard() {
  const {loading} = GetProjects()
  if (loading) return <div className="h-screen w-screen flex justify-center items-center"><Spin color="text-blue-950" /></div>
  return (
    <Layout>
      <CardStats /> 
      <CardProject/>
    </Layout>
  )
}
