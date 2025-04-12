import CreateProjectArea from '../../../components/Common/CreateProjectArea'
import Layout from '../../../components/layouts/layout'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../../../components/ui/breadcrumb'
import { Slash } from 'lucide-react'

export function NavigationHistory() {
    return (
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/projects`}>Projectos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
          <BreadcrumbLink href={`/projects/create`}>Criar Projecto</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

export default function CreateProject() {
  return (
    <Layout>
      <NavigationHistory />
      <CreateProjectArea />
    </Layout>
  )
}
