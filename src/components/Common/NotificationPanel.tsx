import { AlertCircle, Bell, Calendar, CheckCircle2, MessageSquare, X } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "../ui/button" 

const notifications = [
  {
    id: "1",
    userId: "1",
    projectId: "1",
    taskId: "4",
    type: "task_assigned",
    message: "Você foi designado para a tarefa 'Desenvolvimento do layout'",
    read: false,
    createdAt: "2023-04-10T09:00:00Z",
  },
  {
    id: "2",
    userId: "1",
    projectId: "1",
    taskId: "3",
    type: "task_completed",
    message: "A tarefa 'Definir estrutura editorial' foi concluída",
    read: true,
    createdAt: "2023-04-05T14:30:00Z",
  },
  {
    id: "3",
    userId: "1",
    projectId: "1",
    taskId: "1",
    type: "task_due_soon",
    message: "A tarefa 'Planejamento de projeto' vence em 2 dias",
    read: false,
    createdAt: "2023-04-13T08:00:00Z",
  },
]


export default function NotificationPanel() {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "task_assigned":
        return <Calendar className="h-5 w-5 text-blue-500" />
      case "task_completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "task_due_soon":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "task_overdue":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "comment_added":
        return <MessageSquare className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const formatNotificationTime = (dateString: string) => {
    const date = new Date(dateString)
    return formatDistanceToNow(date, { addSuffix: true, locale: ptBR })
  }

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-md shadow-lg z-50 border border-gray-300 poppins-regular">
      <div className="flex items-center justify-between p-3 border-b border-gray-300">
        <h3 className="font-medium">Notificações</h3>
        <Button variant="ghost" size="icon">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 border-b border-gray-300 hover:bg-gray-50 cursor-pointer ${
                notification.read ? "opacity-70" : "bg-blue-50"
              }`}
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1">
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatNotificationTime(notification.createdAt)}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">Nenhuma notificação</div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="p-2 border-t border-gray-300">
          <Button variant="ghost" size="sm" className="w-full text-sm">
            Marcar todas como lidas
          </Button>
        </div>
      )}
    </div>
  )
}
