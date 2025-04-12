import { BellRing } from "lucide-react"

import { cn } from "../../../lib/utils"
import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/card"
type CardProps = React.ComponentProps<typeof Card>

export function UserCard({ className, ...props }: CardProps) {
    return (
        <Card className={cn("w-[250px] border-white/50", className)} {...props}>
            <CardHeader className="flex items-center justify-between space-y-0">
                <div className="flex flex-col space-y-1 min-w-[80%]">
                    <CardTitle>José Gomes</CardTitle>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                        <div className="w-2 h-2 bg-green-500 flex rounded-full"></div>
                        <CardDescription>Sessão activa</CardDescription>
                    </div>
                </div>
                <BellRing />
            </CardHeader>
        </Card>
    )
}
