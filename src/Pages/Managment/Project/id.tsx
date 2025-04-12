import { useParams } from "react-router-dom"
import Layout from "../../../components/layouts/layout"
import { NavigationHistory } from "../../../components/Common/Breadcrumb/NavigationHistory"
import TasksAreaGrid from "../../../components/layouts/tasksAreaGrid"

export default function ProjectDetails() {
  const { id } = useParams<string>()

  return (
    <Layout>
      <NavigationHistory />
      <TasksAreaGrid />
    </Layout>
  )
}
