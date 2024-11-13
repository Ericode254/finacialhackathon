'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type RecurrentPayment = {
  id: string
  name: string
  amount: number
  frequency: string
  nextDueDate: string
  notificationDays: number
  notificationEnabled: boolean
}

export default function Component() {
  const [payments, setPayments] = useState<RecurrentPayment[]>([])
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [frequency, setFrequency] = useState('')
  const [nextDueDate, setNextDueDate] = useState('')
  const [notificationDays, setNotificationDays] = useState('7')
  const [notificationEnabled, setNotificationEnabled] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newPayment: RecurrentPayment = {
      id: Date.now().toString(),
      name,
      amount: parseFloat(amount),
      frequency,
      nextDueDate,
      notificationDays: parseInt(notificationDays),
      notificationEnabled
    }
    setPayments([...payments, newPayment])
    resetForm()
  }

  const resetForm = () => {
    setName('')
    setAmount('')
    setFrequency('')
    setNextDueDate('')
    setNotificationDays('7')
    setNotificationEnabled(false)
  }

  const deletePayment = (id: string) => {
    setPayments(payments.filter(payment => payment.id !== id))
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Recurrent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Next Due Date</TableHead>
                <TableHead>Notification</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.name}</TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{payment.frequency}</TableCell>
                  <TableCell>{payment.nextDueDate}</TableCell>
                  <TableCell>
                    {payment.notificationEnabled ? `${payment.notificationDays} days before` : 'Disabled'}
                  </TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => deletePayment(payment.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Add Recurrent Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Payment Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger id="frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nextDueDate">Next Due Date</Label>
              <Input
                id="nextDueDate"
                type="date"
                value={nextDueDate}
                onChange={(e) => setNextDueDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notificationDays">Notification Days Before</Label>
              <Input
                id="notificationDays"
                type="number"
                value={notificationDays}
                onChange={(e) => setNotificationDays(e.target.value)}
                disabled={!notificationEnabled}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="notificationEnabled"
                checked={notificationEnabled}
                onCheckedChange={setNotificationEnabled}
              />
              <Label htmlFor="notificationEnabled">Enable Notifications</Label>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>
            <Plus className="w-4 h-4 mr-2" />
            Add Recurrent Payment
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}