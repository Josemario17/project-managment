import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'
import { GetProjects } from '../../../hooks/getProjects';
import { useUserStore } from '../../../store/UserStore';
import { projectType } from '../Table/DashboardTable';

export function CardStats() {
  const { name } = useUserStore().userData || { name: "" };
  const { projectData } = GetProjects()
  const dataStats = [
    projectData.length,
    projectData.filter((item: projectType) => item.status === 'completed').length,
    projectData.filter((item: projectType) => item.status === 'in_progress').length
  ]

  const classReturn = (text: string) => {
    return text === 'Concluidos' ?
      "text-green-500" :
      "text-normal"
  }

  return (
    <Card className='border-0 py-0 pb-0'>
      <CardHeader className="flex flex-col items-stretch space-y-0 border border-gray-200 p-0 sm:flex-row bg-white rounded-lg">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Seja Bem-vindo {name}</CardTitle>
          <CardDescription className='text-gray-600'>
            Esta é a estatistica dos seus projectos mais recentes
          </CardDescription>
        </div>
        <div className="flex">
          {
            ["Todos", "Concluidos", "Decorrendo"].map((text: string, index: number) => {
              return (
                <div
                  key={index}
                  className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6 border-l-gray-200"
                >
                  <span className={classReturn(text)}>
                    {text}
                  </span>
                  <span className={`text-lg font-bold leading-none sm:text-3xl ${classReturn(text)}`}>
                    {dataStats[index]}
                  </span>
                </div>
              )
            })}
        </div>
      </CardHeader>
    </Card>
  )
}
