import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'

export function CardStats() {
  return (
    <Card className='border-0 py-0 pb-0'>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row bg-blue-950/15 rounded-lg border shadow-lg shadow-blue-950/20">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Seja Bem-vindo Nome</CardTitle>
          <CardDescription>
            Esta é a estatistica dos seus projectos mais recentes
          </CardDescription>
        </div>
        <div className="flex">
          {["Todos", "Concluidos", "Decorrendo"].map((text: string, index: number) => {
            return (
              <button
                key={index}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6 border-l-white/20"
              >
                <span className="text-xs text-muted-foreground">
                  {text}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {200}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
    </Card>
  )
}
