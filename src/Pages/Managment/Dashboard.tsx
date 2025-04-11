
import { CardProject } from '../../components/Common/Card/CardProject'
import { CardStats } from '../../components/Common/Card/CardStats'
import Layout from '../../components/layouts/layout'



export default function Dashboard() {
  return (
    <Layout>
      <CardStats /> 
      <CardProject></CardProject>
    </Layout>
  )
}
