import { Slash } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../../components/ui/breadcrumb"
import { useParams } from "react-router-dom"
import { GetProjects } from "../../../hooks/getProjects"

export function NavigationHistory() {
    const { id } = useParams<string>()
    const { projectData } = GetProjects(id)
    const uniqueItem = 0
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
        <BreadcrumbLink href={`/projects/${id}`}>Projecto {projectData[uniqueItem]?.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
