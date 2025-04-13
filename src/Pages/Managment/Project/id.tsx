import Layout from "../../../components/layouts/layout"
import { NavigationHistory } from "../../../components/Common/Breadcrumb/NavigationHistory"
import TasksAreaGrid from "../../../components/layouts/tasksAreaGrid"
import { GetProjects } from "../../../hooks/getProjects"
import Spin from "../../../components/Common/Spin"
import { useParams } from "react-router-dom"

export default function ProjectDetails() {
  const { id } = useParams<string>()
  const { loading } = GetProjects(id)
  return (
    <Layout>
      {
        loading ? <Spin color="text-blue-950" /> :
          <>
            <NavigationHistory />
            <TasksAreaGrid />
          </>
      }
    </Layout>
  )
}
