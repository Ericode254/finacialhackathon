'use client'

import { useState } from 'react'
import { Plus, Trash2, PieChart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type BudgetCategory = {
  id: string
  name: string
  amount: number
  color: string
}

const colorOptions = [
  { name: 'Red', value: '#ef4444' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Teal', value: '#14b8a6' },
]

export default function Component() {
  const [categories, setCategories] = useState<BudgetCategory[]>([
    { id: '1', name: 'Housing', amount: 1000, color: '#ef4444' },
    { id: '2', name: 'Food', amount: 500, color: '#22c55e' },
    { id: '3', name: 'Transportation', amount: 200, color: '#3b82f6' },
  ])
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [color, setColor] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newCategory: BudgetCategory = {
      id: Date.now().toString(),
      name,
      amount: parseFloat(amount),
      color,
    }
    setCategories([...categories, newCategory])
    resetForm()
  }

  const resetForm = () => {
    setName('')
    setAmount('')
    setColor('')
  }

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(category => category.id !== id))
  }

  const totalBudget = categories.reduce((sum, category) => sum + category.amount, 0)

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Your Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
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
              <Label htmlFor="color">Color</Label>
              <Select value={color} onValueChange={setColor}>
                <SelectTrigger id="color">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((colorOption) => (
                    <SelectItem key={colorOption.value} value={colorOption.value}>
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: colorOption.value }}
                        />
                        {colorOption.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>
            <Plus className="w-4 h-4 mr-2" />
            Add Budget Category
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Your Budget Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">No budget categories set. Start by adding a new category!</p>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Total Budget: ${totalBudget.toFixed(2)}</h3>
                <PieChart className="w-6 h-6 text-muted-foreground" />
              </div>
              <ul className="space-y-4">
                {categories.map((category) => (
                  <li key={category.id} className="bg-card rounded-lg p-4 shadow">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: category.color }}
                        />
                        <h4 className="font-semibold">{category.name}</h4>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">${category.amount.toFixed(2)}</span>
                        <Button variant="ghost" size="icon" onClick={() => deleteCategory(category.id)} aria-label={`Delete ${category.name} category`}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Progress value={(category.amount / totalBudget) * 100} className="h-2" style={{ backgroundColor: category.color }} />
                    <p className="text-sm text-right mt-1">{((category.amount / totalBudget) * 100).toFixed(1)}%</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}