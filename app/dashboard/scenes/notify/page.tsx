'use client'

import { useState } from 'react'
import { Bell, Check, Cog, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

type Notification = {
  id: string
  title: string
  message: string
  type: 'payment' | 'budget' | 'alert'
  read: boolean
  date: string
}

export default function Component() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Payment Due',
      message: 'Your credit card payment is due in 3 days.',
      type: 'payment',
      read: false,
      date: '2023-06-15'
    },
    {
      id: '2',
      title: 'Budget Alert',
      message: 'You\'ve exceeded your dining out budget for this month.',
      type: 'budget',
      read: false,
      date: '2023-06-14'
    },
    {
      id: '3',
      title: 'New Feature',
      message: 'Check out our new budget planning tool!',
      type: 'alert',
      read: true,
      date: '2023-06-13'
    },
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'payment': return '💰'
      case 'budget': return '📊'
      case 'alert': return '🔔'
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative" aria-label="Open notifications">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 px-1 min-w-[1.25rem] h-5">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Notifications</SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex justify-between items-center">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="/settings/notifications">
              <Cog className="mr-2 h-4 w-4" />
              Settings
            </a>
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-10rem)] mt-4">
          {notifications.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">No notifications</p>
          ) : (
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <li key={notification.id} className={`bg-card rounded-lg p-4 shadow ${notification.read ? 'opacity-60' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <span className="text-2xl" role="img" aria-label={notification.type}>
                        {getTypeIcon(notification.type)}
                      </span>
                      <div>
                        <h3 className="font-semibold">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <time className="text-xs text-muted-foreground mt-1 block">{notification.date}</time>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {!notification.read && (
                        <Button variant="ghost" size="icon" onClick={() => markAsRead(notification.id)} aria-label="Mark as read">
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)} aria-label="Delete notification">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}